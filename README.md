# 🚌 Easy Transport — Live Dashboard

**Student Transport Survey Analytics · Dubai Academic City**

> A fully interactive, live analytics dashboard hosted on GitHub Pages.  
> No server, no backend — pure HTML + CSS + JavaScript.

---

## 🔗 Live URL

```
https://YOUR-USERNAME.github.io/easy-transport-dashboard/
```
*(Replace `YOUR-USERNAME` with your GitHub username after deployment)*

---

## 📁 Project Structure

```
easy-transport-dashboard/
│
├── index.html                  ← Dashboard entry point (open this in browser)
│
├── assets/
│   ├── style.css               ← All styling (dark theme, responsive layout)
│   └── charts.js               ← All chart logic (Chart.js powered)
│
├── data/
│   ├── survey.json             ← Pre-aggregated chart data (20 metrics)
│   └── easy_transport_survey.csv  ← Full synthetic dataset (400 × 61)
│
└── README.md                   ← This file
```

---

## 📊 Dashboard Pages

| Page | Charts | Key Insight |
|---|---|---|
| **Overview** | KPI cards, interest doughnut, interest by university, satisfaction, spend & commute distributions | 23.8% say Yes, 56.2% Maybe |
| **Demographics** | Gender, study level, university, accommodation, nationality | 66% undergraduate, South Asian majority |
| **Transport Patterns** | Current modes, spend per mode, commute time per mode, campus days | Taxi most expensive (AED 288/mo) |
| **Pain Points** | Frequency bars, severity radar, ranked impact list | Long travel time affects 91% |
| **Features & Preferences** | Feature interest, preferred modes, importance radar, budget willingness | Live tracking #1 wanted (328/400) |
| **Digital Behaviour** | App usage, ride-hail frequency, app comfort | Google Maps used by 84% |

---

## 🚀 Deploy to GitHub Pages — Step by Step

### Step 1 — Create the repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** button → **New repository**
3. Name it: `easy-transport-dashboard`
4. Set it to **Public**
5. Leave everything else unchecked
6. Click **Create repository**

### Step 2 — Upload the files

**Option A — GitHub web interface (easiest):**

1. On your new repo page, click **"uploading an existing file"**
2. Drag and drop ALL files maintaining the folder structure:
   - `index.html` → root
   - `assets/style.css` → assets folder
   - `assets/charts.js` → assets folder
   - `data/survey.json` → data folder
   - `data/easy_transport_survey.csv` → data folder
   - `README.md` → root
3. Scroll down → click **"Commit changes"**

**Option B — Git command line:**

```bash
cd easy-transport-dashboard
git init
git add .
git commit -m "Initial dashboard commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/easy-transport-dashboard.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. In your repository, click **Settings** (top menu)
2. Scroll down to **Pages** in the left sidebar
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Wait ~60 seconds
6. Refresh the page — you'll see a green banner:  
   **"Your site is live at https://YOUR-USERNAME.github.io/easy-transport-dashboard/"**

### Step 4 — Visit your live dashboard 🎉

Open the URL in any browser. Share it with anyone — no login required.

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure, semantic markup |
| CSS3 | Dark theme, responsive grid layout |
| JavaScript (vanilla) | Navigation, data rendering |
| [Chart.js 4.4](https://www.chartjs.org/) | All 20+ charts (loaded via CDN) |
| GitHub Pages | Free hosting with custom URL |

---

## 📋 Dataset Overview

**File:** `data/easy_transport_survey.csv`  
**Rows:** 400 synthetic student survey responses  
**Columns:** 61 variables

| Category | Count | Examples |
|---|---|---|
| Demographics | 6 | Age, Gender, University, Accommodation |
| Transport pattern | 5 | Mode, Commute time, Distance, Spend |
| Pain points (binary) | 7 | HighCost, LongTime, Safety, Unreliable |
| Severity (Likert 1–5) | 6 | Severity_Cost, Severity_Time… |
| Feature interest (binary) | 10 | LiveTracking, CarpoolMatch, CashlessPayment… |
| Importance (Likert 1–5) | 6 | Importance_Safety, Importance_Cost… |
| Digital behaviour | 8 | App_GoogleMaps, App_Uber, RideHail_Frequency |
| **Target (ML)** | 1 | **Interested_In_EasyTransport_App** (Yes/No/Maybe) |

---

## 🤖 ML Use Cases

| Task | Target Variable | Algorithm |
|---|---|---|
| **Classification** | `Interested_In_EasyTransport_App` | Decision Tree, Random Forest, Gradient Boosting |
| **Regression** | `Monthly_Spend_AED` | Linear/Ridge Regression |
| **Clustering** | All features | K-Means, Latent Class |
| **Association Rules** | Pain_* + Feature_* binary columns | Apriori / FP-Growth |

---

*Easy Transport · Dubai Academic City · PBL Individual Data Analytics Project*  
*Synthetic dataset generated for academic purposes only*
