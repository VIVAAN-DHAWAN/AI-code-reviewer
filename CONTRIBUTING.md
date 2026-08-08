# Contributing

Thanks for contributing to the AI Code Reviewer action!

## Development setup

```bash
npm install
npm run typecheck   # tsc --noEmit
npm test            # vitest
npm run build       # ncc build -> dist/index.js
```

The action runs `dist/index.js`, so **always rebuild after changing `src/`**
and commit the updated bundle:

```bash
npm run build
```

## PR conventions

- Keep changes small and focused; one logical change per PR.
- Add or update unit tests in `tests/` when behaviour changes.
- Run `npm run check` locally before pushing.
- Commit message: `type: subject` (`feat`, `fix`, `perf`, `refactor`, `test`, `ci`, `docs`, `chore`).
