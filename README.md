<div align="center">

<img src="https://img.shields.io/badge/MoneyMitra-AI%20Financial%20OS-6C63FF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0xIDE1aC0ydi02aDJ2NnptMC04aC0yVjdoMnYyeiIvPjwvc3ZnPg==" />

# 💰 MoneyMitra — AI-Powered Financial Life OS

### *Your Financial Truth. In 5 Minutes. For Free.*

[![Next.js](https://img.shields.io/badge/Next.js_14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![LangGraph](https://img.shields.io/badge/LangGraph-FF6B35?style=flat-square&logo=python&logoColor=white)](https://langchain-ai.github.io/langgraph/)
[![Claude](https://img.shields.io/badge/Claude_3.5_Sonnet-D97706?style=flat-square&logo=anthropic&logoColor=white)](https://anthropic.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/ET_GenAI_Hackathon-2026-6C63FF?style=flat-square)](https://unstop.com/)

<br/>

> **95% of Indians have no financial plan.**
> A good advisor costs ₹25,000/year and serves only HNIs.
> MoneyMitra gives every Indian a world-class financial advisor — free, instant, and brutally honest.

<br/>

[🎬 Watch 3-Min Demo](<div align="center">

<img src="https://img.shields.io/badge/MoneyMitra-AI%20Financial%20OS-6C63FF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0xIDE1aC0ydi02aDJ2NnptMC04aC0yVjdoMnYyeiIvPjwvc3ZnPg==" />

# 💰 MoneyMitra — AI-Powered Financial Life OS

### *Your Financial Truth. In 5 Minutes. For Free.*

[![Next.js](https://img.shields.io/badge/Next.js_14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![LangGraph](https://img.shields.io/badge/LangGraph-FF6B35?style=flat-square&logo=python&logoColor=white)](https://langchain-ai.github.io/langgraph/)
[![Claude](https://img.shields.io/badge/Claude_3.5_Sonnet-D97706?style=flat-square&logo=anthropic&logoColor=white)](https://anthropic.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/ET_GenAI_Hackathon-2026-6C63FF?style=flat-square)](https://unstop.com/)

<br/>

> **95% of Indians have no financial plan.**
> A good advisor costs ₹25,000/year and serves only HNIs.
> MoneyMitra gives every Indian a world-class financial advisor — free, instant, and brutally honest.

<br/>

[🎬 Watch 3-Min Demo](#demo-video) · [⚡ Quick Setup](#local-setup) · [🏗️ Architecture](#architecture) · [📊 Impact Model](#impact-model)

</div>

---

## 🧠 What is MoneyMitra?

MoneyMitra is a full-stack, **6-agent LangGraph AI system** that turns a CAMS PDF upload into a complete financial intelligence report — in seconds.

Upload your mutual fund statement. Answer 5 questions. Get a complete AI-powered financial plan that would cost ₹25,000/year from a human advisor.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📊 **MF Portfolio X-Ray** | Real XIRR, benchmark comparison vs Nifty 50/500, fund overlap detection, expense ratio drag, Direct vs Regular plan analysis |
| 🏥 **Money Health Score** | 6-dimension financial wellness score (Emergency, Insurance, Diversification, Debt, Tax, Retirement) with radar chart |
| 🔥 **FIRE Path Planner** | Monte Carlo simulation (1000 runs), goal-wise SIP calculator, inflation-adjusted corpus, retirement roadmap |
| 💥 **AI Market Stress Simulator** | Real-time Nifty crash simulation personalised to your debt/equity allocation |
| 📡 **Live Market Radar** | Macro news mapped directly to your specific holdings with estimated % impact |
| 🤖 **AI Narrative** | Claude 3.5 Sonnet reads all agent outputs and writes a plain-English financial story with 5 priority actions |

---

## 🏗️ Architecture

MoneyMitra is powered by a **LangGraph Directed Acyclic Graph (DAG)** — 6 autonomous agents sharing a single `AppState` object.
```
CAMS PDF Upload
      │
      ▼
┌─────────────────────────────────────────────────────┐
│                   LangGraph DAG                     │
│                                                     │
│  Agent 1        Agent 2         Agent 3             │
│  PDF Parser  →  Portfolio   →   Health              │
│  (pdfplumber)   Intelligence    Scorer              │
│                 (XIRR, Overlap) (6 dimensions)      │
│                     │                               │
│                     ▼                               │
│  Agent 4        Agent 5         Agent 6             │
│  FIRE Planner → Rebalancing  →  Narrator            │
│  (Monte Carlo)  Advisor         (Claude 3.5 Sonnet) │
│                                                     │
└─────────────────────────────────────────────────────┘
      │
      ▼
  Unified Dashboard
```

**Conditional Branching:**
- CAMS uploaded → Full pipeline: Agent 1 → 2 → 3 → 4 → 5 → 6
- Questionnaire only → Skip Agents 1 & 2: Agent 3 → 4 → 5 → 6
- FIRE only → Agent 4 → 6

Full architecture documentation with failure handling, audit trail schema, and agent I/O contracts: [`docs/architecture.md`](./docs/architecture.md)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14 (App Router), TailwindCSS, Framer Motion, Recharts |
| **Backend** | FastAPI, Python 3.11+ |
| **Agent Orchestration** | LangGraph |
| **LLM** | Claude 3.5 Sonnet (Anthropic API) |
| **PDF Parsing** | pdfplumber + PyMuPDF fallback |
| **Financial Calc** | numpy-financial (XIRR), scipy (Monte Carlo), pandas |
| **Market Data** | mfapi.in (MF NAV), yfinance (Nifty benchmarks) |
| **Auth & Storage** | Supabase |
| **Hosting** | Vercel (frontend) + Render (backend) |

---

## ⚡ Local Setup
```bash
# Clone the repository
git clone https://github.com/dbansal0607/MoneyMitra.git
cd MoneyMitra

# 1. Start the Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# 2. Start the Frontend (new terminal)
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:3000` · API at `http://localhost:8000`

---

## 🔑 Environment Variables

Create a `.env.local` file in the `backend/` directory:
```env
ANTHROPIC_API_KEY=your_claude_3_5_sonnet_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

> ⚠️ Never commit `.env.local` — it is already in `.gitignore`

---

## 🧪 Testing with Sample Data

Two sample CAMS PDFs are included in the root for judges to test:

| File | Description |
|---|---|
| `MoneyMitra_Fake_CAMS.pdf` | 5-fund portfolio (mix of Direct & Regular plans) — triggers all agent features |
| `MoneyMitra_Sample_CAS.pdf` | Original sample CAS format |

Upload either file on the dashboard to see the full agent pipeline in action.

---

## 📊 Impact Model

| Metric | Value |
|---|---|
| Cost of traditional FA | ₹25,000/year |
| Target users (1% of 14Cr demat holders) | 14 lakh users |
| Democratised advice value/year | **₹3,500 Crore** |
| Extra wealth from Direct plan switching (20yr) | ₹3.2L per user → **₹4,480 Crore** |
| XIRR improvement from rebalancing (10yr) | **₹6,300 Crore** |
| **Total impact** | **₹14,280 Crore** |

Full model with assumptions: [`docs/impact_model.md`](./docs/impact_model.md)

---

## 🎬 Demo Video

> 👉 **[Watch the 3-Minute Pitch Video](#)**

The video walks through the complete flow:
`Landing Page` → `CAMS PDF Upload` → `Agent Execution Terminal` → `Portfolio X-Ray` → `Health Radar` → `FIRE Monte Carlo` → `Live Market Radar` → `AI Narrative`

---

## 👨‍💻 Team

| | |
|---|---|
| **Dhruv Bansal** | Final Year B.Tech, EEE — VIT Vellore · GitHub: [@dbansal0607](https://github.com/dbansal0607) |
| **Ayush Ranjan** | Final Year B.Tech, EEE — VIT Vellore |

---

<div align="center">

**Built in 72 hours · ET GenAI Hackathon 2026 · Problem Statement 9**

*For the 95% of Indians who deserve a financial plan — but never had access to one.*

</div>) · [⚡ Quick Setup](#local-setup) · [🏗️ Architecture](#architecture) · [📊 Impact Model](#impact-model)

</div>

---

## 🧠 What is MoneyMitra?

MoneyMitra is a full-stack, **6-agent LangGraph AI system** that turns a CAMS PDF upload into a complete financial intelligence report — in seconds.

Upload your mutual fund statement. Answer 5 questions. Get a complete AI-powered financial plan that would cost ₹25,000/year from a human advisor.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📊 **MF Portfolio X-Ray** | Real XIRR, benchmark comparison vs Nifty 50/500, fund overlap detection, expense ratio drag, Direct vs Regular plan analysis |
| 🏥 **Money Health Score** | 6-dimension financial wellness score (Emergency, Insurance, Diversification, Debt, Tax, Retirement) with radar chart |
| 🔥 **FIRE Path Planner** | Monte Carlo simulation (1000 runs), goal-wise SIP calculator, inflation-adjusted corpus, retirement roadmap |
| 💥 **AI Market Stress Simulator** | Real-time Nifty crash simulation personalised to your debt/equity allocation |
| 📡 **Live Market Radar** | Macro news mapped directly to your specific holdings with estimated % impact |
| 🤖 **AI Narrative** | Claude 3.5 Sonnet reads all agent outputs and writes a plain-English financial story with 5 priority actions |

---

## 🏗️ Architecture

MoneyMitra is powered by a **LangGraph Directed Acyclic Graph (DAG)** — 6 autonomous agents sharing a single `AppState` object.
```
CAMS PDF Upload
      │
      ▼
┌─────────────────────────────────────────────────────┐
│                   LangGraph DAG                     │
│                                                     │
│  Agent 1        Agent 2         Agent 3             │
│  PDF Parser  →  Portfolio   →   Health              │
│  (pdfplumber)   Intelligence    Scorer              │
│                 (XIRR, Overlap) (6 dimensions)      │
│                     │                               │
│                     ▼                               │
│  Agent 4        Agent 5         Agent 6             │
│  FIRE Planner → Rebalancing  →  Narrator            │
│  (Monte Carlo)  Advisor         (Claude 3.5 Sonnet) │
│                                                     │
└─────────────────────────────────────────────────────┘
      │
      ▼
  Unified Dashboard
```

**Conditional Branching:**
- CAMS uploaded → Full pipeline: Agent 1 → 2 → 3 → 4 → 5 → 6
- Questionnaire only → Skip Agents 1 & 2: Agent 3 → 4 → 5 → 6
- FIRE only → Agent 4 → 6

Full architecture documentation with failure handling, audit trail schema, and agent I/O contracts: [`docs/architecture.md`](./docs/architecture.md)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14 (App Router), TailwindCSS, Framer Motion, Recharts |
| **Backend** | FastAPI, Python 3.11+ |
| **Agent Orchestration** | LangGraph |
| **LLM** | Claude 3.5 Sonnet (Anthropic API) |
| **PDF Parsing** | pdfplumber + PyMuPDF fallback |
| **Financial Calc** | numpy-financial (XIRR), scipy (Monte Carlo), pandas |
| **Market Data** | mfapi.in (MF NAV), yfinance (Nifty benchmarks) |
| **Storage** | Local file handling + in-memory state |
| **Hosting** | Vercel (frontend) + Render (backend) |

---

## ⚡ Local Setup
```bash
# Clone the repository
git clone https://github.com/dbansal0607/MoneyMitra.git
cd MoneyMitra

# 1. Start the Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# 2. Start the Frontend (new terminal)
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:3000` · API at `http://localhost:8000`



## 🧪 Testing with Sample Data

Two sample CAMS PDFs are included in the root for judges to test:

| File | Description |
|---|---|
| `MoneyMitra_Fake_CAMS.pdf` | 5-fund portfolio (mix of Direct & Regular plans) — triggers all agent features |
| `MoneyMitra_Sample_CAS.pdf` | Original sample CAS format |

Upload either file on the dashboard to see the full agent pipeline in action.

---

## 📊 Impact Model

| Metric | Value |
|---|---|
| Cost of traditional FA | ₹25,000/year |
| Target users (1% of 14Cr demat holders) | 14 lakh users |
| Democratised advice value/year | **₹3,500 Crore** |
| Extra wealth from Direct plan switching (20yr) | ₹3.2L per user → **₹4,480 Crore** |
| XIRR improvement from rebalancing (10yr) | **₹6,300 Crore** |
| **Total impact** | **₹14,280 Crore** |

Full model with assumptions: [`docs/impact_model.md`](./docs/impact_model.md)

---

## 🎬 Demo Video

> 👉 **[Watch the 3-Minute Pitch Video](<div align="center">

<img src="https://img.shields.io/badge/MoneyMitra-AI%20Financial%20OS-6C63FF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0xIDE1aC0ydi02aDJ2NnptMC04aC0yVjdoMnYyeiIvPjwvc3ZnPg==" />

# 💰 MoneyMitra — AI-Powered Financial Life OS

### *Your Financial Truth. In 5 Minutes. For Free.*

[![Next.js](https://img.shields.io/badge/Next.js_14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![LangGraph](https://img.shields.io/badge/LangGraph-FF6B35?style=flat-square&logo=python&logoColor=white)](https://langchain-ai.github.io/langgraph/)
[![Claude](https://img.shields.io/badge/Claude_3.5_Sonnet-D97706?style=flat-square&logo=anthropic&logoColor=white)](https://anthropic.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/ET_GenAI_Hackathon-2026-6C63FF?style=flat-square)](https://unstop.com/)

<br/>

> **95% of Indians have no financial plan.**
> A good advisor costs ₹25,000/year and serves only HNIs.
> MoneyMitra gives every Indian a world-class financial advisor — free, instant, and brutally honest.

<br/>

[🎬 Watch 3-Min Demo](#demo-video) · [⚡ Quick Setup](#local-setup) · [🏗️ Architecture](#architecture) · [📊 Impact Model](#impact-model)

</div>

---

## 🧠 What is MoneyMitra?

MoneyMitra is a full-stack, **6-agent LangGraph AI system** that turns a CAMS PDF upload into a complete financial intelligence report — in seconds.

Upload your mutual fund statement. Answer 5 questions. Get a complete AI-powered financial plan that would cost ₹25,000/year from a human advisor.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📊 **MF Portfolio X-Ray** | Real XIRR, benchmark comparison vs Nifty 50/500, fund overlap detection, expense ratio drag, Direct vs Regular plan analysis |
| 🏥 **Money Health Score** | 6-dimension financial wellness score (Emergency, Insurance, Diversification, Debt, Tax, Retirement) with radar chart |
| 🔥 **FIRE Path Planner** | Monte Carlo simulation (1000 runs), goal-wise SIP calculator, inflation-adjusted corpus, retirement roadmap |
| 💥 **AI Market Stress Simulator** | Real-time Nifty crash simulation personalised to your debt/equity allocation |
| 📡 **Live Market Radar** | Macro news mapped directly to your specific holdings with estimated % impact |
| 🤖 **AI Narrative** | Claude 3.5 Sonnet reads all agent outputs and writes a plain-English financial story with 5 priority actions |

---

## 🏗️ Architecture

MoneyMitra is powered by a **LangGraph Directed Acyclic Graph (DAG)** — 6 autonomous agents sharing a single `AppState` object.
```
CAMS PDF Upload
      │
      ▼
┌─────────────────────────────────────────────────────┐
│                   LangGraph DAG                     │
│                                                     │
│  Agent 1        Agent 2         Agent 3             │
│  PDF Parser  →  Portfolio   →   Health              │
│  (pdfplumber)   Intelligence    Scorer              │
│                 (XIRR, Overlap) (6 dimensions)      │
│                     │                               │
│                     ▼                               │
│  Agent 4        Agent 5         Agent 6             │
│  FIRE Planner → Rebalancing  →  Narrator            │
│  (Monte Carlo)  Advisor         (Claude 3.5 Sonnet) │
│                                                     │
└─────────────────────────────────────────────────────┘
      │
      ▼
  Unified Dashboard
```

**Conditional Branching:**
- CAMS uploaded → Full pipeline: Agent 1 → 2 → 3 → 4 → 5 → 6
- Questionnaire only → Skip Agents 1 & 2: Agent 3 → 4 → 5 → 6
- FIRE only → Agent 4 → 6

Full architecture documentation with failure handling, audit trail schema, and agent I/O contracts: [`docs/architecture.md`](./docs/architecture.md)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14 (App Router), TailwindCSS, Framer Motion, Recharts |
| **Backend** | FastAPI, Python 3.11+ |
| **Agent Orchestration** | LangGraph |
| **LLM** | Claude 3.5 Sonnet (Anthropic API) |
| **PDF Parsing** | pdfplumber + PyMuPDF fallback |
| **Financial Calc** | numpy-financial (XIRR), scipy (Monte Carlo), pandas |
| **Market Data** | mfapi.in (MF NAV), yfinance (Nifty benchmarks) |
| **Auth & Storage** | Supabase |
| **Hosting** | Vercel (frontend) + Render (backend) |

---

## ⚡ Local Setup
```bash
# Clone the repository
git clone https://github.com/dbansal0607/MoneyMitra.git
cd MoneyMitra

# 1. Start the Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# 2. Start the Frontend (new terminal)
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:3000` · API at `http://localhost:8000`

---

## 🔑 Environment Variables

Create a `.env.local` file in the `backend/` directory:
```env
ANTHROPIC_API_KEY=your_claude_3_5_sonnet_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

> ⚠️ Never commit `.env.local` — it is already in `.gitignore`

---

## 🧪 Testing with Sample Data

Two sample CAMS PDFs are included in the root for judges to test:

| File | Description |
|---|---|
| `MoneyMitra_Fake_CAMS.pdf` | 5-fund portfolio (mix of Direct & Regular plans) — triggers all agent features |
| `MoneyMitra_Sample_CAS.pdf` | Original sample CAS format |

Upload either file on the dashboard to see the full agent pipeline in action.

---

## 📊 Impact Model

| Metric | Value |
|---|---|
| Cost of traditional FA | ₹25,000/year |
| Target users (1% of 14Cr demat holders) | 14 lakh users |
| Democratised advice value/year | **₹3,500 Crore** |
| Extra wealth from Direct plan switching (20yr) | ₹3.2L per user → **₹4,480 Crore** |
| XIRR improvement from rebalancing (10yr) | **₹6,300 Crore** |
| **Total impact** | **₹14,280 Crore** |

Full model with assumptions: [`docs/impact_model.md`](./docs/impact_model.md)

---

## 🎬 Demo Video

> 👉 **[Watch the 3-Minute Pitch Video](#)**

The video walks through the complete flow:
`Landing Page` → `CAMS PDF Upload` → `Agent Execution Terminal` → `Portfolio X-Ray` → `Health Radar` → `FIRE Monte Carlo` → `Live Market Radar` → `AI Narrative`

---

## 👨‍💻 Team

| | |
|---|---|
| **Dhruv Bansal** | Final Year B.Tech, EEE — VIT Vellore · GitHub: [@dbansal0607](https://github.com/dbansal0607) |
| **Ayush Ranjan** | Final Year B.Tech, EEE — VIT Vellore |

---

<div align="center">

**Built in 72 hours · ET GenAI Hackathon 2026 · Problem Statement 9**

*For the 95% of Indians who deserve a financial plan — but never had access to one.*

</div>)**

The video walks through the complete flow:
`Landing Page` → `CAMS PDF Upload` → `Agent Execution Terminal` → `Portfolio X-Ray` → `Health Radar` → `FIRE Monte Carlo` → `Live Market Radar` → `AI Narrative`

---

## 👨‍💻 Team

| | |
|---|---|
| **Dhruv Bansal** | Final Year B.Tech, EEE — VIT Vellore · GitHub: [@dbansal0607](https://github.com/dbansal0607) |
| **Ayush Ranjan** | Final Year B.Tech, EEE — VIT Vellore |

---

<div align="center">


*For the 95% of Indians who deserve a financial plan — but never had access to one.*

</div>
