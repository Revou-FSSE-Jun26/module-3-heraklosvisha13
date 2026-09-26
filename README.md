# Module 3 Frontend Exercises

## Project Overview

This repository brings together frontend exercises for the RevoU Full Stack
Software Engineering course. It covers semantic HTML, responsive CSS, browser
DOM manipulation, JavaScript array methods, TypeScript, and Tailwind CSS.

The exercises share a RevoPack bag-store theme across the website and product
catalog. A separate basketball scoreboard demonstrates interactive DOM updates.

## Folder Structure

```text
.
├── README.md
├── .gitignore
├── html-css/
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── javascript/
│   ├── array-exercise.js
│   └── dom-exercise/
│       ├── dom-exercise.html
│       ├── dom-exercise.css
│       └── dom-exercise.js
├── screenshots/
│   ├── Screenshot filtering-product.png
│   ├── Screenshot product-layout-desktop.png
│   ├── Screenshot product-layout-mobile.png
│   └── Screenshot-filtering-product-add-cart.png
└── typescript-tailwind/
	├── .gitignore
		├── index.html
		├── package.json
		├── package-lock.json
		├── postcss.config.js
		├── tailwind.config.js
		├── tsconfig.json
		└── src/
				├── input.css
				└── main.ts
```

The TypeScript/Tailwind build generates `typescript-tailwind/dist/`; installed
packages live in `typescript-tailwind/node_modules/`. Both are excluded from
version control.

## Implemented Features

### RevoPack About and Contact Page

- Responsive about, product-category, and contact sections.
- Mobile navigation menu that closes after a link is selected or Escape is
	pressed.
- Contact form validation for required fields, email format, and minimum
	message length, with inline feedback.
- Form submission is simulated in the browser; no backend is connected.

Open [`html-css/index.html`](html-css/index.html) in a browser.

### JavaScript Exercises

- The [array exercise](javascript/array-exercise.js) uses `forEach`, `map`,
	`filter`, and `reduce` to inspect product inventory and calculate stock
	values.
- The [DOM scoreboard](javascript/dom-exercise/dom-exercise.html) supports
	custom team names, +1/+2/+3 scoring, leader highlighting, saving and removing
	score-history entries, and starting a new game.

Run the array exercise from the repository root with Node.js:

```sh
node javascript/array-exercise.js
```

Open the DOM scoreboard HTML file in a browser.

### TypeScript and Tailwind Product Catalog

- Typed product data with category, price, rating, and stock information.
- Search products by name or category, with an empty-results state.
- Stock status labels and disabled add-to-cart controls for out-of-stock items.
- Add-to-cart behavior with a live cart-item count.
- Responsive catalog layout styled with Tailwind CSS.

From the project directory, install dependencies and build the CSS and
TypeScript:

```sh
cd typescript-tailwind
npm install
npm run build
```

Then open [`typescript-tailwind/index.html`](typescript-tailwind/index.html) in
a browser. The build creates `dist/output.css` and `dist/main.js`.

Useful scripts, run from `typescript-tailwind/`:

```sh
npm run typecheck  # Check TypeScript without generating output
npm run watch:css  # Rebuild Tailwind CSS when source files change
```

## Screenshots

### Product Filtering

![Product filtering](screenshots/Screenshot%20filtering-product.png)

### Product Catalog Layout

Desktop:

![Product catalog desktop layout](screenshots/Screenshot%20product-layout-desktop.png)

Mobile:

![Product catalog mobile layout](screenshots/Screenshot%20product-layout-mobile.png)

### Add to Cart

![Product filtering with add-to-cart interaction](screenshots/Screenshot-filtering-product-add-cart.png)