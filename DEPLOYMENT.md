# Vercel Deployment Guide

## Changes Made for Vercel Compatibility

Your project has been updated to be fully compatible with Vercel deployment. Here are the key changes:

### 1. **api/index.py**
   - Updated file paths to use absolute paths relative to the project root
   - Changed from `../templates` and `../static` to `os.path.join(PROJECT_ROOT, ...)`
   - This ensures paths work correctly in Vercel's serverless environment
   - Added `encoding='utf-8'` to file operations for consistency

### 2. **vercel.json**
   - Configured proper routing for static files
   - Updated environment settings for production
   - Routes now correctly serve static assets and API endpoints

### 3. **requirements.txt**
   - Added all Flask dependencies with pinned versions
   - Ensures consistent Python environment across deployments

### 4. **.vercelignore & .gitignore**
   - Created to exclude unnecessary files from deployment
   - Reduces deployment size and improves performance

## How to Deploy

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Prepare for Vercel deployment"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [https://vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect the Flask app
   - Click "Deploy"

## Local Testing

To test that everything works locally:

```bash
python api/index.py
```

Then visit `http://localhost:5000` in your browser.

## Important Notes

- **Static Files**: All CSS, JS, and images are served from `/static/`
- **Templates**: HTML templates are stored in `/templates/`
- **Data**: JSON data is loaded from `/data/`
- **API Endpoints**: All API endpoints remain the same (`/api/buildings`, `/api/search`, `/api/nearby`)

## Troubleshooting

If you experience issues:
1. Verify `buildings.json` exists in the `/data/` folder
2. Check that all template and static file paths in `index.html` use relative paths like `/static/css/style.css`
3. Ensure `requirements.txt` is in the project root
4. Check Vercel deployment logs for detailed error messages

Your app should now deploy and work exactly as it does locally!
