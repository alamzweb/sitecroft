'use client';

import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

export interface ServiceCardData {
  title: string;
  description: string;
  price: string;
  priceNote?: string;
  icon: ReactNode;
  colorClass: string;
  accentColor: string;
}

interface ServiceCardProps {
  service: ServiceCardData;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <div
      className={`svc-card ${service.colorClass}`}
      style={{
        animationDelay: `${0.1 + index * 0.1}s`,
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, ${service.accentColor}, transparent)`,
        }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-[18px]"
        style={{ background: `${service.accentColor}1A` }}
      >
        {service.icon}
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-white mb-2">{service.title}</h3>

      {/* Description */}
      <p className="text-sm text-text-muted leading-relaxed mb-4">{service.description}</p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto">
        <div className="text-sm text-slate-400">
          <span className="text-lg font-bold text-white">{service.price}</span>
          {service.priceNote && (
            <small className="text-[11px] text-text-muted ml-0.5">{service.priceNote}</small>
          )}
        </div>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 group-hover/svc:bg-brand-cyan/15">
          <ArrowRight size={16} className="text-brand-cyan" strokeWidth={2.5} />
        </div>
      </div>

      <style jsx>{`
        .svc-card {
          background: #0a1020;
          border: 1px solid rgba(99, 179, 237, 0.1);
          border-radius: 16px;
          padding: 28px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
          opacity: 0;
          animation: fadeUp 0.6s ease both;
        }
        .svc-card:hover {
          transform: translateY(-5px);
        }
        .svc-card:hover .absolute {
          opacity: 1;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}