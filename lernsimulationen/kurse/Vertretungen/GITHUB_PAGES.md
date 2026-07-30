# 🌐 GitHub Pages Deployment Guide

Classroom Buzzer erfordert **keinerlei Node.js-Backend, PHP oder Datenbank-Server** auf dem Host. Die gesamte Anwendung besteht nach dem Build aus statischen HTML-, CSS- und JS-Dateien und läuft perfekt auf GitHub Pages.

---

## 🛠️ Manuelles Deployment über GitHub Pages

### Schritt 1: Build erstellen
```bash
npm run build
```
Nach der Ausführung entsteht ein Ordner namens `dist/`.

### Schritt 2: Auf GitHub Push & Pages aktivieren
1. Übertrage das Projekt in dein GitHub-Repository.
2. Gehe in deinem Repository auf **Settings** -> **Pages**.
3. Wähle unter **Source** die Option **GitHub Actions** oder erstelle einen Branch `gh-pages` aus dem Inhalt des `dist/`-Ordners.

---

## 🤖 Automatisches Deployment per GitHub Actions (Empfohlen)

Erstelle im Repository die Datei `.github/workflows/deploy.yml`:

```yaml
name: Deploy Classroom Buzzer to GitHub Pages

on:
  push:
    branches: ["main"]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```
