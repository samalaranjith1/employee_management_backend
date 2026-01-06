# Deployment Instructions for Netlify

This project has been configured for a "Monorepo" style deployment on Netlify, separating the frontend (Vite React) and backend (Express -> Netlify Functions).

## Structure
- **Root**: Contains `netlify.toml` and specific `package.json` for workspaces.
- **EMS/**: The Frontend application.
- **backend/**: The Backend application (which is wrapped as a serverless function).
- **functions/**: Contains the entry point `api.js` for Netlify Functions.

## Changes Made
1. **Root `package.json`**: Created to manage workspaces (`EMS`, `backend`).
2. **`netlify.toml`**: Configured to build the frontend and deploy the backend as functions. Redirects `/api/*` to `/.netlify/functions/api`.
3. **`backend/index.js`**: Modified to export the Express app for serverless use.
4. **`functions/api.js`**: Created as the entry point for the Netlify Function.
5. **`EMS/.env.production`**: Set `VITE_API_URL=/api` so the production build talks to the relative path (handled by Netlify redirects).
6. **Backend File Uploads**: Updated `backend/routes/recruitment.js` to use memory storage for `multer`, as Netlify Functions have a read-only filesystem (except `/tmp`, but memory is safer/easier for small files).

## How to Deploy
1. **Push to GitHub/GitLab/Bitbucket**: Ensure this code is pushed to a repository.
2. **Log in to Netlify**: Go to https://app.netlify.com/.
3. **Add New Site**: Click "Add new site" -> "Import from Git".
4. **Select Repository**: Choose your repository.
5. **Build Settings**: Netlify should automatically detect the `netlify.toml`.
   - **Base directory**: `.` (Root)
   - **Build command**: `npm run build`
   - **Publish directory**: `EMS/dist`
   - **Functions directory**: `functions`
6. **Environment Variables**:
   - Go to "Site configuration" -> "Environment variables".
   - Add your backend environment variables (from `backend/.env`) here:
     - `MONGO_URI`
     - `JWT_SECRET`
     - `PORT` (Optional, defaults to 5001 but functions handle this)
     - Any others required by your backend.

## Local Development
- To run locally, you can use `netlify dev` (if you have Netlify CLI installed) to simulate the environment.
- Or run frontend and backend separately as before:
  - Backend: `cd backend && npm start`
  - Frontend: `cd EMS && npm run dev`
