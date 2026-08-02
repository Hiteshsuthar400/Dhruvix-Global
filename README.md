# Project scaffolding

This commit adds folders and starter files to scaffold an advanced store website:

- assets/images/ — images folder (place your HD hero and product images here)
- assets/css/, assets/js/ — theme and client scripts
- pages/cart.html — client-side cart demo (localStorage)
- secret/secret.html — unlinked secret page with client-side gate (placeholder)
- secrets/.env.example — example environment variables and README
- server/ — example Node.js server files and DB connectors (MongoDB + MySQL examples)
- .gitignore updated to ignore secrets and node_modules

Next steps:
- Add real images to assets/images (hero.jpg, products/*)
- Populate secrets/.env on your deployment server (do NOT commit real secrets)
- Optionally review server app and install dependencies (express, mongoose, mysql2, dotenv)
