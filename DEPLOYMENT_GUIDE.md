# GitHub Pages Deployment Guide

## Prerequisites
- A GitHub account
- Git installed on your machine (✓ Already done)

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `aig-active-investors-group`
3. Description: "AIG - Active Investors Group: A social investment platform"
4. Keep it **Public** (required for free GitHub Pages)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Update Homepage URL

1. Note your GitHub username from the repository page
2. Open `package.json` in this project
3. Replace `YOUR_GITHUB_USERNAME` in the homepage field with your actual GitHub username:
   ```json
   "homepage": "https://YOUR_ACTUAL_USERNAME.github.io/aig-active-investors-group"
   ```
4. Save the file

## Step 3: Push to GitHub

Run these commands in your terminal (in this directory):

```bash
# Add the remote repository (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/aig-active-investors-group.git

# Push your code
git push -u origin main
```

## Step 4: Build and Deploy

Run this command to build and deploy:

```bash
npm run deploy
```

This will:
1. Build the web version of your app
2. Create a `gh-pages` branch
3. Deploy to GitHub Pages

## Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Click "Pages" in the left sidebar
4. Under "Source", it should already be set to "gh-pages" branch
5. Wait 1-2 minutes for deployment

## Step 6: Access Your App

Your app will be live at:
```
https://YOUR_USERNAME.github.io/aig-active-investors-group
```

## Updating Your Deployment

Whenever you make changes:

```bash
# 1. Commit your changes
git add .
git commit -m "Your commit message"
git push

# 2. Redeploy
npm run deploy
```

## Troubleshooting

### If you see a blank page:
1. Check the browser console for errors
2. Make sure the homepage URL in package.json matches your actual GitHub Pages URL
3. Clear browser cache and hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

### If deployment fails:
1. Make sure you've pushed your code to GitHub first
2. Check that the gh-pages package is installed: `npm ls gh-pages`
3. Try running `npm run build:web` first to check for build errors

## What Gets Deployed

Only the built web version (in `dist/` folder) gets deployed to GitHub Pages. The source code stays in the `main` branch.

## Notes

- The first deployment may take 5-10 minutes to go live
- Subsequent deployments are usually faster (1-2 minutes)
- GitHub Pages is free for public repositories
- Your app will work on mobile browsers too!

---

For more help, see:
- [Expo Web Docs](https://docs.expo.dev/workflow/web/)
- [GitHub Pages Docs](https://pages.github.com/)
