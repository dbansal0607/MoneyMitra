# MoneyMitra — AI-Powered Financial Life OS

A full-stack, multi-agent AI web application designed for the 95% of Indians with no financial plan. Delivers three integrated experiences in a unified dashboard: 
1. MF Portfolio X-Ray 
2. Money Health Score 
3. FIRE Path Planner

## Tech Stack
- **Frontend**: Next.js 14, TailwindCSS, Framer Motion, Recharts
- **Backend**: FastAPI, LangGraph, Python 3.11+
- **AI/LLM**: Claude 3.5 Sonnet (Anthropic API)
- **Data Integrations**: `mfapi.in`, `yfinance`, `numpy-financial`, `scipy`

## Local Setup (Under 5 Commands)

```bash
# 1. Start the Frontend
cd frontend && npm install && npm run dev

# 2. Start the Backend (in a separate terminal)
cd backend && pip install -r requirements.txt && uvicorn main:app --reload
```

## Environment Variables
Create a `.env` file in the `backend/` directory with the following keys:
```env
ANTHROPIC_API_KEY=your_claude_3_5_sonnet_key
```

## Architecture & Impact Model
The complete LangGraph Multi-Agent Architecture (with failure handling and Audit Trail JSON schema) and the Financial Impact Model (calculating ₹14,280 Crore in generated value) can be found in `docs/architecture.md`.

## Demo Video
👉 **[Watch the 3-Minute Pitch Video Here](#)** 
*(Please click the link above to watch the screen-recorded flow: landing page → CAMS PDF drag-and-drop → interactive agent execution terminal → Unified Dashboard (Portfolio X-Ray, Health Radar Chart, FIRE Monte Carlo, Rebalancing Action Plan)).*

## License
Built for the ET GenAI Hackathon 2026.
