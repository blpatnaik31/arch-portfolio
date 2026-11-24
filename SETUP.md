# Publishing setup

This repo follows the same publishing pattern as `tpm-portfolio` and `fde-portfolio`.

1. **Repo:** `blpatnaik31/arch-portfolio`, default branch `main`.
2. **Pages sync:** in `blpatnaik31.github.io`, extend `.github/workflows/sync-portfolios.yml` with a third checkout (`repository: blpatnaik31/arch-portfolio`, `path: _src/arch`) and copy `_src/arch/site/` to `arch/`. The site is then served at `https://blpatnaik31.github.io/arch/`.
3. **Instant publish (optional):** add the `PAGES_SYNC_TOKEN` Actions secret to this repo (a fine-grained token with Contents read/write on `blpatnaik31.github.io`). Without it, the hourly sync publishes changes.
4. **Hub page:** add a third card to `blpatnaik31.github.io/index.html` linking to `arch/`, and nav links from the TPM and FDE sites.

Do steps 2–4 only after `REVIEW.md` is cleared.
