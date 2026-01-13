# Deployment & Update Guide

## Pushing Updates to GitHub

When you make changes to your portfolio site, follow these steps to push updates to GitHub:

### Step 1: Check Your Changes
```bash
cd /Users/bryceparsons/Desktop/Portfolio
git status
```
This shows which files have been modified, added, or deleted.

### Step 2: Stage Your Changes
Add all modified files:
```bash
git add .
```

Or add specific files:
```bash
git add index.html styles.css
```

### Step 3: Commit Your Changes
```bash
git commit -m "Description of your changes"
```

Examples:
- `git commit -m "Update portfolio with new project"`
- `git commit -m "Fix responsive design issues"`
- `git commit -m "Add new case study section"`

### Step 4: Push to GitHub
```bash
git push origin main
```

Or if you want to push and set upstream (first time only):
```bash
git push -u origin main
```

## Complete Workflow Example

Here's the complete workflow in one go:

```bash
cd /Users/bryceparsons/Desktop/Portfolio
git add .
git commit -m "Your commit message here"
git push origin main
```

## Automatic Vercel Deployment

Once you push to GitHub:
- ✅ Vercel automatically detects the changes
- ✅ Vercel rebuilds and redeploys your site
- ✅ Your custom domain updates automatically
- ✅ Usually takes 1-2 minutes to complete

You can check deployment status at: [vercel.com/dashboard](https://vercel.com/dashboard)

### Vercel Configuration

**Important**: Make sure Vercel is connected to the correct repository!

1. **Vercel Dashboard → Your Project → Settings → Git**
   - Repository should be: `BJP-GU/Portfolio`
   - Production Branch: `main`

2. **Vercel Dashboard → Your Project → Settings → General**
   - Framework Preset: `Other` (or `Static Site`)
   - Root Directory: Leave empty

3. **Vercel Dashboard → Your Project → Settings → Build & Development Settings**
   - Build Command: Leave empty (no build needed for static site)
   - Output Directory: Leave empty (or `.`)
   - Install Command: Leave empty

**Note**: This is a static HTML/CSS/JS site, so no build process is required. Vercel will serve your files directly.

## Repository Information

- **GitHub Repository**: https://github.com/BJP-GU/Portfolio.git
- **Remote Name**: `origin`
- **Default Branch**: `main`

### Verify Your Remote is Set Correctly

To check which repository your local project is connected to:
```bash
git remote -v
```

You should see:
```
origin	https://github.com/BJP-GU/Portfolio.git (fetch)
origin	https://github.com/BJP-GU/Portfolio.git (push)
```

If it shows a different repository, update it:
```bash
git remote set-url origin https://github.com/BJP-GU/Portfolio.git
```

## Quick Reference Commands

```bash
# Check status
git status

# See what changed
git diff

# View commit history
git log --oneline

# Pull latest changes (if working from multiple machines)
git pull origin main

# View remote repository
git remote -v
```

## Troubleshooting

### If changes aren't appearing on your production site

**1. Verify your local git remote:**
```bash
git remote -v
```
Should show: `https://github.com/BJP-GU/Portfolio.git`

**2. Check Vercel repository connection:**
- Go to Vercel Dashboard → Your Project → Settings → Git
- Repository should be: `BJP-GU/Portfolio`
- If it shows a different repository (like `parsons_portfolio`), disconnect and reconnect to `BJP-GU/Portfolio`

**3. Verify you've pushed to GitHub:**
```bash
git push origin main
```
Check that your changes appear on GitHub: https://github.com/BJP-GU/Portfolio

**4. Check Vercel deployment logs:**
- Go to Vercel Dashboard → Deployments
- Check if a new deployment was triggered after your push
- If not, manually trigger a redeploy

**This is the most common reason changes don't appear in production!**

### If you get "Your branch is ahead of origin/main"
This means you have local commits that haven't been pushed yet. Run:
```bash
git push origin main
```

### If you get merge conflicts
If someone else (or you from another machine) pushed changes:
```bash
git pull origin main
# Resolve conflicts, then:
git add .
git commit -m "Merge conflicts resolved"
git push origin main
```

### If you want to undo local changes (before committing)
```bash
# Discard changes to a specific file
git checkout -- filename

# Discard all changes
git checkout -- .
```

### If you want to undo the last commit (but keep changes)
```bash
git reset --soft HEAD~1
```

---

**Note**: Always commit and push your changes regularly to keep your GitHub repository and Vercel deployment in sync!

