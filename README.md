# Savoura Recipe Website

Savoura is a full-stack recipe website for discovering and saving recipes. Visitors can browse recipes, registered users can contribute recipes and manage saved recipes, and administrators can manage users and recipe categories.

## Features

- Public home, about, news, and recipe pages
- User registration and login
- Recipe creation with an uploaded image
- Recipe browsing and saving/removing saved recipes
- Admin dashboard for managing users and categories
- MongoDB storage for user, recipe, category, and saved-recipe data

## Tech Stack

- Frontend: React 19, React Router, Axios, Recharts
- Backend: Node.js, Express 5, Mongoose, Multer, and CORS
- Database: MongoDB

## Requirements

- Node.js and npm
- MongoDB running locally on its default port

The backend connects to `mongodb://localhost:27017/recipedb`. The frontend currently calls the API at `http://localhost:5000`, so use these defaults when running locally.

## Run Locally

Start MongoDB first. Then open two terminals from the project root.

In the first terminal, start the API:

```powershell
cd backend
npm install
node server.js
```

The API listens on [http://localhost:5000](http://localhost:5000). Its root endpoint (`/`) returns a connection status message.

In the second terminal, start the React app:

```powershell
cd frontend
npm install
npm start
```

The frontend opens at [http://localhost:3000](http://localhost:3000).

## Useful Frontend Commands

Run these from `frontend/`:

```bash
npm test
npm run build
```

`npm test` runs the Create React App test suite. `npm run build` creates an optimized production build in `frontend/build/`.

## Application Routes

| URL | Purpose |
| --- | --- |
| `/` | Home page |
| `/about` | About page |
| `/news` | News page |
| `/registration` | User registration |
| `/login` | Login |
| `/recipes` | Public recipe listing |
| `/user` | User dashboard |
| `/user/allrecipes` | Browse recipes while signed in |
| `/user/addrecipe` | Add a recipe |
| `/user/savedrecipe` | View saved recipes |
| `/admin` | Admin dashboard |
| `/admin/category` | Manage recipe categories |
| `/admin/user` | Manage users |

## API Overview

All API routes are mounted under `/api`:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/user/register` | Register a user; accepts an optional profile image |
| `POST` | `/api/user/login` | Log in |
| `GET` | `/api/user/users` | List users |
| `GET`, `DELETE` | `/api/user/:id` | Get or delete a user |
| `GET` | `/api/category` | List categories |
| `POST` | `/api/category/add` | Add a category |
| `PUT`, `DELETE` | `/api/category/:id` | Update or delete a category |
| `GET` | `/api/recipe` | List recipes |
| `GET` | `/api/recipe/:id` | Get a recipe |
| `POST` | `/api/recipe/addrecipe` | Add a recipe with an image |
| `DELETE` | `/api/recipe/:id` | Delete a recipe owned by the requesting user |
| `POST` | `/api/saved/add` | Save a recipe for a user |
| `GET` | `/api/saved?userId=:id` | List a user's saved recipes |
| `DELETE` | `/api/saved/:id?userId=:id` | Remove a saved recipe |

Uploaded profile and recipe images are stored in `backend/uploads/` and served from `/uploads/` by the API.

## Project Structure

```text
backend/
  Controllers/       User and category controller logic
  models/            Mongoose models
  routes/             Express API routes
  uploads/            Uploaded images
  server.js           Express app and MongoDB connection
frontend/
  public/              Static assets and admin theme
  src/                 React app, pages, and components
README.md
```

## Notes

- There is no root-level install or start script; install and run the frontend and backend separately.
- The backend currently uses a local MongoDB URL and the frontend uses a fixed API URL. Update these in the source if your development services use different hosts or ports.
- This project is configured for local development. Review authentication, credential storage, configuration, and upload validation before deploying it publicly.
