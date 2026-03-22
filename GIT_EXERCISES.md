# 🏋️ Git & GitHub Exercises

Work through these 10 exercises using this Task Tracker project. Each exercise builds on the previous one.

> **Prerequisites:** Git installed, a GitHub account, and a terminal open in this project folder.

---

## Exercise 1: Initialize & First Commit

**Skills:** `git init`, `git add`, `git commit`, `git status`

```bash
# 1. Initialize a new Git repository
git init

# 2. Check the status — all files should be untracked
git status

# 3. Stage all files
git add .

# 4. Make your first commit
git commit -m "feat: initial project setup with task tracker app"

# 5. View the commit log
git log
```

**✅ Expected:** One commit in the log with all project files.

**🏆 Bonus:** Try `git add` on individual files instead of using `.` to understand selective staging.

---

## Exercise 2: Branching & Feature Work

**Skills:** `git branch`, `git checkout` / `git switch`

```bash
# 1. Create and switch to a new branch
git checkout -b feature/dark-mode-toggle

# 2. Add this button to index.html (inside the <header>, after the tagline):
#    <button id="theme-toggle" class="btn">🌙 Toggle Theme</button>

# 3. Add this to the bottom of app.js:
#    document.getElementById('theme-toggle').addEventListener('click', () => {
#        document.body.classList.toggle('light-mode');
#    });

# 4. Add this to style.css:
#    body.light-mode {
#        --bg-primary: #f0f0f5;
#        --bg-secondary: #e0e0eb;
#        --bg-card: #ffffff;
#        --text-primary: #1a1a2e;
#        --text-secondary: #4a4a5a;
#        --border: #d0d0e0;
#    }

# 5. Stage and commit your changes
git add .
git commit -m "feat: add dark/light mode toggle"

# 6. View all branches
git branch
```

**✅ Expected:** Two branches — `main` and `feature/dark-mode-toggle`. The toggle button exists only on the feature branch.

**🏆 Bonus:** Switch back to `main` with `git checkout main` and notice the toggle is gone, then switch back.

---

## Exercise 3: Merging Branches

**Skills:** `git merge`, fast-forward merge, `git log --oneline --graph`

```bash
# 1. Switch to main
git checkout main

# 2. Merge the feature branch into main
git merge feature/dark-mode-toggle

# 3. View the merge result
git log --oneline --graph

# 4. Delete the feature branch (it's merged now)
git branch -d feature/dark-mode-toggle
```

**✅ Expected:** Main now has the dark mode toggle. The feature branch is deleted.

---

## Exercise 4: Resolving Merge Conflicts

**Skills:** Conflict markers, manual resolution

```bash
# 1. Create two branches from main
git checkout -b branch-a
# Edit data.json → Change "version" to "2.0.0"
git add data.json
git commit -m "chore: bump version to 2.0.0"

git checkout main
git checkout -b branch-b
# Edit data.json → Change "version" to "3.0.0"
git add data.json
git commit -m "chore: bump version to 3.0.0"

# 2. Merge branch-a into main
git checkout main
git merge branch-a    # ✅ This should succeed (fast-forward)

# 3. Now merge branch-b — THIS WILL CONFLICT
git merge branch-b    # ❌ Conflict!

# 4. Open data.json — you'll see conflict markers:
#    <<<<<<< HEAD
#    "version": "2.0.0",
#    =======
#    "version": "3.0.0",
#    >>>>>>> branch-b

# 5. Manually resolve: pick the version you want (e.g., "3.0.0")
#    Remove ALL conflict markers (<<<, ===, >>>)

# 6. Stage and commit the resolution
git add data.json
git commit -m "fix: resolve version conflict, set to 3.0.0"
```

**✅ Expected:** Conflict resolved, clean `data.json`, and a merge commit in the log.

**🏆 Bonus:** Use `git diff` before staging to see exactly what changed.

---

## Exercise 5: Git Log & History

**Skills:** `git log`, `git diff`, `git show`, `git blame`

```bash
# 1. View compact log
git log --oneline

# 2. View log with graph
git log --oneline --graph --all

# 3. View a specific commit's details (replace <hash> with a commit hash)
git show <hash>

# 4. Compare two commits
git diff <hash1> <hash2>

# 5. See who wrote each line of a file
git blame app.js

# 6. Search commits by message
git log --grep="feat"
```

**✅ Expected:** You can navigate commit history, inspect changes, and trace authorship.

---

## Exercise 6: Undoing Changes

**Skills:** `git reset`, `git revert`, `git stash`

```bash
# --- Scenario A: Unstage a file ---
# 1. Make a change to README.md (add any text)
# 2. Stage it
git add README.md
# 3. Unstage it
git restore --staged README.md

# --- Scenario B: Discard uncommitted changes ---
git restore README.md

# --- Scenario C: Stash work-in-progress ---
# 1. Make changes to style.css (e.g., change a color)
# 2. Stash the changes
git stash
# 3. Do something else, then bring them back
git stash pop

# --- Scenario D: Revert a commit ---
# 1. Make a "bad" commit
echo "OOPS" >> README.md
git add .
git commit -m "docs: accidental bad change"
# 2. Revert it (creates a new commit that undoes it)
git revert HEAD
```

**✅ Expected:** You can stage/unstage, stash, and revert changes without losing history.

**🏆 Bonus:** Try `git reset --soft HEAD~1` to undo the last commit but keep changes staged.

---

## Exercise 7: Push to GitHub

**Skills:** Remote repos, `git remote`, `git push`

```bash
# 1. Create a new repository on GitHub (DO NOT initialize with README)
#    Go to: https://github.com/new

# 2. Add the remote
git remote add origin https://github.com/YOUR_USERNAME/task-tracker.git

# 3. Push your main branch
git push -u origin main

# 4. Verify on GitHub — all your files should be there!

# 5. Make a change locally, commit, and push
echo "" >> README.md
git add .
git commit -m "docs: test push"
git push
```

**✅ Expected:** Your project is live on GitHub with full commit history.

---

## Exercise 8: Pull Requests & Code Review

**Skills:** PRs, branching on GitHub

```bash
# 1. Create a new feature branch
git checkout -b feature/task-categories

# 2. Add a category dropdown to index.html (after the priority select):
#    <select id="task-category" class="task-priority">
#        <option value="general">General</option>
#        <option value="work">Work</option>
#        <option value="personal">Personal</option>
#    </select>

# 3. Commit and push the branch
git add .
git commit -m "feat: add task categories dropdown"
git push -u origin feature/task-categories

# 4. Go to GitHub → you'll see a prompt to create a Pull Request
# 5. Create the PR with a description of your changes
# 6. Review the "Files changed" tab
# 7. Merge the PR on GitHub

# 8. Pull the merged changes locally
git checkout main
git pull origin main
```

**✅ Expected:** A merged PR visible on GitHub with the conversation and diff.

---

## Exercise 9: Rebasing

**Skills:** `git rebase`, interactive rebase

```bash
# 1. Create a branch with multiple small commits
git checkout -b feature/animations

# Commit 1: Add transition to task items
# Edit style.css, save
git add style.css
git commit -m "style: add hover transition"

# Commit 2: Add fade-in animation
# Edit style.css, save
git add style.css
git commit -m "style: add fade-in effect"

# Commit 3: Fix typo
# Edit style.css, save
git add style.css
git commit -m "fix: typo in animation name"

# 2. Squash the 3 commits into 1 using interactive rebase
git rebase -i HEAD~3
# In the editor:
#   pick  abc1234  style: add hover transition
#   squash  def5678  style: add fade-in effect
#   squash  ghi9012  fix: typo in animation name
# Save and write a combined commit message

# 3. Verify
git log --oneline
```

**✅ Expected:** Three commits are now one clean commit.

**🏆 Bonus:** Try rebasing your branch onto `main` instead of merging: `git rebase main`.

---

## Exercise 10: Tags & Releases

**Skills:** `git tag`, annotated tags, GitHub Releases

```bash
# 1. Tag the current state as v1.0.0
git tag -a v1.0.0 -m "Release v1.0.0 - Initial task tracker"

# 2. View all tags
git tag

# 3. View tag details
git show v1.0.0

# 4. Push tags to GitHub
git push origin v1.0.0
# Or push all tags:
git push --tags

# 5. On GitHub → Go to Releases → Create a new release from the tag
#    Add release notes describing what's in this version
```

**✅ Expected:** A tagged release on GitHub that anyone can download.

**🏆 Bonus:** Make more changes, then tag as `v1.1.0` to practice versioning.

---

## 🎉 Congratulations!

You've practiced the core Git & GitHub workflows that professional developers use daily:

| Skill | Exercise |
|-------|----------|
| Repository setup | 1 |
| Branching | 2, 8 |
| Merging | 3, 4 |
| Conflict resolution | 4 |
| History & inspection | 5 |
| Undoing mistakes | 6 |
| Remote collaboration | 7, 8 |
| Rebasing | 9 |
| Releases | 10 |

> **Next steps:** Try collaborating with a friend — fork each other's repos, create PRs, and review code!
