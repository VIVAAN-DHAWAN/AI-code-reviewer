# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this action, please report it
privately via GitHub's private vulnerability reporting flow
(Security tab > Report a vulnerability) instead of opening a public issue.

Please include:

- A description of the vulnerability
- Steps to reproduce
- Impact assessment

## Supported Versions

The `v1` tag is maintained. New fixes are backported to the latest release.

## Security Considerations

- This action requires a `github_token` with `pull-requests: write` and
  `issues: write` permissions. Scope it to the smallest surface needed.
- API keys are read from secrets only; never commit keys to the repository.
- Review prompts include the raw diff of files changed in the PR. Avoid
  reviewing untrusted PRs with secrets in their diff, or restrict which
  files are reviewed via `file_include`/`file_exclude`.
