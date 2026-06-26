# Add v0.5.0 files to the repository

Copy the contents of this package into the repository root and run:

```bash
git add .
git commit -m "Add v0.5.0 build and export automation"
git tag v0.5.0
git push
git push origin v0.5.0
```

Release text is in `RELEASE-v0.5.0.md`.

After pushing, GitHub Actions should run the export build automatically.
