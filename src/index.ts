import * as core from "@actions/core";
import * as github from "@actions/github";
import { parseDiff } from "./diff-parser";
import { getReview } from "./ai";
import { matchesAny, parseCommaSeparated } from "./glob";
import {
  getPRDetails,
  getPRDiff,
  postReviewComments,
  postSummary,
} from "./github";

async function run() {
  try {
    const token = core.getInput("github_token", { required: true });

    const aiProvider = core.getInput("ai_provider") || "openai";
    const openaiApiKey = core.getInput("openai_api_key");
    const anthropicApiKey = core.getInput("anthropic_api_key");
    const openrouterApiKey = core.getInput("openrouter_api_key");
    const baseUrl = core.getInput("base_url");
    const ollamaHost = core.getInput("ollama_host") || "http://localhost:11434";

    let model = core.getInput("model");
    if (!model) {
      if (aiProvider === "openai" || aiProvider === "openrouter")
        model = "gpt-4o";
      if (aiProvider === "anthropic") model = "claude-sonnet-4-20250514";
      if (aiProvider === "ollama") model = "llama3";
    }

    const reviewLevel = core.getInput("review_level") || "full";
    const maxFiles = parseInt(core.getInput("max_files") || "10", 10);
    const batchSize = Math.max(
      1,
      parseInt(core.getInput("batch_size") || "3", 10),
    );

    const context = github.context;
    if (!context.payload.pull_request) {
      core.info("Not a PR event, skipping.");
      return;
    }

    const prNumber = context.payload.pull_request.number;
    const title = context.payload.pull_request.title;

    if (title.includes("[skip-review]")) {
      core.info("PR title contains [skip-review], skipping.");
      return;
    }

    // ⚡ Bolt: Fetch PR details and diff in parallel to reduce API latency
    const [prDetails, diff] = await Promise.all([
      getPRDetails(token),
      getPRDiff(token, prNumber),
    ]);

    // Skip empty and binary files, and deduplicate by filename before
    // applying max_files so large rename-heavy PRs don't waste budget.
    const includePatterns = parseCommaSeparated(core.getInput("file_include"));
    const excludePatterns = parseCommaSeparated(core.getInput("file_exclude"));
    const seen = new Set<string>();
    const files = parseDiff(diff)
      .filter((f) => {
        if (f.binary || !f.diff.trim()) return false;
        if (seen.has(f.filename)) return false;
        seen.add(f.filename);
        if (excludePatterns.length > 0 && matchesAny(f.filename, excludePatterns)) {
          return false;
        }
        if (includePatterns.length > 0 && !matchesAny(f.filename, includePatterns)) {
          return false;
        }
        return true;
      })
      .slice(0, maxFiles);

    const comments: { path: string; body: string; line: number }[] = [];
    let summaryBody = "## 🤖 AI Code Review Summary\n\n";

    // ⚡ Bolt: Process files in batches to parallelize external AI API requests without hitting rate limits
    for (let i = 0; i < files.length; i += batchSize) {
      const batch = files.slice(i, i + batchSize);

      const batchResults = await Promise.all(
        batch.map(async (file) => {
          if (!file.diff.trim()) return null;

          const review = await getReview({
            aiProvider,
            openaiApiKey,
            anthropicApiKey,
            openrouterApiKey,
            baseUrl,
            ollamaHost,
            model,
            diff: file.diff,
            reviewLevel,
          });

          return { file, review };
        }),
      );

      for (const result of batchResults) {
        if (!result || !result.review) continue;
        const { file, review } = result;

        summaryBody += `### ${file.filename}\n${review.summary}\n\n`;

        if (review.issues && review.issues.length > 0) {
          summaryBody +=
            "| Line | Severity | Issue | Suggestion |\n|---|---|---|---|\n";
          for (const issue of review.issues) {
            summaryBody += `| ${issue.line} | ${issue.severity} | ${issue.message} | ${issue.suggestion} |\n`;
            comments.push({
              path: file.filename,
              body: `**${issue.severity.toUpperCase()}**: ${issue.message}\n\n*Suggestion*: ${issue.suggestion}`,
              line: issue.line > 0 ? issue.line : 1,
            });
          }
          summaryBody += "\n";
        } else {
          summaryBody += "_No issues found._\n\n";
        }
      }
    }

    // GitHub caps comments at 65536 chars; truncate defensively.
    const MAX_SUMMARY_LENGTH = 64000;
    if (summaryBody.length > MAX_SUMMARY_LENGTH) {
      summaryBody =
        summaryBody.substring(0, MAX_SUMMARY_LENGTH) +
        "\n\n> _Summary truncated: output exceeded the GitHub comment size limit._";
    }

    if (files.length === 0) {
      summaryBody +=
        "_No reviewable files: the diff was empty, binary-only, or matched by the exclude filters._";
    }

    await postReviewComments(token, prNumber, prDetails.head.sha, comments);
    await postSummary(token, prNumber, summaryBody);
  } catch (error: any) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

run();
