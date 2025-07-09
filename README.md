# Pruu Cakes Website

A modern, visually stunning landing page and product showcase for Pruu Cakes, a premium home-based bakery in Mumbai.

## Features

- **Modern Hero Section**: Glassmorphism, animated backgrounds, and floating cards for a premium first impression.
- **About Section**: Story, baker profile, and bakery highlights with beautiful visuals.
- **Products Section**: Dynamic product grid, category filter, and modal for product details.
- **Contact Section**: Contact info, social links, and a working contact form.
- **Footer**: Quick links, contact info, and admin panel access.
- **Admin Panel**: (Accessible via button, not included in this README)
- **Fully Responsive**: Looks great on all devices.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons
- **Backend**: (API for cakes and contact form, not included here)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd pruzz_cake
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173)

### Backend API
- The frontend expects a backend API running at `http://localhost:5000/api/cakes` for product data.
- The contact form posts to `/api/contact`.
- You can mock these endpoints or connect to your own backend.

## Customization
- Update bakery info, images, and product data as needed in the backend or via the admin panel.
- All UI/UX is easily customizable via Tailwind CSS classes in `src/App.jsx`.

## Folder Structure

```
pruzz_cake/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   └── assets/
│       └── logo_pruu_cake.png
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Credits
- UI/UX: Modern glassmorphism, animated backgrounds, and responsive design by Sumeet Pathak.
- Images: Unsplash, custom bakery images.
- Icons: [Lucide Icons](https://lucide.dev/)

## License
This project is for educational and demonstration purposes. For commercial use, please contact the author.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
