# Release Checklist

Run these steps from the repository root:

```bash
npm install
npm run check
npm run build
git status
git add .
git commit -m "Add v0.6.0 repository stabilization and preview site"
git tag v0.6.0
git push
git push origin v0.6.0
```

Before tagging, confirm that generated exports are expected and that no SVG source has changed the MZ-1 silhouette.
