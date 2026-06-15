"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface ComingSoonProps {
  estimated?: string;
}

interface Particle {
  size: number;
  color: string;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

const particleData: Particle[] = [
  { size: 3, color: "rgba(59,130,246,0.3)", left: 12, top: 25, duration: 4.2, delay: 0.3 },
  { size: 4, color: "rgba(6,182,212,0.3)", left: 88, top: 15, duration: 5.1, delay: 0.8 },
  { size: 2, color: "rgba(59,130,246,0.3)", left: 35, top: 72, duration: 3.8, delay: 1.2 },
  { size: 3, color: "rgba(6,182,212,0.3)", left: 62, top: 40, duration: 4.5, delay: 0.1 },
  { size: 5, color: "rgba(59,130,246,0.3)", left: 8, top: 55, duration: 6.2, delay: 1.5 },
  { size: 3, color: "rgba(6,182,212,0.3)", left: 75, top: 85, duration: 3.5, delay: 0.6 },
  { size: 4, color: "rgba(59,130,246,0.3)", left: 45, top: 10, duration: 5.8, delay: 0.9 },
  { size: 2, color: "rgba(6,182,212,0.3)", left: 92, top: 60, duration: 4.0, delay: 1.1 },
  { size: 3, color: "rgba(59,130,246,0.3)", left: 20, top: 90, duration: 3.2, delay: 0.4 },
  { size: 4, color: "rgba(6,182,212,0.3)", left: 55, top: 30, duration: 5.5, delay: 1.7 },
  { size: 5, color: "rgba(59,130,246,0.3)", left: 30, top: 50, duration: 4.8, delay: 0.2 },
  { size: 2, color: "rgba(6,182,212,0.3)", left: 70, top: 75, duration: 6.0, delay: 1.3 },
  { size: 3, color: "rgba(59,130,246,0.3)", left: 15, top: 35, duration: 3.7, delay: 0.7 },
  { size: 4, color: "rgba(6,182,212,0.3)", left: 82, top: 20, duration: 4.3, delay: 1.0 },
  { size: 3, color: "rgba(59,130,246,0.3)", left: 50, top: 65, duration: 5.2, delay: 0.5 },
  { size: 2, color: "rgba(6,182,212,0.3)", left: 5, top: 80, duration: 3.9, delay: 1.8 },
  { size: 4, color: "rgba(59,130,246,0.3)", left: 40, top: 45, duration: 4.6, delay: 0.3 },
  { size: 3, color: "rgba(6,182,212,0.3)", left: 95, top: 55, duration: 5.7, delay: 1.4 },
  { size: 2, color: "rgba(59,130,246,0.3)", left: 25, top: 5, duration: 4.1, delay: 0.8 },
  { size: 5, color: "rgba(6,182,212,0.3)", left: 60, top: 92, duration: 3.4, delay: 1.6 },
];

export default function ComingSoon({ estimated }: ComingSoonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const availabilityText = estimated || "Coming Soon";

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        minHeight: "100vh",
        background: "#060b14",
        padding: "60px 24px",
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,179,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(59,130,246,0.08), transparent 70%)",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {mounted &&
          particleData.map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: p.color,
                left: `${p.left}%`,
                top: `${p.top}%`,
                animation: `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
              }}
            />
          ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        {/* Animated gear icon */}
        <div
          className="relative mb-6"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "scale(1)" : "scale(0.5)",
            transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <div
            className="absolute inset-0 blur-3xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(6,182,212,0.15))",
              transform: "scale(2)",
              animation: "glowPulse 3s ease-in-out infinite",
            }}
          />
          <div
            style={{
              width: "80px",
              height: "80px",
              animation: "gearSpin 8s linear infinite",
            }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#gearGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <defs>
                <linearGradient id="gearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </div>
        </div>

        {/* "Coming Soon" heading */}
        <h1
          className="mb-4"
          style={{
            fontSize: "clamp(36px, 8vw, 56px)",
            fontWeight: 800,
            lineHeight: 1.1,
            background: "linear-gradient(135deg, #3b82f6, #06b6d4, #3b82f6)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradientShift 4s ease infinite",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease 0.2s",
          }}
        >
          Coming Soon
        </h1>

        {/* Subtitle */}
        <p
          className="mb-6 max-w-md mx-auto"
          style={{
            fontSize: "16px",
            lineHeight: 1.7,
            color: "#64748b",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease 0.4s",
          }}
        >
          This page is under construction and will be available soon.
        </p>

        {/* Estimated availability */}
        <div
          className="mb-8"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease 0.5s",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 22px",
              borderRadius: "12px",
              background: "rgba(10,16,32,0.8)",
              border: "1px solid rgba(99,179,237,0.12)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span style={{ fontSize: "13px", color: "#94a3b8" }}>
              Estimated Time:{" "}
              <span
                style={{
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {availabilityText}
              </span>
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div
          className="flex flex-wrap gap-4 justify-center"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease 0.6s",
          }}
        >
          <Link href="/" className="btn-primary">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Go Home
          </Link>

          <Link href="/contact" className="btn-secondary">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Contact Us
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes particleFloat {
          0% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { opacity: 0.7; }
          100% { transform: translateY(-40px) translateX(15px); opacity: 0.2; }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; transform: scale(2); }
          50% { opacity: 0.7; transform: scale(2.3); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes gearSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}