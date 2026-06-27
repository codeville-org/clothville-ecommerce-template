@AGENTS.md

# Notes for Claude Code

All project conventions live in **AGENTS.md** (imported above) so every coding
tool shares them. A few Claude-specific pointers:

- The build is delivered in **reviewable phases** — see `docs/BUILD_BRIEF.md`
  (Foundation → Core UI → Pages → Polish → Docs). Pause at phase boundaries for
  review rather than building everything at once.
- When unsure about a Next.js 16 / Tailwind v4 API, read the bundled docs in
  `node_modules/next/dist/docs/` before coding — this version differs from
  older training data.
- Use the session scratchpad for throwaway files; never commit temporary
  artifacts to the repo.
- This is a product to be resold: keep it licence-clean and never bundle
  copyrighted assets.
