# v0.6.0 - Repository Stabilization and Preview Site

## Summary

v0.6.0 stabilizes the Adolar Brand Images repository for repeatable local builds and GitHub Actions runs. SVGs remain the source of truth; generated PNGs, Favicons, ICOs and Social Preview PNGs are derived exports.

## Highlights

- Improved `npm run check` coverage for required repository, variant and social-preview sources.
- Updated `npm run build` to read variants from `variants/manifest.json`.
- Added Node-based ICO generation for Adolar, Radio, Disco, TV, Player and Core.
- Added missing Player and Core MZ-1 variant icon SVG sources.
- Added a static preview site under `site/`.
- Updated build, animation and variant documentation for new contributors.

## Design Notes

- MZ-1 remains the fixed shared rocket.
- No new logo direction was introduced.
- Orbitron remains the wordmark font basis.
- Variant differences continue to use accent color, cockpit symbol and state.
