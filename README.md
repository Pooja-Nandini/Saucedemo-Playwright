# QA Automation Challenge

## 🚀 Overview
This project demonstrates end-to-end test automation using **Playwright + Cucumber + TypeScript**.  
It covers authentication, table interactions, and a mini workflow scenario, along with stability practices and reporting.  

---

## ✅ What’s Covered
1. **Smoke Test (Authentication)**  
   - Automates login flow.  
   - Asserts successful login.  

2. **Table Adventures**  
   - Sorting validation (Price: low to high).  

3. **Workflow Magic**  
   - Example: Add 2 products → checkout → assert total.  

4. **Stability Superpowers**  
   - Used `data-test` locators for robust element selection.  

5. **Reporting & Docs**  
   - Configured Allure reporting (currently showing 0 test cases).  
   - Recorded the test flow.  

---

## 🛠 Installation & Run

# Clone the repository
git clone https://github.com/Pooja-Nandini/Saucedemo-Playwright.git
cd Saucedemo-Playwright

# Install TypeScript
npm install -g typescript ts-node

# Install Cucumber
npm install @cucumber/cucumber --save-dev

# Install dependencies
npm install

# Run tests
npm test

# Generate report
npx allure generate allure-results --clean -o allure-report

# Open report
npx allure open allure-report
