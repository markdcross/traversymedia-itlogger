# Dependency security cleanup

Use Node.js 22.12 or newer:

```sh
npm ci
npm test
npm audit
npm run build
```

The frontend now uses Vite, preserving the `build` output directory. `npm start` serves localhost port 3000; `/logs` and `/techs` proxy to the existing JSON server on port 5000. `npm run dev` starts both services. The checked-in `.npmrc` preserves installation behavior for the legacy React dependency tree.

The maintained `@materializecss/materialize` package replaces vulnerable `materialize-css`; notifications use its text API. Date formatting uses Moment directly instead of the obsolete React wrapper. JSON server stays on patched 0.17.x to preserve its existing API behavior. A compatible `qs` override removes remaining parser advisories.

On 2026-09-10, npm audit reported zero findings and focused tests plus the production build passed. This is not a guarantee that the application has no other security defects; full UI/deployment testing was intentionally deferred at the owner's request. Weekly Dependabot updates are configured. GitHub alerts only close after the fixes reach the default branch and GitHub rescans it.
