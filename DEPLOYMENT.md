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

## Repository Information

- **GitHub Repository**: https://github.com/BJP-GU/Portfolio.git
- **Remote Name**: `origin`
- **Default Branch**: `main`

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

