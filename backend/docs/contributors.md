
# 🚀 Contributing Guide – TechyJaunt Group1 Project

Welcome!  
This guide explains how to contribute to our project.  
Even if this is your first time using GitHub, you can follow along easily.

---

## 1️⃣ Clone the Repository

1. On our GitHub repo page, click the green **"Code"** button.
2. Copy the HTTPS link (example: `https://github.com/treepebifie-arch/TechyJaunt_Group1.git`).
3. Open your terminal/command prompt and run:

```bash
git clone https://github.com/treepebifie-arch/TechyJaunt_Group1.git
````

---

## 2️⃣ Create or Switch to Your Branch

**DO NOT** work directly on the `main` branch!!!

Branch naming rules:

`yourname-be` (example: `ade-be`)

To create a new branch:

```bash
git checkout -b yourname-[be]
```

If your branch already exists:

```bash
git checkout yourname-[be]
```

---

## 3️⃣ Keep Your Branch Updated

Before you start working **every time**:

```bash
git pull origin main
git merge main
```

This ensures you’re working with the latest code.

---

## 4️⃣ Make Your Changes

1. Open the project in VS Code:

   ```bash
   code .
   ```

2. Add or edit files for your assigned task.

3. Save your changes.

---

## 5️⃣ Commit Your Changes

```bash
git add .
git commit -m "Brief description of your changes"
```

Example:

```bash
git commit -m "Added login page UI"
```

---

## 6️⃣ Push to GitHub

```bash
git push origin yourbranchname
```

---

## 7️⃣ Create a Pull Request (PR)

1. Go to the GitHub repository in your browser.
2. Click **"Compare & pull request"**.
3. Make sure:

   * **Base branch**: `main`
   * **Compare branch**: your branch (e.g., `ade-be`)
4. Describe your changes.
5. Click **"Create Pull Request"**.

---

## ✅ Rules

* **Never** push directly to `main`.
* Always pull latest changes before starting work.
* Use clear, short commit messages.
* Test your code before pushing.
* Ask if you’re unsure — we’re in this together.

---

## 🔄 Example Workflow 

```bash
git clone https://github.com/treepebifie-arch/TechyJaunt_Group1.git
cd TechyJaunt_Group1
git checkout main
git pull origin main
git checkout -b ade-be
git merge main
code .
# make changes in VS Code
git add .
git commit -m "Added google Oauth"
git push origin ade-be


---

🎯 **That’s it!** Follow these steps for smooth workflow! Remember, we're in this together!!!.
Welcome to the team! 🚀
