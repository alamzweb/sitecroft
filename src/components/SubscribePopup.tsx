"use client";

import { useEffect, useState } from "react";

interface SubscribePopupProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  alreadySubscribed?: boolean;
}

export default function SubscribePopup({ isOpen, onClose, message, alreadySubscribed }: SubscribePopupProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 400);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 400);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        transition: "opacity 0.4s ease",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(8px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "440px",
          background: "#0a1020",
          border: "1px solid rgba(99,179,237,0.15)",
          borderRadius: "16px",
          padding: "0",
          overflow: "hidden",
          transform: visible ? "scale(1) translateY(0)" : "scale(0.9) translateY(20px)",
          transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(6,182,212,0.1)",
        }}
      >
        {/* Progress bar at the top */}
        <div
          style={{
            width: "100%",
            height: "3px",
            background: "rgba(99,179,237,0.08)",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
              borderRadius: "0 2px 2px 0",
              animation: "progressBar 5s linear forwards",
              width: "0%",
            }}
          />
        </div>

        {/* Card content */}
        <div style={{ padding: "32px 28px 28px", textAlign: "center" }}>
          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              width: "32px",
              height: "32px",
              border: "1px solid rgba(99,179,237,0.15)",
              borderRadius: "8px",
              background: "rgba(10,16,32,0.6)",
              color: "#64748b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
              fontSize: "16px",
              lineHeight: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#e2e8f0";
              e.currentTarget.style.borderColor = "rgba(99,179,237,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#64748b";
              e.currentTarget.style.borderColor = "rgba(99,179,237,0.15)";
            }}
          >
            ✕
          </button>

          {/* Animated checkmark */}
          <div
            style={{
              width: "56px",
              height: "56px",
              margin: "0 auto 18px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(6,182,212,0.1))",
              border: "2px solid rgba(6,182,212,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "10px",
              lineHeight: 1.3,
            }}
          >
            {alreadySubscribed ? "Already Subscribed!" : "Thanks for subscribing!"}
          </h3>

          {/* Description */}
          <p
            style={{
              fontSize: "14px",
              color: "#64748b",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {message || "Keep an eye on your inbox for exclusive discounts and offers."}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes progressBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}