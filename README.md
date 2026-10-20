# Karl Mandapat · Portfolio

Personal portfolio of Karl Patrick Mandapat, Software Engineer and Web/System Developer.
A scroll-driven 3D globe (Three.js) with a cyan/violet HUD theme, boot sequence, code rain and an interactive terminal.

## Structure

```
.
├── index.html
├── css/style.css
├── js/main.js
├── assets/favicon.svg
├── .github/workflows/pages.yml   # auto-deploy to GitHub Pages
├── .nojekyll
├── .gitignore
├── LICENSE
└── README.md
```

## Run locally

Open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploy on GitHub Pages

1. Create a new repository on GitHub (for `https://<username>.github.io/`, name it `<username>.github.io`).
2. Push this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```
3. In the repo go to **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Each push to `main` redeploys. The site appears at `https://<username>.github.io/<repo>/`.

## Easter eggs

Press `` ` `` to open the terminal (try `help`), or enter the Konami code.

## License

MIT
