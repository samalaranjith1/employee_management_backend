# Backend Deployment Instructions (Standalone Repo)

You requested to deploy the `backend` folder as a separate repository. This folder is now fully configured to be its own Git repository and deployed directly to Netlify.

## Steps to Deploy

1.  **Create a New Repository**:
    *   Create a clean, new repository on GitHub/GitLab/Bitbucket (e.g., `ems-backend`).

2.  **Push the `backend` Folder**:
    *   Open your terminal in `c:\Users\ravin\Desktop\new\bookexpert\backend`.
    *   Initialize git (if not already): `git init`
    *   Add files: `git add .`
    *   Commit: `git commit -m "Initial backend commit"`
    *   Add remote: `git remote add origin <YOUR_NEW_REPO_URL>`
    *   Push: `git push -u origin main`

3.  **Deploy on Netlify**:
    *   Go to [Netlify](https://app.netlify.com/).
    *   "Add new site" -> "Import from Git".
    *   Select your **new backend repository**.
    *   **Build Settings**:
        *   Base directory: `.` (Leave empty or default)
        *   Build command: (Leave empty, we are using Functions)
        *   Publish directory: (Leave empty)
        *   *Netlify will read `netlify.toml` automatically.*
    *   **Environment Variables**:
        *   Add `MONGO_URI`: `mongodb+srv://samalaranjith1:Ranjith1956@cluster0.r3efdtw.mongodb.net/ems_db`
        *   Add `JWT_SECRET`: `ems_app_secret_key_2026`

4.  **Update Frontend**:
    *   Once deployed, you will get a URL (e.g., `https://my-backend.netlify.app`).
    *   Update your **Frontend** `.env` or `.env.production` to point to this new URL:
        *   `VITE_API_URL=https://my-backend.netlify.app` (or `https://my-backend.netlify.app/api` depending on if you want the prefix or not. The backend routes are defined as `/api/...`, and I redirected `/*` to the function. So `https://host/api/employees` hits the function, which sees `/api/employees`. This matches.)

## Implementation Details
*   **`functions/api.js`**: Wraps your Express app (`index.js`) using `serverless-http`.
*   **`netlify.toml`**: Redirects all traffic (`/*`) to the function.
*   **`.gitignore`**: Updated to keep your repo clean.
