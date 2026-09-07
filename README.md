# εai.org

Static React and TypeScript site for the εai.org collaboration initiative. Vite provides the live development server; the production command renders complete HTML and compiles Tailwind CSS.

## Commands

```sh
npm ci
npm run dev
```

The Vite development site runs at `http://127.0.0.1:5173/` with live updates.

```sh
npm run check
npm test
npm run build
npm run preview
```

`npm run build` writes the GitHub Pages site to `dist/`. `npm run preview` serves that production output at `http://127.0.0.1:4173/`.
