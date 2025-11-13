# 🏃 CSV Runner Dashboard

## 1) Project Overview
This project is a **CSV Runner Dashboard** built for the **Dayant Tech Frontend Assignment**.  
It allows users to upload a CSV file with columns `date`, `person`, and `miles run`, and view:
- Data visualizations (overall + per-person)
- Summary metrics (average, min, max miles)
- Proper error handling for invalid CSV files

Built using **Next.js + shadcn/ui + Recharts + Papaparse**.


## 2) Assumptions
- CSV file must contain exactly these headers:  
  `date, person, miles run`
- No database or authentication is required — the app runs fully in-browser.
- Dates are valid and formatted as `YYYY-MM-DD`.
- Decimal values in `miles run` are accepted.


## 3) Prerequisites
- Node.js version: **22.13.1**
- npm version: **11.0.0**
- No local database is needed.
- Tools used: VS Code, PowerShell, and web browser (Chrome).


## 4) Setup Instructions

### Install dependencies
```bash
npm install

Environment

No environment variables are required.
.env is not needed for this project.


Sample Data

A sample CSV file (sample.csv) is included in the root folder:

date,person,miles run
2025-01-01,John,3.2
2025-01-01,Mary,4.1
2025-01-02,John,2.9
2025-01-02,Mary,5.0
2025-01-03,John,3.8


5) Run and Verify
Start the app
npm run dev


Visit http://localhost:3000

Verify acceptance items

Upload a valid CSV → shows metrics + charts.

Invalid CSV headers → shows red error message.

Overall chart appears for all people.

Per-person charts appear below.

Metrics show correct average, min, and max.


6) Features and Limitations
Features

CSV upload and validation

Dynamic summary metrics (avg, min, max)

Overall + per-person charts using Recharts

Error handling for bad input

Clean, responsive UI with shadcn/ui

Works fully offline (no backend required)


Limitations

No persistent storage (data resets on reload)

CSV must have consistent headers

Limited accessibility testing


Future Improvements

Add CSV export/download feature

Add dark mode

Support filtering by date range


7)Notes on Architecture
Folder Structure
csv-runner-dashboard/
│
├── app/
│   ├── page.tsx     # Main dashboard page
│   ├── globals.css  # Tailwind global styles
│
├── components/ui/   # shadcn components (button, card, input)
├── sample.csv        # Example CSV data
├── package.json
└── README.md


Key Components

page.tsx → Handles upload, parsing, and chart rendering

Papaparse → CSV parsing

Recharts → Data visualization

shadcn/ui → Modern, accessible UI components


State and Data Flow

State managed via React hooks (useState)

CSV data parsed and validated client-side

Charts rendered dynamically from parsed data



8) Accessibility and UI

Clear focus states and large clickable areas

Semantic HTML with headings and ARIA-friendly components

Proper spacing and typography for readability

High-contrast text and minimal color palette for accessibility