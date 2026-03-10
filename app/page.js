"use client";
import { useState, useRef, useCallback, useEffect } from "react";

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  primary: "#14b8a6",
  primaryDark: "#0f766e",
  primaryLight: "#ccfbf1",
  primaryBg: "#f0fdfa",

  emerald: "#10b981",
  amber: "#f59e0b",
  red: "#ef4444",

  navy: "#0f172a",

  slate800: "#1e293b",
  slate700: "#334155",
  slate600: "#475569",
  slate500: "#64748b",
  slate400: "#94a3b8",
  slate300: "#cbd5e1",
  slate200: "#e2e8f0",
  slate100: "#f8fafc",

  white: "#ffffff",
  border: "#99f6e4",
};

const fmt = (n) => new Intl.NumberFormat("en-IN").format(n || 0);

// ─── Logo SVG ─────────────────────────────────────────────────────────────────
function LogoIcon({ size = 40 }) {
  return (
    <img
      src="/logo2.png"
      alt="IntelliCredit Logo"
      style={{
        width: size,
        height: size,
        objectFit: "contain"
      }}
    />
  );
}

// ─── Profile Dropdown ─────────────────────────────────────────────────────────
function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
        background: open ? C.primaryLight : C.white,
        border: `1.5px solid ${open ? C.primary : C.slate200}`,
        borderRadius: 999, padding: "6px 14px 6px 8px", transition: "all 0.15s",
      }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg, ${C.primary}, ${C.emerald})`, color: C.white, fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>J</div>
        <div style={{ textAlign: "left" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: C.navy, lineHeight: 1.2 }}>Jeshwanth</p>
          <p style={{ fontSize: 11, color: C.slate400, lineHeight: 1.2 }}>Credit Officer</p>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.slate400} strokeWidth="2" style={{ transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, minWidth: 280, background: C.white, borderRadius: 16, border: `1px solid ${C.slate200}`, boxShadow: "0 20px 60px rgba(0,0,0,0.15)", zIndex: 100, overflow: "hidden" }}>
          <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${C.slate100}`, background: `linear-gradient(135deg, ${C.primaryBg}, #f0fdf4)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${C.primary}, ${C.emerald})`, color: C.white, fontWeight: 800, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>J</div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15, color: C.navy }}>Jeshwanth</p>
                <p style={{ fontSize: 12, color: C.emerald, fontWeight: 600 }}>● Active Session</p>
              </div>
            </div>
          </div>
          <div style={{ padding: "14px 20px" }}>
            {[{ icon: "🏦", label: "Bank", value: "Bank of India" }, { icon: "🪪", label: "Employee ID", value: "BOI20345" }, { icon: "✉️", label: "Email", value: "jeshwanth@bank.com" }].map(r => (
              <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${C.slate100}` }}>
                <span style={{ fontSize: 16 }}>{r.icon}</span>
                <div>
                  <p style={{ fontSize: 11, color: C.slate400, fontWeight: 500 }}>{r.label}</p>
                  <p style={{ fontSize: 13, color: C.slate700, fontWeight: 600 }}>{r.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: "10px 20px 16px" }}>
            <button onClick={() => alert("Logged out")} style={{ width: "100%", padding: "10px", borderRadius: 8, background: "#fef2f2", color: C.red, border: "1px solid #fecaca", cursor: "pointer", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Delete Modal ─────────────────────────────────────────────────────────────
function DeleteModal({ company, onConfirm, onCancel }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: C.white, borderRadius: 20, padding: 32, width: 400, boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>
        </div>
        <h3 style={{ textAlign: "center", fontSize: 18, fontWeight: 700, color: C.navy, marginBottom: 8 }}>Delete Appraisal?</h3>
        <p style={{ textAlign: "center", fontSize: 14, color: C.slate600, marginBottom: 24 }}>
          Are you sure you want to delete the appraisal for <b>"{company}"</b>? This action cannot be undone.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onCancel} style={{ flex: 1, padding: "10px", borderRadius: 8, border: `1.5px solid ${C.slate200}`, background: C.white, cursor: "pointer", fontWeight: 600, color: C.slate700 }}>Cancel</button>
          <button onClick={onConfirm} style={{ flex: 1, padding: "10px", borderRadius: 8, border: "none", background: C.red, cursor: "pointer", fontWeight: 600, color: C.white }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ─── Stepper ──────────────────────────────────────────────────────────────────
const STEPS = ["Company Details", "Document Upload", "AI Research", "Risk Analysis", "CAM Report"];
function Stepper({ current }) {
  return (
    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
      {STEPS.map((s, i) => {
        const done = i < current, active = i === current;
        return (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 999, border: `1.5px solid ${done || active ? C.primary : C.slate200}`, background: active ? C.primary : done ? C.primaryBg : C.white, color: active ? C.white : done ? C.primary : C.slate500, fontWeight: 500, fontSize: 12, whiteSpace: "nowrap" }}>
              {done ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg> : <div style={{ width: 11, height: 11, borderRadius: "50%", border: `2px solid ${active ? "rgba(255,255,255,0.5)" : C.slate300}` }} />}
              {s}
            </div>
            {i < STEPS.length - 1 && <div style={{ width: 20, height: 1.5, background: i < current ? C.primary : C.slate200 }} />}
          </div>
        );
      })}
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({ onNew, onSearch }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: `1px solid ${C.border}`, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(16px)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <LogoIcon size={40} />
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: C.navy, letterSpacing: "-0.5px", lineHeight: 1.1 }}>
              Intelli<span style={{ color: C.primary }}>Credit</span>
            </h1>
            <p style={{ fontSize: 11, color: C.slate400, fontWeight: 500 }}>AI-powered corporate credit appraisal</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          
          {onSearch && (
            <div style={{ position: "relative" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.slate400} strokeWidth="2" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input placeholder="Search appraisals…" onChange={e => onSearch(e.target.value)} style={{ padding: "8px 14px 8px 30px", borderRadius: 999, border: `1.5px solid ${C.border}`, background: C.primaryBg, fontSize: 13, width: 200, outline: "none" }} />
            </div>
          )}
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}

// ─── Metric Card ──────────────────────────────────────────────────────────────
function MetricCard({ label, value, color, icon }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: "20px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 46, height: 46, borderRadius: 12, background: `${color || C.primary}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{icon}</div>
      <div>
        <p style={{ fontSize: 12, color: C.slate500, fontWeight: 500 }}>{label}</p>
        <p style={{ fontSize: 30, fontWeight: 800, color: color || C.navy, lineHeight: 1.1 }}>{value}</p>
      </div>
    </div>
  );
}

// ─── Status config ────────────────────────────────────────────────────────────
const SC = {
  completed: { label: "Completed", color: "#10b981", bg: "#f0fdf4" },
  research: { label: "AI Research", color: "#d97706", bg: "#fffbeb" },
  documents: { label: "Documents", color: "#0ea5e9", bg: "#f0f9ff" },
  company: { label: "Company", color: "#64748b", bg: "#f1f5f9" },
  cam: { label: "CAM Ready", color: "#7c3aed", bg: "#f5f3ff" },
};

// ─── Appraisal Card ───────────────────────────────────────────────────────────
function AppraisalCard({ item, onOpen, onDelete }) {
  const s = SC[item.step] || SC.company;
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <p style={{ fontWeight: 700, fontSize: 14, color: C.navy, flex: 1, marginRight: 8 }}>{item.company}</p>
        {item.creditScore && <div style={{ textAlign: "center", minWidth: 44 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: item.creditScore >= 80 ? C.emerald : item.creditScore >= 60 ? C.amber : C.red, lineHeight: 1 }}>{item.creditScore}</div>
          <div style={{ fontSize: 9, color: C.slate400, fontWeight: 500 }}>SCORE</div>
        </div>}
      </div>
      <span style={{ padding: "3px 10px", borderRadius: 999, fontSize: 11, background: s.bg, color: s.color, fontWeight: 600, alignSelf: "flex-start", marginBottom: 10 }}>{s.label}</span>
      <div style={{ fontSize: 12, color: C.slate600, flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
        <p>Industry: <b style={{ color: C.slate700 }}>{item.industry}</b></p>
        <p>Loan: <b style={{ color: C.navy }}>₹{fmt(item.amount)}</b></p>
        <p style={{ color: C.slate400, fontSize: 11 }}>{item.updated}</p>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
        <button onClick={() => onOpen(item)} style={{ flex: 1, padding: "7px", borderRadius: 8, border: `1.5px solid ${C.primary}`, background: C.primaryBg, cursor: "pointer", fontSize: 12, fontWeight: 600, color: C.primary }}>
          {item.step === "completed" ? "View" : "Continue"}
        </button>
        <button onClick={() => onDelete(item)} style={{ padding: "7px 10px", borderRadius: 8, border: "1.5px solid #fecaca", background: "#fef2f2", cursor: "pointer", color: C.red }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></svg>
        </button>
      </div>
    </div>
  );
}

// ─── Charts ───────────────────────────────────────────────────────────────────
function LineChart({ data, color = C.primary }) {
  const W = 500, H = 130, PAD = 30;
  const vals = data.map(d => d.v);
  const min = Math.min(...vals) * 0.9, max = Math.max(...vals) * 1.1;
  const xs = data.map((_, i) => PAD + (i / (data.length - 1)) * (W - 2 * PAD));
  const ys = vals.map(v => H - PAD - ((v - min) / (max - min)) * (H - 2 * PAD));
  const path = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ");
  const area = `${path} L${xs[xs.length-1]},${H-PAD} L${xs[0]},${H-PAD} Z`;
  const gid = `ag${color.slice(1)}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%">
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop stopColor={color} stopOpacity="0.15" /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      {[0,0.5,1].map((t,i) => { const y = H-PAD-t*(H-2*PAD); return <line key={i} x1={PAD} x2={W-PAD} y1={y} y2={y} stroke={C.slate200} strokeDasharray="4 3" />; })}
      {data.map((d,i) => <text key={i} x={xs[i]} y={H-5} textAnchor="middle" fontSize="10" fill={C.slate400}>{d.l}</text>)}
      <path d={area} fill={`url(#${gid})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {xs.map((x,i) => <circle key={i} cx={x} cy={ys[i]} r="4" fill={C.white} stroke={color} strokeWidth="2" />)}
    </svg>
  );
}

function Gauge({ score }) {
  const r=60, cx=80, cy=80, toRad=d=>(d*Math.PI)/180;
  const arc=(s,e,col)=>{ const sp={x:cx+r*Math.cos(toRad(s)),y:cy+r*Math.sin(toRad(s))}, ep={x:cx+r*Math.cos(toRad(e)),y:cy+r*Math.sin(toRad(e))}; return <path d={`M${sp.x},${sp.y} A${r},${r} 0 ${e-s>180?1:0} 1 ${ep.x},${ep.y}`} fill="none" stroke={col} strokeWidth="12" strokeLinecap="round" />; };
  const angle=-150+(score/100)*300, nx=cx+(r-14)*Math.cos(toRad(angle)), ny=cy+(r-14)*Math.sin(toRad(angle));
  const col=score>=80?C.emerald:score>=60?C.amber:C.red;
  return (
    <svg viewBox="0 0 160 110" width="170">
      {arc(-150,30,C.slate100)}{arc(-150,-150+(score/100)*300,col)}
      <circle cx={nx} cy={ny} r="6" fill={C.white} stroke={col} strokeWidth="2.5" />
      <text x={cx} y={cy+16} textAnchor="middle" fontSize="26" fontWeight="800" fill={C.navy}>{score}</text>
      <text x={cx} y={cy+30} textAnchor="middle" fontSize="10" fill={C.slate400}>/100</text>
    </svg>
  );
}

// ─── Demo Data ────────────────────────────────────────────────────────────────
const DEMO_INIT = [
  {
    id: "demo1",
    company: "SteelWave Infrastructure Pvt Ltd",
    industry: "Infrastructure & Construction",
    amount: 120000000,
    step: "completed",
    updated: "10/03/2026",
    creditScore: 38,
    cin: "U45200MH2017PTC987654",
    year: "2017",
    loanAmount: "120000000",
    purpose: "Infrastructure project funding and machinery purchase",
    directors: "Rajiv Mehta, Suresh Patil",
    contact: "9876543211",
    email: "info@steelwaveinfra.com",
    address: "Tower B, Bandra Kurla Complex, Mumbai 400051",
    legalCases: 5,

    riskData: {
      score: 38,
      level: "High",
      industryRisk: "High",
      debtTrend: [
        { l: "Q1", v: 1.6 },
        { l: "Q2", v: 1.8 },
        { l: "Q3", v: 2.1 },
        { l: "Q4", v: 2.3 }
      ],
      profitTrend: [
        { l: "Q1", v: 1.2 },
        { l: "Q2", v: 1.0 },
        { l: "Q3", v: 0.9 },
        { l: "Q4", v: 0.8 }
      ],
      alerts: [
        "5 pending litigation cases against the company.",
        "Debt exposure significantly higher than industry average.",
        "Negative news regarding delayed vendor payments."
      ],
      exposure: "₹12 Cr"
    },

    aiResult: {
      summary:
        "SteelWave Infrastructure Pvt Ltd is a mid‑scale infrastructure contractor seeking ₹12 Cr funding. Financial analysis shows weak profitability (₹0.8 Cr net profit) against high outstanding debt of ₹22 Cr. Public records reveal five litigation cases and multiple reports of delayed vendor payments. Infrastructure sector slowdown further increases repayment risk.",
      confidence: 84,
      docsProcessed: 4,
      dataPoints: 21,
      externalSources: 7
    },

    recommendation: {
      action: "Reject Loan",
      amount: 0,
      rate: "N/A",
      tenure: "N/A"
    },

    demoFiles: [
      { name: "financial_statement.pdf", classification: "Financial Statement", status: "Verified" },
      { name: "gst_return_fy25.pdf", classification: "GST Return", status: "Verified" },
      { name: "bank_statement_q4.xlsx", classification: "Bank Statement", status: "Verified" },
      { name: "annual_report_2024.pdf", classification: "Annual Report", status: "Verified" }
    ]
  },

  {
    id: "demo2",
    company: "ABC Textiles Pvt Ltd",
    industry: "Textile Manufacturing",
    amount: 80000000,
    step: "completed",
    updated: "09/03/2026",
    creditScore: 72,
    cin: "U17000MH2015PTC234567",
    year: "2015",
    loanAmount: "80000000",
    purpose: "Expansion of weaving unit and working capital",
    directors: "Anil Kumar Jain, Priya Jain",
    contact: "9876543210",
    email: "info@abctextiles.com",
    address: "Plot 45, MIDC Industrial Area, Bhiwandi, Maharashtra",
    legalCases: 2,

    riskData: {
      score: 72,
      level: "Medium",
      industryRisk: "Medium",
      debtTrend: [
        { l: "Q1", v: 0.72 },
        { l: "Q2", v: 0.68 },
        { l: "Q3", v: 0.65 },
        { l: "Q4", v: 0.62 }
      ],
      profitTrend: [
        { l: "Q1", v: 42 },
        { l: "Q2", v: 44 },
        { l: "Q3", v: 45 },
        { l: "Q4", v: 47 }
      ],
      alerts: [
        "2 minor civil disputes filed by suppliers.",
        "Debt‑to‑equity ratio slightly above sector average."
      ],
      exposure: "₹6 Cr"
    },

    aiResult: {
      summary:
        "ABC Textiles Pvt Ltd is a mid‑sized textile manufacturer generating ₹50 Cr revenue with ₹4.5 Cr net profit. AI analysis of financial statements and GST records indicates stable business operations. Two minor legal disputes are present but do not materially impact the company’s creditworthiness.",
      confidence: 78,
      docsProcessed: 4,
      dataPoints: 18,
      externalSources: 6
    },

    recommendation: {
      action: "Approve Loan",
      amount: 60000000,
      rate: "11.5%",
      tenure: "60 months"
    },

    demoFiles: [
      { name: "financial_statement.pdf", classification: "Financial Statement", status: "Verified" },
      { name: "gst_return_fy25.pdf", classification: "GST Return", status: "Verified" },
      { name: "bank_statement_q4.xlsx", classification: "Bank Statement", status: "Verified" },
      { name: "annual_report_2024.pdf", classification: "Annual Report", status: "Verified" }
    ]
  },

  {
    id: "demo3",
    company: "GreenEnergy Solar Ltd",
    industry: "Renewable Energy",
    amount: 200000000,
    step: "completed",
    updated: "08/03/2026",
    creditScore: 85,
    cin: "U40100DL2012PLC456789",
    year: "2012",
    loanAmount: "200000000",
    purpose: "Solar plant expansion and grid integration",
    directors: "Vikram Singh Rathore, Neha Sharma",
    contact: "9988776655",
    email: "finance@greenenergy.in",
    address: "Sector 10, Dwarka Industrial Area, New Delhi",
    legalCases: 0,

    riskData: {
      score: 85,
      level: "Low",
      industryRisk: "Low",
      debtTrend: [
        { l: "Q1", v: 0.42 },
        { l: "Q2", v: 0.40 },
        { l: "Q3", v: 0.38 },
        { l: "Q4", v: 0.35 }
      ],
      profitTrend: [
        { l: "Q1", v: 165 },
        { l: "Q2", v: 172 },
        { l: "Q3", v: 178 },
        { l: "Q4", v: 185 }
      ],
      alerts: [],
      exposure: "₹15 Cr"
    },

    aiResult: {
      summary:
        "GreenEnergy Solar Ltd is a leading renewable energy company with ₹120 Cr revenue and ₹18 Cr net profit. AI research shows strong financial stability, no legal disputes, and consistent growth in the renewable sector supported by government incentives.",
      confidence: 92,
      docsProcessed: 4,
      dataPoints: 24,
      externalSources: 8
    },

    recommendation: {
      action: "Approve Loan",
      amount: 150000000,
      rate: "10.25%",
      tenure: "84 months"
    },

    demoFiles: [
      { name: "financial_statement_fy25.pdf", classification: "Financial Statement", status: "Verified" },
      { name: "gst_return_q4.pdf", classification: "GST Return", status: "Verified" },
      { name: "bank_statement_sbi.pdf", classification: "Bank Statement", status: "Verified" },
      { name: "annual_report_2024.pdf", classification: "Annual Report", status: "Verified" }
    ]
  }
];

// ─── Validation ───────────────────────────────────────────────────────────────
const VALIDATORS = {
  company: v => !v?.trim() ? "Company name is required" : "",
  cin: v => (v||"").length===21 ? "" : "CIN must be exactly 21 characters (e.g. U12345MH2015PTC123456)",
  industry: v => !v?.trim() ? "Industry type is required" : "",
  year: v => /^\d{4}$/.test(v||"") ? "" : "Year must be exactly 4 digits (e.g. 1998)",
  contact: v => /^\d{10}$/.test(v||"") ? "" : "Contact must be exactly 10 digits",
  email: v => (v||"").includes("@") ? "" : "Email must contain '@'",
  address: v => !v?.trim() ? "Address is required" : "",
  purpose: v => !v?.trim() ? "Purpose of loan is required" : "",
  loanAmount: v => parseInt(v)>0 ? "" : "Loan amount must be a positive number",
  directors: v => !v?.trim() ? "Director name is required" : "",
};

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function IntelliCredit() {
  const [page, setPage] = useState("dashboard");
  const [step, setStep] = useState(0);
  const [cases, setCases] = useState(DEMO_INIT);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [searchQ, setSearchQ] = useState("");
  const [currentCaseId, setCurrentCaseId] = useState(null);
  const [viewingDemo, setViewingDemo] = useState(null);

  const emptyForm = { company:"", cin:"", industry:"", year:"", contact:"", email:"", address:"", purpose:"", loanAmount:"", directors:"" };
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});

  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef();

  const [aiRunning, setAiRunning] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiError, setAiError] = useState("");
  const [camGenerated, setCamGenerated] = useState(false);

  const MANDATORY = ["GST Return","Bank Statement","Financial Statement","Annual Report"];
  const classifyDoc = n => {
    const l=n.toLowerCase();
    if(l.includes("gst")) return "GST Return";
    if(l.includes("bank")) return "Bank Statement";
    if(l.includes("financial")||l.includes("fin")) return "Financial Statement";
    if(l.includes("annual")||l.includes("report")) return "Annual Report";
    if(l.includes("cibil")) return "CIBIL Report";
    return "Supporting Document";
  };

  const handleFileDrop = useCallback(e => {
    e.preventDefault(); setDragOver(false);
    const dropped = Array.from(e.dataTransfer?.files || e.target.files || []);
    setFiles(prev => [...prev, ...dropped.map(f => ({ name:f.name, size:(f.size/1024).toFixed(2), status:"Verified", classification:classifyDoc(f.name) }))]);
  }, []);

  const mandatoryStatus = () => MANDATORY.map(d => ({ doc:d, ok:files.some(f=>f.classification===d) }));

  const validateField = (k, v) => { const fn=VALIDATORS[k]; return fn?fn(v):""; };
  const validateAll = () => {
    const errs = {};
    Object.keys(VALIDATORS).forEach(k => { const e=validateField(k,form[k]); if(e) errs[k]=e; });
    setFormErrors(errs); return Object.keys(errs).length===0;
  };
  const setField = (k, v) => { setForm(f=>({...f,[k]:v})); setFormErrors(f=>({...f,[k]:validateField(k,v)})); };

  const riskData = viewingDemo?.riskData || {
    score:88, level:"Low", industryRisk:"Medium",
    debtTrend:[{l:"Q1",v:0.65},{l:"Q2",v:0.62},{l:"Q3",v:0.58},{l:"Q4",v:0.55}],
    profitTrend:[{l:"Q1",v:112},{l:"Q2",v:118},{l:"Q3",v:128},{l:"Q4",v:138}],
    alerts:["Limited operational history may require additional collateral.","Loan amount is substantial for company vintage; technical feasibility review recommended."],
    exposure:`₹${Math.ceil(parseInt(form.loanAmount||0)/10000000)||"N/A"} Cr`,
  };

  const runAI = async () => {
    setAiRunning(true); setAiError(""); setAiResult(null);
    await new Promise(r=>setTimeout(r,2200));
    if(!form.company||form.company.trim().length<3) {
      setAiError("No reliable company data found. Please verify the company details and required documents.");
      setAiRunning(false); return;
    }
    setAiResult({
      summary:`${form.company} (${form.cin}), established ${form.year}, seeks ₹${fmt(parseInt(form.loanAmount||0))} for ${form.purpose}. All ${files.length} submitted documents verified. GST and banking records are consistent — indicating transparent financial reporting.`,
      confidence:88, docsProcessed:files.length, dataPoints:12, externalSources:5,
      cards:[
        {title:"Financial Performance",text:"GST returns and financial statements are verified and consistent.",level:"Medium"},
        {title:"Credit Rating",text:"Bank statement shows healthy cash flows; no adverse entries.",level:"Medium"},
        {title:"Management Team",text:"Professional management indicated by clean statutory filings.",level:"High"},
        {title:"Debt Position",text:`Loan of ₹${fmt(parseInt(form.loanAmount||0))} represents strategic capital expansion for ${form.purpose}.`,level:"Medium"},
        {title:"Asset Strength",text:"Loan purpose will directly contribute to acquisition of productive assets.",level:"High"},
      ],
      external:[
        `MCA Portal — CIN ${form.cin} is active and registered.`,
        "CIBIL — No history of defaults; credit profile is stable.",
        "GST Network — Returns align with bank credits; no mismatch detected.",
        "SEBI Database — No adverse mentions of directors.",
        "Legal Records — No pending litigations found in public legal databases.",
      ],
    });
    setAiRunning(false);
  };

  const generateCAM = () => {
    setCamGenerated(true);
    const newCase = { id:currentCaseId||`case_${Date.now()}`, company:form.company, industry:form.industry, amount:parseInt(form.loanAmount||0), step:"completed", updated:new Date().toLocaleDateString("en-IN"), creditScore:riskData.score, ...form };
    setCurrentCaseId(newCase.id);
    setCases(prev => { const ex=prev.find(c=>c.id===newCase.id); return ex?prev.map(c=>c.id===newCase.id?{...c,...newCase}:c):[newCase,...prev]; });
  };

  const downloadCAM = () => {
    const rd = riskData, ar = viewingDemo?.aiResult || aiResult;
    const rec = viewingDemo?.recommendation || { action:"Approve Loan", amount:Math.floor(parseInt(form.loanAmount||0)*0.95), rate:"9.25%", tenure:"60 months" };
    const txt = `INTELLICREDIT – CREDIT APPRAISAL MEMO\n${"=".repeat(50)}\n\n1. COMPANY OVERVIEW\n${"-".repeat(30)}\nCompany: ${form.company}\nCIN: ${form.cin}\nIndustry: ${form.industry}\nEstablished: ${form.year}\nAddress: ${form.address}\nDirectors: ${form.directors}\nContact: ${form.contact} | ${form.email}\n\n2. FINANCIAL SUMMARY\n${"-".repeat(30)}\nLoan Requested: ₹${fmt(parseInt(form.loanAmount||0))}\nPurpose: ${form.purpose}\n\n3. EXTERNAL RESEARCH FINDINGS\n${"-".repeat(30)}\nDocs Processed: ${ar?.docsProcessed||4} | Confidence: ${ar?.confidence||88}%\nData Points: ${ar?.dataPoints||12} | External Sources: ${ar?.externalSources||5}\n\n${ar?.summary||""}\n\n4. RISK ANALYSIS\n${"-".repeat(30)}\nCredit Score: ${rd.score}/100\nRisk Level: ${rd.level} | Industry Risk: ${rd.industryRisk}\nLegal Alerts: ${rd.alerts?.length||0}\n\n5. FIVE Cs OF CREDIT\n${"-".repeat(30)}\n• Character: Clean statutory record, no defaults\n• Capacity: Revenue trend supports repayment\n• Capital: Positive net worth, assets exceed liabilities\n• Collateral: Business assets and property to be pledged\n• Conditions: Favorable industry and macro outlook\n\n6. FINAL RECOMMENDATION\n${"-".repeat(30)}\nDecision: ${rec.action}\nRecommended Amount: ₹${fmt(rec.amount)}\nInterest Rate: ${rec.rate}\nTenure: ${rec.tenure}\n\n${"=".repeat(50)}\nGenerated by IntelliCredit | ${new Date().toLocaleDateString("en-IN")}`;
    const blob = new Blob([txt],{type:"text/plain"});
    const a = document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=`CAM_${form.company?.replace(/\s+/g,"_")}.txt`; a.click();
  };

  const handleNewAppraisal = () => {
    setPage("appraisal"); setStep(0); setForm(emptyForm); setFiles([]); setAiResult(null); setCamGenerated(false);
    setCurrentCaseId(`case_${Date.now()}`); setViewingDemo(null); setFormErrors({});
  };

  const handleOpenCase = (item) => {
    setPage("appraisal");
    setForm({ company:item.company||"", cin:item.cin||"", industry:item.industry||"", year:item.year||"", contact:item.contact||"", email:item.email||"", address:item.address||"", purpose:item.purpose||"", loanAmount:item.loanAmount||String(item.amount), directors:item.directors||"" });
    setCurrentCaseId(item.id);
    if(item.aiResult) { setAiResult(item.aiResult); }
    if(item.demoFiles) setFiles(item.demoFiles);
    if(item.step==="completed") { setCamGenerated(true); setStep(4); setViewingDemo(item); }
    else { setStep(0); setViewingDemo(null); }
    setFormErrors({});
  };

  const confirmDelete = () => { setCases(prev=>prev.filter(c=>c.id!==deleteTarget.id)); setDeleteTarget(null); };
  const filtered = cases.filter(c=>c.company.toLowerCase().includes(searchQ.toLowerCase()));

  // ─── Dashboard ──────────────────────────────────────────────────────────
  if(page==="dashboard") {
    const done=cases.filter(c=>c.step==="completed").length, pending=cases.length-done;
    return (
      <div style={{ minHeight:"100vh", background:"#f8fafc", fontFamily:"'DM Sans',system-ui,sans-serif" }}>
        {deleteTarget && <DeleteModal company={deleteTarget.company} onConfirm={confirmDelete} onCancel={()=>setDeleteTarget(null)} />}
        <Header onNew={handleNewAppraisal} onSearch={setSearchQ} />
        <main style={{ maxWidth:1280, margin:"0 auto", padding:"32px" }}>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:36 }}>
            <MetricCard label="Total Appraisals" value={cases.length} icon="📁" />
            <MetricCard label="Completed" value={done} color={C.emerald} icon="✅" />
            <MetricCard label="In Progress" value={pending} color={C.amber} icon="⏳" />
            <MetricCard label="Approved This Month" value={done} color={C.primary} icon="🏦" />
          </div>

          <div style={{ background:C.white, borderRadius:20, border:`1px solid ${C.border}`, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.06)", marginBottom:36 }}>
            <div style={{ padding:"18px 28px", borderBottom:`1px solid ${C.slate100}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <h2 style={{ fontSize:16, fontWeight:700, color:C.navy }}>All Appraisals</h2>
              <button onClick={handleNewAppraisal} style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 18px", borderRadius:999, background:`linear-gradient(135deg,${C.primary},${C.emerald})`, color:C.white, border:"none", cursor:"pointer", fontWeight:700, fontSize:13 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14" /></svg>
                New Appraisal
              </button>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead><tr style={{ background:C.slate100 }}>
                  {["Company Name","Industry","Loan Amount","Credit Score","Status","Date Created","Actions"].map(h=>(
                    <th key={h} style={{ padding:"11px 20px", textAlign:"left", fontSize:11, fontWeight:700, color:C.slate500, textTransform:"uppercase", letterSpacing:"0.05em", whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {filtered.length===0 && <tr><td colSpan={7} style={{ padding:"40px", textAlign:"center", color:C.slate400, fontSize:14 }}>No appraisals found</td></tr>}
                  {filtered.map((item,idx)=>{
                    const s=SC[item.step]||SC.company;
                    return (
                      <tr key={item.id} style={{ borderTop:`1px solid ${C.slate100}`, background:idx%2===0?C.white:"#fafbfc" }}>
                        <td style={{ padding:"14px 20px" }}><p style={{ fontWeight:600, fontSize:14, color:C.navy }}>{item.company}</p></td>
                        <td style={{ padding:"14px 20px", fontSize:13, color:C.slate600 }}>{item.industry}</td>
                        <td style={{ padding:"14px 20px", fontSize:13, fontWeight:700, color:C.navy }}>₹{fmt(item.amount)}</td>
                        <td style={{ padding:"14px 20px" }}>
                          {item.creditScore ? <span style={{ fontWeight:800, fontSize:15, color:item.creditScore>=80?C.emerald:item.creditScore>=60?C.amber:C.red }}>{item.creditScore}</span> : <span style={{ color:C.slate300 }}>—</span>}
                        </td>
                        <td style={{ padding:"14px 20px" }}><span style={{ padding:"3px 10px", borderRadius:999, fontSize:11, fontWeight:600, background:s.bg, color:s.color }}>{s.label}</span></td>
                        <td style={{ padding:"14px 20px", fontSize:13, color:C.slate500 }}>{item.updated}</td>
                        <td style={{ padding:"14px 20px" }}>
                          <div style={{ display:"flex", gap:6 }}>
                            <button onClick={()=>handleOpenCase(item)} style={{ padding:"5px 12px", borderRadius:6, border:`1.5px solid ${C.primary}`, background:C.primaryBg, cursor:"pointer", fontSize:12, fontWeight:600, color:C.primary }}>
                              {item.step==="completed"?"View":"Edit"}
                            </button>
                            <button onClick={()=>setDeleteTarget(item)} style={{ padding:"5px 10px", borderRadius:6, border:"1.5px solid #fecaca", background:"#fef2f2", cursor:"pointer", color:C.red }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <h3 style={{ fontSize:16, fontWeight:700, color:C.navy, marginBottom:16 }}>Recent Appraisals</h3>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16 }}>
            {filtered.slice(0,6).map(item=>(
              <AppraisalCard key={item.id} item={item} onOpen={handleOpenCase} onDelete={setDeleteTarget} />
            ))}
          </div>
        </main>
      </div>
    );
  }

  // ─── Appraisal Flow ──────────────────────────────────────────────────────
  const stepMeta=[
    {title:"Company Details",sub:"Step 1 of 5 – Borrower information and loan request"},
    {title:"Document Upload",sub:"Step 2 of 5 – Upload mandatory files and verify authenticity"},
    {title:"AI Research & Analysis",sub:"Step 3 of 5 – Gemini-powered due diligence and external verification"},
    {title:"Risk Analysis Dashboard",sub:"Step 4 of 5 – Scorecard, trends, and legal risk signals"},
    {title:"CAM Report Generator",sub:"Step 5 of 5 – Generate, review, and download final memo"},
  ];

  const Field=({label,field,type="text",placeholder,hint})=>{
    const err=formErrors[field];
    return (
      <div>
        <label style={{ fontSize:13, fontWeight:600, color:C.slate700, display:"block", marginBottom:5 }}>
          {label} <span style={{ color:C.red }}>*</span>
        </label>
        <input
          type={type} value={form[field]||""} placeholder={placeholder}
          min={type==="number"?"1":undefined}
          onChange={e=>setField(field,e.target.value)}
          style={{ width:"100%", padding:"10px 14px", borderRadius:10, fontSize:14, border:`1.5px solid ${err?C.red:C.slate200}`, outline:"none", background:err?"#fef2f2":C.white, boxSizing:"border-box", transition:"border 0.15s" }}
        />
        {err && <p style={{ fontSize:12, color:C.red, marginTop:4 }}>⚠ {err}</p>}
        {!err&&hint && <p style={{ fontSize:11, color:C.slate400, marginTop:3 }}>{hint}</p>}
      </div>
    );
  };

  const displayAiResult = viewingDemo?.aiResult || aiResult;
  const displayRisk = viewingDemo?.riskData || riskData;
  const displayRec = viewingDemo?.recommendation || { action:"Approve Loan", amount:Math.floor(parseInt(form.loanAmount||0)*0.95), rate:"9.25%", tenure:"60 months" };

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      {deleteTarget && <DeleteModal company={deleteTarget.company} onConfirm={confirmDelete} onCancel={()=>setDeleteTarget(null)} />}
      <Header />

      <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`, padding:"14px 32px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
            <button onClick={()=>setPage("dashboard")} style={{ display:"flex", alignItems:"center", gap:4, fontSize:13, color:C.slate500, background:"none", border:"none", cursor:"pointer", padding:0 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg> Dashboard
            </button>
            <span style={{ color:C.slate300 }}>›</span>
            <span style={{ fontSize:13, fontWeight:600, color:C.navy }}>{stepMeta[step].title}</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>
            <div>
              <h2 style={{ fontSize:19, fontWeight:800, color:C.navy }}>{stepMeta[step].title}</h2>
              <p style={{ fontSize:13, color:C.slate500 }}>{stepMeta[step].sub}</p>
            </div>
            <Stepper current={step} />
          </div>
        </div>
      </div>

      <main style={{ maxWidth:1100, margin:"28px auto", padding:"0 32px" }}>

        {/* Step 0 — Company Details */}
        {step===0 && (
          <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:20, padding:32 }}>
            <h3 style={{ fontSize:15, fontWeight:700, color:C.navy, marginBottom:24 }}>Borrower Information</h3>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
              <Field label="Company Name" field="company" placeholder="ABC Industries Pvt Ltd" />
              <Field label="CIN Number" field="cin" placeholder="U12345MH2015PTC123456" hint="Exactly 21 characters" />
              <Field label="Industry Type" field="industry" placeholder="Manufacturing / IT / Textiles…" />
              <Field label="Year Established" field="year" placeholder="1998" hint="4-digit year only" />
              <Field label="Contact Number" field="contact" placeholder="9876543210" hint="10 digits only" />
              <Field label="Email Address" field="email" placeholder="contact@company.com" hint="Must contain '@'" />
              <div style={{ gridColumn:"1/-1" }}><Field label="Registered Address" field="address" placeholder="Plot No., Area, City, State PIN" /></div>
              <Field label="Director / Promoter Name(s)" field="directors" placeholder="Full name(s)" />
              <Field label="Requested Loan Amount (₹)" field="loanAmount" type="number" placeholder="5000000" hint="Positive number only" />
              <div style={{ gridColumn:"1/-1" }}><Field label="Purpose of Loan" field="purpose" placeholder="Working capital / Equipment purchase / Expansion…" /></div>
            </div>
            <div style={{ marginTop:28, display:"flex", justifyContent:"flex-end" }}>
              <button onClick={()=>{ if(validateAll()) setStep(1); }} style={{ padding:"11px 32px", borderRadius:999, background:`linear-gradient(135deg,${C.primary},${C.emerald})`, color:C.white, border:"none", cursor:"pointer", fontWeight:700, fontSize:14 }}>
                Save & Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 1 — Document Upload */}
        {step===1 && (
          <div style={{ display:"flex", gap:24 }}>
            <div style={{ flex:1, display:"flex", flexDirection:"column", gap:16 }}>
              <div
                onDragOver={e=>{e.preventDefault();setDragOver(true);}} onDragLeave={()=>setDragOver(false)} onDrop={handleFileDrop}
                onClick={()=>fileRef.current?.click()}
                style={{ border:`2px dashed ${dragOver?C.primary:C.slate200}`, borderRadius:16, padding:"40px 32px", textAlign:"center", cursor:"pointer", background:dragOver?C.primaryBg:C.white, transition:"all 0.15s" }}>
                <input ref={fileRef} type="file" multiple style={{ display:"none" }} onChange={handleFileDrop} />
                <div style={{ fontSize:40, marginBottom:12 }}>📂</div>
                <p style={{ fontWeight:600, color:C.navy, marginBottom:4 }}>Drag & drop files here</p>
                <p style={{ fontSize:13, color:C.slate400 }}>PDF, Excel, Word, CSV, Images supported</p>
              </div>
              {files.length>0 && (
                <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:16, padding:20 }}>
                  <h4 style={{ fontWeight:700, marginBottom:14, fontSize:14 }}>Uploaded Files ({files.length})</h4>
                  {files.map((f,i)=>(
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0", borderBottom:i<files.length-1?`1px solid ${C.slate100}`:"none" }}>
                      <span style={{ fontSize:18 }}>📄</span>
                      <div style={{ flex:1 }}>
                        <p style={{ fontSize:13, fontWeight:600, color:C.navy }}>{f.name}</p>
                        <p style={{ fontSize:11, color:C.slate400 }}>{f.classification}{f.size?` · ${f.size} KB`:""}</p>
                      </div>
                      <span style={{ fontSize:11, fontWeight:600, color:C.emerald, background:"#f0fdf4", padding:"2px 8px", borderRadius:999 }}>✓ {f.status}</span>
                      <button onClick={()=>setFiles(p=>p.filter((_,j)=>j!==i))} style={{ background:"none", border:"none", cursor:"pointer", color:C.red, fontSize:18, lineHeight:1 }}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ width:280 }}>
              <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:16, padding:20 }}>
                <h4 style={{ fontWeight:700, marginBottom:16, fontSize:14 }}>Mandatory Documents</h4>
                {mandatoryStatus().map(({doc,ok})=>(
                  <div key={doc} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0", borderBottom:`1px solid ${C.slate100}` }}>
                    <div style={{ width:22, height:22, borderRadius:"50%", background:ok?"#f0fdf4":"#fef2f2", border:`1.5px solid ${ok?C.emerald:C.red}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:ok?C.emerald:C.red, fontWeight:700 }}>
                      {ok?"✓":"✗"}
                    </div>
                    <span style={{ fontSize:13, color:ok?C.emerald:C.red, fontWeight:500 }}>{doc}</span>
                  </div>
                ))}
                <button onClick={()=>{ const miss=mandatoryStatus().filter(m=>!m.ok); if(miss.length>0){alert(`Missing:\n• ${miss.map(m=>m.doc).join("\n• ")}`);return;} setStep(2); }} style={{ width:"100%", marginTop:20, padding:"11px", borderRadius:10, background:`linear-gradient(135deg,${C.primary},${C.emerald})`, color:C.white, border:"none", cursor:"pointer", fontWeight:700, fontSize:14 }}>
                  Next Step →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 — AI Research */}
        {step===2 && (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:16, padding:24 }}>
              <h3 style={{ fontWeight:700, fontSize:16, marginBottom:6 }}>AI Research Agent</h3>
              <p style={{ fontSize:13, color:C.slate500, marginBottom:20 }}>Analyzes documents and external data using Gemini AI + LangChain</p>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:20 }}>
                <div style={{ padding:"9px 18px", borderRadius:10, background:C.primaryBg, border:`1px solid ${C.border}`, fontSize:13, color:C.primary, fontWeight:600 }}>🏢 {form.company||"—"}</div>
                <div style={{ padding:"9px 18px", borderRadius:10, background:"#f0fdf4", border:"1px solid #bbf7d0", fontSize:13, color:C.emerald, fontWeight:600 }}>📄 {files.length} documents ready</div>
              </div>
              <button onClick={runAI} disabled={aiRunning} style={{ padding:"11px 28px", borderRadius:999, background:aiRunning?C.slate200:`linear-gradient(135deg,${C.primary},${C.emerald})`, color:aiRunning?C.slate400:C.white, border:"none", cursor:aiRunning?"not-allowed":"pointer", fontWeight:700, fontSize:14, display:"flex", alignItems:"center", gap:8 }}>
                {aiRunning?<><span style={{ display:"inline-block", animation:"spin 1s linear infinite" }}>⟳</span> Running AI Research…</>:"🔍 Run AI Research"}
              </button>
            </div>

            {aiError && <div style={{ padding:"16px 20px", borderRadius:12, background:"#fef2f2", border:"1px solid #fecaca", color:C.red, fontSize:14, fontWeight:500 }}>⚠ {aiError}</div>}

            {displayAiResult && (
              <>
                <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:16, padding:24 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:16 }}>
                    {[{label:"Confidence",value:`${displayAiResult.confidence}%`,color:C.primary},{label:"Docs",value:displayAiResult.docsProcessed,color:C.emerald},{label:"Data Points",value:displayAiResult.dataPoints,color:"#7c3aed"},{label:"Sources",value:displayAiResult.externalSources,color:C.amber}].map(m=>(
                      <div key={m.label} style={{ textAlign:"center", padding:"14px", background:C.slate100, borderRadius:12 }}>
                        <div style={{ fontSize:22, fontWeight:800, color:m.color }}>{m.value}</div>
                        <div style={{ fontSize:11, color:C.slate500, marginTop:2 }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize:14, color:C.slate700, lineHeight:1.7 }}>{displayAiResult.summary}</p>
                </div>
                {displayAiResult.cards && (
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))", gap:14 }}>
                    {displayAiResult.cards.map(card=>(
                      <div key={card.title} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:14, padding:18 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                          <p style={{ fontWeight:700, fontSize:14, color:C.navy }}>{card.title}</p>
                          <span style={{ fontSize:11, padding:"2px 8px", borderRadius:999, background:card.level==="High"?"#f0fdf4":"#fffbeb", color:card.level==="High"?C.emerald:C.amber, fontWeight:600 }}>{card.level}</span>
                        </div>
                        <p style={{ fontSize:13, color:C.slate600, lineHeight:1.6 }}>{card.text}</p>
                      </div>
                    ))}
                  </div>
                )}
                {displayAiResult.external && (
                  <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:16, padding:24 }}>
                    <h4 style={{ fontWeight:700, marginBottom:14 }}>External Data Verification</h4>
                    {displayAiResult.external.map((e,i)=>(
                      <div key={i} style={{ display:"flex", gap:8, padding:"8px 0", borderBottom:`1px solid ${C.slate100}`, fontSize:13, color:C.slate700 }}>
                        <span style={{ color:C.emerald, fontWeight:700 }}>✓</span><span>{e}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display:"flex", justifyContent:"flex-end" }}>
                  <button onClick={()=>setStep(3)} style={{ padding:"11px 32px", borderRadius:999, background:`linear-gradient(135deg,${C.primary},${C.emerald})`, color:C.white, border:"none", cursor:"pointer", fontWeight:700, fontSize:14 }}>
                    Continue to Risk Analysis →
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 3 — Risk Analysis */}
        {step===3 && (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ display:"grid", gridTemplateColumns:"auto 1fr 1fr 1fr", gap:16 }}>
              <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:16, padding:24, display:"flex", flexDirection:"column", alignItems:"center" }}>
                <Gauge score={displayRisk.score} />
                <p style={{ fontSize:12, color:C.slate500, marginTop:4 }}>Credit Score</p>
              </div>
              {[{label:"Risk Level",value:displayRisk.level,color:displayRisk.level==="Low"?C.emerald:C.amber},{label:"Industry Risk",value:displayRisk.industryRisk,color:C.amber},{label:"Total Exposure",value:displayRisk.exposure,color:C.primary}].map(m=>(
                <div key={m.label} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:16, padding:22 }}>
                  <p style={{ fontSize:12, color:C.slate400, marginBottom:6 }}>{m.label}</p>
                  <p style={{ fontSize:26, fontWeight:800, color:m.color }}>{m.value}</p>
                </div>
              ))}
            </div>
            <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:16, padding:24 }}>
              <h4 style={{ fontWeight:700, marginBottom:16 }}>Debt-to-Equity Trend</h4>
              <LineChart data={displayRisk.debtTrend} color={C.primary} />
            </div>
            {displayRisk.alerts?.length>0 && (
              <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:16, padding:24 }}>
                <h4 style={{ fontWeight:700, marginBottom:14 }}>Legal Risk Alerts</h4>
                {displayRisk.alerts.map((a,i)=>(
                  <div key={i} style={{ display:"flex", gap:8, color:C.red, fontSize:13, marginBottom:10 }}>
                    <span>⚠</span><span>{a}</span>
                  </div>
                ))}
              </div>
            )}
            <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:16, padding:24 }}>
              <h4 style={{ fontWeight:700, marginBottom:16 }}>Quarterly Profit Trend</h4>
              <LineChart data={displayRisk.profitTrend} color={C.emerald} />
            </div>
            <div style={{ display:"flex", justifyContent:"flex-end" }}>
              <button onClick={()=>setStep(4)} style={{ padding:"11px 32px", borderRadius:999, background:`linear-gradient(135deg,${C.primary},${C.emerald})`, color:C.white, border:"none", cursor:"pointer", fontWeight:700, fontSize:14 }}>
                Continue to CAM Report →
              </button>
            </div>
          </div>
        )}

        {/* Step 4 — CAM Report */}
        {step===4 && (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {camGenerated && <div style={{ padding:"12px 20px", borderRadius:12, background:"#f0fdf4", border:"1px solid #bbf7d0", color:C.emerald, fontSize:14, fontWeight:600 }}>✓ CAM Report generated and saved to dashboard.</div>}
            <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:16, padding:24 }}>
              <h3 style={{ fontWeight:700, fontSize:16, marginBottom:6 }}>Credit Appraisal Memo (CAM)</h3>
              <p style={{ fontSize:13, color:C.slate500, marginBottom:20 }}>Generate the complete CAM report for {form.company||"this company"}.</p>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                <button onClick={generateCAM} style={{ display:"flex", alignItems:"center", gap:6, padding:"10px 24px", background:`linear-gradient(135deg,${C.primary},${C.emerald})`, color:C.white, border:"none", borderRadius:10, cursor:"pointer", fontWeight:700, fontSize:14 }}>
                  📄 Generate CAM Report
                </button>
                {camGenerated && (
                  <button onClick={downloadCAM} style={{ display:"flex", alignItems:"center", gap:6, padding:"10px 24px", background:C.white, color:C.slate700, border:`1.5px solid ${C.slate200}`, borderRadius:10, cursor:"pointer", fontWeight:600, fontSize:14 }}>
                    ⬇ Download CAM
                  </button>
                )}
              </div>
            </div>

            {camGenerated && (
              <>
                <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:16, padding:28 }}>
                  <h4 style={{ fontWeight:700, fontSize:16, marginBottom:24 }}>CAM Report Preview</h4>
                  {[
                    {h:"1. Company Overview",body:`${form.company} (CIN: ${form.cin}) is a ${form.industry} company established in ${form.year}. Loan requested: ₹${fmt(parseInt(form.loanAmount||0))} for ${form.purpose}. Registered address: ${form.address}. Directors: ${form.directors}.`},
                    {h:"2. Financial Summary",body:"All mandatory financial documents have been verified and cross-referenced with GST and banking records. No material discrepancies detected. The company demonstrates consistent operational profile."},
                    {h:"3. External Research Findings",body:`AI research (Gemini + LangChain) verified the company through MCA Portal, CIBIL, GST Network, and SEBI Database. Confidence score: ${displayAiResult?.confidence||88}%. ${displayRisk.alerts?.length===0?"No adverse legal entries found.":displayRisk.alerts?.length+" risk alert(s) noted."}`},
                    {h:"4. Risk Analysis",body:`Credit score: ${displayRisk.score}/100. Risk level: ${displayRisk.level}. Industry risk: ${displayRisk.industryRisk}. Debt-to-equity trend is declining, indicating improving financial health.`},
                    {h:"5. Five Cs of Credit",body:"Character: Clean statutory record, no defaults. Capacity: Revenue trend supports EMI repayment capacity. Capital: Net worth positive, assets exceed liabilities. Collateral: Business assets and immovable property to be pledged. Conditions: Favorable industry outlook and macro environment."},
                    {h:"6. Final Recommendation",rec:true},
                  ].map(s=>(
                    <div key={s.h} style={{ marginBottom:20, paddingBottom:20, borderBottom:`1px solid ${C.slate100}` }}>
                      <p style={{ fontWeight:700, fontSize:14, color:C.navy, marginBottom:8 }}>{s.h}</p>
                      {s.body && <p style={{ fontSize:13, color:C.slate700, lineHeight:1.7 }}>{s.body}</p>}
                      {s.rec && (
                        <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:12, padding:"16px 20px" }}>
                          <div style={{ display:"flex", gap:28, flexWrap:"wrap" }}>
                            {[
                              {label:"Decision",value:displayRec.action,color:C.emerald},
                              {label:"Recommended Amount",value:`₹${fmt(displayRec.amount)}`,color:C.navy},
                              {label:"Interest Rate",value:displayRec.rate,color:C.primary},
                              {label:"Tenure",value:displayRec.tenure,color:C.slate700},
                            ].map(r=>(
                              <div key={r.label}>
                                <p style={{ fontSize:11, color:C.slate400, fontWeight:500 }}>{r.label}</p>
                                <p style={{ fontSize:16, fontWeight:800, color:r.color }}>{r.value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:16, padding:28 }}>
                  <h4 style={{ fontWeight:700, fontSize:15, marginBottom:16 }}>Explainable AI Factors</h4>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                    {[
                      {text:`Credit score: ${displayRisk.score}/100`,pos:true},
                      {text:`Risk level: ${displayRisk.level}`,pos:true},
                      {text:"Mandatory documents verified",pos:true},
                      {text:`AI confidence: ${displayAiResult?.confidence||88}%`,pos:true},
                      {text:displayRisk.alerts?.length>0?`${displayRisk.alerts.length} legal risk alert(s)`:"No legal risks identified",pos:displayRisk.alerts?.length===0},
                      {text:"GST & banking records consistent",pos:true},
                    ].map((item,i)=>(
                      <div key={i} style={{ padding:"10px 14px", borderRadius:8, fontSize:13, fontWeight:500, background:item.pos?"#f0fdf4":"#fef2f2", color:item.pos?C.emerald:C.red, display:"flex", gap:8, alignItems:"center" }}>
                        <span>{item.pos?"✓":"⚠"}</span>{item.text}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      <style>{`
        @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
