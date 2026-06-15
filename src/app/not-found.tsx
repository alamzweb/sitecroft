"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        minHeight: "80vh",
        background: "#060b14",
        padding: "120px 24px 80px",
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

      {/* Floating particles - only rendered client-side to avoid hydration mismatch */}
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
        {/* Animated 404 number */}
        <div
          className="relative mb-8"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "scale(1)" : "scale(0.8)",
            transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Glow behind number */}
          <div
            className="absolute inset-0 blur-3xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(6,182,212,0.2))",
              transform: "scale(1.5)",
              animation: "glowPulse 3s ease-in-out infinite",
            }}
          />

          <h1
            className="relative"
            style={{
              fontSize: "clamp(120px, 20vw, 200px)",
              fontWeight: 900,
              lineHeight: 1,
              background:
                "linear-gradient(135deg, #3b82f6, #06b6d4, #3b82f6)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradientShift 4s ease infinite",
              filter: "drop-shadow(0 0 60px rgba(59,130,246,0.2))",
            }}
          >
            404
          </h1>

          {/* Glitch lines */}
          <div
            className="absolute top-1/2 left-0 right-0 h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)",
              animation: "glitchScan 3s ease-in-out infinite",
              transform: "translateY(-50%)",
            }}
          />
        </div>

        {/* Decorative broken wire */}
        <div
          className="relative mb-8"
          style={{
            width: "120px",
            height: "2px",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.6s ease 0.3s",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "45%",
              height: "2px",
              background: "linear-gradient(90deg, transparent, #3b82f6)",
              borderRadius: "2px",
              animation: "wireFlicker 2s ease-in-out infinite",
            }}
          />
          <div
            className="absolute"
            style={{
              left: "50%",
              top: "-4px",
              width: "10px",
              height: "10px",
              border: "2px solid rgba(6,182,212,0.5)",
              borderRadius: "50%",
              transform: "translateX(-50%)",
              animation: "brokenBlink 1.5s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "45%",
              height: "2px",
              background: "linear-gradient(270deg, transparent, #3b82f6)",
              borderRadius: "2px",
              animation: "wireFlicker 2s ease-in-out 0.5s infinite",
            }}
          />
        </div>

        {/* Heading */}
        <h2
          className="mb-4"
          style={{
            fontSize: "clamp(22px, 4vw, 32px)",
            fontWeight: 700,
            color: "#e2e8f0",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease 0.4s",
          }}
        >
          Lost in the{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Digital Void
          </span>
        </h2>

        {/* Description */}
        <p
          className="mb-10 max-w-md mx-auto"
          style={{
            fontSize: "16px",
            lineHeight: 1.7,
            color: "#64748b",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease 0.5s",
          }}
        >
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

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
          0%, 100% { opacity: 0.4; transform: scale(1.5); }
          50% { opacity: 0.7; transform: scale(1.8); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes glitchScan {
          0%, 100% { opacity: 0; transform: translateY(-80px); }
          40% { opacity: 0; }
          50% { opacity: 0.6; transform: translateY(0); }
          60% { opacity: 0; }
          70% { opacity: 0.3; transform: translateY(40px); }
          80% { opacity: 0; }
        }
        @keyframes wireFlicker {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes brokenBlink {
          0%, 100% { opacity: 0.3; border-color: rgba(6,182,212,0.3); }
          50% { opacity: 1; border-color: rgba(6,182,212,0.8); }
        }
      `}</style>
    </section>
  );
}