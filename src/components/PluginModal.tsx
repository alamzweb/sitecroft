"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export interface MediaItem {
  type: "image" | "video";
  url: string;
  alt?: string;
}

export interface PluginModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  authors: string;
  media: MediaItem[];
}

export default function PluginModal({
  isOpen,
  onClose,
  title,
  description,
  authors,
  media,
}: PluginModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const currentMedia = media[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center p-4 md:p-6"
      style={{
        background: "rgba(6, 11, 20, 0.85)",
        backdropFilter: "blur(12px)",
        zIndex: 1100,
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="plugin-modal-title"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="relative w-full max-w-3xl rounded-2xl flex flex-col"
        style={{
          background: "#0a1020",
          border: "1px solid rgba(99, 179, 237, 0.15)",
          maxHeight: "calc(100vh - 100px)",
        }}
        onClick={(e) => e.stopPropagation()}
        variants={modalVariants}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Close Button - positioned at top right with high z-index to stay visible above header */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-white/10 hover:scale-105"
          aria-label="Close modal"
          style={{
            background: "rgba(10, 16, 32, 0.9)",
            border: "1px solid rgba(99, 179, 237, 0.2)",
            zIndex: 20,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 md:p-8" style={{ scrollbarWidth: "thin" }}>
          {/* Media Gallery */}
          <div className="relative mb-6">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-56 md:h-72 lg:h-80 rounded-xl overflow-hidden flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(6,182,212,0.05))",
                border: "1px solid rgba(99, 179, 237, 0.1)",
              }}
            >
              {currentMedia ? (
                currentMedia.type === "video" ? (
                  <video
                    src={currentMedia.url}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    aria-label={currentMedia.alt}
                  />
                ) : (
                  <img
                    src={currentMedia.url}
                    alt={currentMedia.alt || `${title} screenshot ${currentIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <div className="text-center">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(99,179,237,0.4)"
                    strokeWidth="1.5"
                    className="mx-auto mb-3"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                  <span className="text-sm text-slate-500">Plugin Preview</span>
                </div>
              )}
            </motion.div>

            {/* Navigation Arrows */}
            {media.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-white/10 hover:scale-110"
                  aria-label="Previous media"
                  style={{
                    background: "rgba(10, 16, 32, 0.9)",
                    border: "1px solid rgba(99, 179, 237, 0.25)",
                    zIndex: 5,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-white/10 hover:scale-110"
                  aria-label="Next media"
                  style={{
                    background: "rgba(10, 16, 32, 0.9)",
                    border: "1px solid rgba(99, 179, 237, 0.25)",
                    zIndex: 5,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}

            {/* Media Indicator Dots */}
            {media.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {media.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className="h-2 rounded-full transition-all duration-200"
                    style={{
                      width: index === currentIndex ? "20px" : "8px",
                      background: index === currentIndex ? "#06b6d4" : "rgba(99, 179, 237, 0.3)",
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Plugin Title */}
          <h2 id="plugin-modal-title" className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 pr-12">
            {title}
          </h2>

          {/* Full Description */}
          <div className="text-sm md:text-base text-slate-400 leading-relaxed mb-6 whitespace-pre-line">
            {description}
          </div>

          {/* Authors */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-brand-cyan">Authors:</span>
            <span className="text-sm text-slate-300">{authors}</span>
          </div>

          {/* Conditional Download Button Placeholder */}
          {/*
          <div className="flex justify-end mt-6">
            <a
              href="#"
              download
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-blue to-brand-cyan text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:opacity-90"
            >
              Download Plugin
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="M7 10l5 5 5-5" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>
          */}
        </div>
      </motion.div>
    </motion.div>
  );
}