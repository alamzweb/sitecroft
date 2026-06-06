import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ACCENT: Record<string, string> = { "card-blue":"#3b82f6","card-cyan":"#06b6d4","card-purple":"#8b5cf6","card-green":"#10b981","card-amber":"#f59e0b","card-indigo":"#6366f1","card-rose":"#f43f5e","card-teal":"#14b8a6","card-pink":"#ec4899" };
const CARD_BG: Record<string, string> = { "card-blue":"#0a1020","card-cyan":"#060b14","card-purple":"#0a1020","card-green":"#060b14","card-amber":"#0a1020","card-indigo":"#060b14","card-rose":"#0a1020","card-teal":"#060b14","card-pink":"#0a1020" };
const CARD_BORDER: Record<string, string> = { "card-blue":"rgba(59,130,246,0.15)","card-cyan":"rgba(6,182,212,0.15)","card-purple":"rgba(139,92,246,0.15)","card-green":"rgba(16,185,129,0.15)","card-amber":"rgba(245,158,11,0.15)","card-indigo":"rgba(99,102,241,0.15)","card-rose":"rgba(244,63,94,0.15)","card-teal":"rgba(20,184,166,0.15)","card-pink":"rgba(236,72,153,0.15)" };
const CARD_GRADIENT: Record<string, string> = { "card-blue":"linear-gradient(90deg,#3b82f6,#06b6d4)","card-cyan":"linear-gradient(90deg,#06b6d4,#0284c7)","card-purple":"linear-gradient(90deg,#8b5cf6,#6d28d9)","card-green":"linear-gradient(90deg,#10b981,#059669)","card-amber":"linear-gradient(90deg,#f59e0b,#d97706)","card-indigo":"linear-gradient(90deg,#6366f1,#4f46e5)","card-rose":"linear-gradient(90deg,#f43f5e,#e11d48)","card-teal":"linear-gradient(90deg,#14b8a6,#0d9488)","card-pink":"linear-gradient(90deg,#ec4899,#db2777)" };

export interface ServiceSection {
  id: string;
  num: string;
  title: string;
  color: string;
  priceFrom: string;
  priceAmount: string;
  pricePer: string;
  cta: string;
  includesTitle: string;
  paragraphs: string[];
  includes: [string, string][];
  reverse?: boolean;
  disclaimer?: string;
  amountStyle?: string;
  footerNote?: { label: string; text: string };
}

export default function ServiceDetail({ s }: { s: ServiceSection }) {
  const accent = ACCENT[s.color];
  return (
    <section className="svc-detail" id={s.id}>
      <div className={`svc-detail-inner ${s.reverse ? "reverse" : ""}`}>
        <div className="svc-detail-text">
          <div className="section-label">{s.num}</div>
          <h2>{s.title}</h2>
          {s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          <div className="price-tag">
            <span className="from">{s.priceFrom}</span>
            <span className="amount" style={s.amountStyle ? { fontSize: 22 } : undefined}>{s.priceAmount}</span>
            {s.pricePer && <span className="per">{s.pricePer}</span>}
          </div>
          {s.disclaimer && (
            <div className="disclaimer-box">
              <p dangerouslySetInnerHTML={{ __html: `<strong>Please note:</strong> ${s.disclaimer}` }} />
            </div>
          )}
          <Link className="cta-small" href="/contact">
            {s.cta} <ArrowRight size={16} />
          </Link>
        </div>
        <div className="svc-detail-visual" style={{ background: CARD_BG[s.color], border: `1px solid ${CARD_BORDER[s.color]}` }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: CARD_GRADIENT[s.color], borderRadius: "18px 18px 0 0" }} />
          <div className="includes-title">{s.includesTitle}</div>
          {s.includes.map(([t, d], i) => (
            <div key={i} className="include-item">
              <div className="include-check" style={{ background: `${accent}1F` }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <span><strong>{t}</strong>{d}</span>
            </div>
          ))}
          {s.footerNote && (
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${accent}1A` }}>
              <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.7 }}>
                <strong style={{ color: accent }}>{s.footerNote.label}</strong> {s.footerNote.text}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}