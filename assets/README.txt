# LokeWorks asset folders

Place downloadable files in one of these folders:

- `assets/Games/`
- `assets/3-D/`
- `assets/2-D/`

Because GitHub Pages is static hosting, browser JavaScript cannot automatically list every file in a folder. To make an asset appear on the website, add an entry to `assets/assets.json`.

Example:

```json
{
  "games": [
    {
      "title": "My Game",
      "description": "A short description.",
      "file": "assets/Games/my-game.zip",
      "preview": "assets/Games/my-game.png"
    }
  ],
  "3-D": [
    {
      "title": "Low Poly Tree",
      "description": "A 3D model.",
      "file": "assets/3-D/low-poly-tree.zip",
      "preview": "assets/3-D/low-poly-tree.png"
    }
  ],
  "2-D": [
    {
      "title": "Icon Pack",
      "description": "A 2D asset pack.",
      "file": "assets/2-D/icon-pack.zip",
      "preview": "assets/2-D/icon-pack.png"
    }
  ]
}
```

The category keys in the JSON are case-sensitive: use `games`, `3-D`, and `2-D`.
If you do not have any assets yet, leave the arrays empty.
