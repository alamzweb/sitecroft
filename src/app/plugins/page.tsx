"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import PluginCardGrid from "@/components/PluginCardGrid";
import PluginHorizontalCard from "@/components/PluginHorizontalCard";
import PluginModal, { type MediaItem } from "@/components/PluginModal";

const pluginsData = [
  {
    id: 1,
    title: "Custom Admin Dashboard",
    description: "A streamlined WordPress admin interface that consolidates essential metrics and controls into a single, intuitive dashboard for faster site management.",
    fullDescription: "This plugin transforms the default WordPress admin experience by creating a custom dashboard that aggregates all critical information in one place.\n\nKey Features:\n- Real-time performance metrics with visual charts\n- Quick access to recent posts, comments, and orders\n- Custom widgets for WooCommerce sales tracking\n- One-click backup and restore functionality\n- User-friendly interface with dark mode support\n\nTechnical Implementation:\nThe plugin uses WordPress hooks to intercept the admin_menu action and replaces the default dashboard with a custom React-powered interface.\n\nAvailable Filters:\n- cad_metric_widgets - Modify the available metric widgets\n- cad_quick_actions - Add custom quick action buttons",
    authors: "Saad",
    media: [
      { type: "image" as const, url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", alt: "Admin Dashboard Overview" },
      { type: "image" as const, url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", alt: "Metrics Widget" },
    ],
  },
  {
    id: 2,
    title: "Performance Optimizer Pro",
    description: "Advanced caching, minification, and database optimization toolkit designed to boost WordPress site speed and reduce server load.",
    fullDescription: "Performance Optimizer Pro is a comprehensive optimization suite that takes your WordPress site to the next level in terms of speed and efficiency.\n\nCore Functionality:\n- Intelligent page caching with automatic cache clearing\n- CSS/JS minification and lazy loading\n- Database cleanup and optimization routines\n- Image optimization with WebP conversion\n- CDN integration for static assets\n\nKey Hooks:\n- pop_cache_status - Modify cache status display\n- pop_optimization_rules - Add custom optimization rules",
    authors: "Saad + Gemini",
    media: [
      { type: "image" as const, url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", alt: "Performance Settings" },
      { type: "image" as const, url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", alt: "Cache Statistics" },
    ],
  },
  {
    id: 3,
    title: "SEO Schema Builder",
    description: "Automated schema markup generator for rich snippets, supporting articles, products, local business, and custom post types.",
    fullDescription: "The SEO Schema Builder automatically generates and injects structured data markup into your WordPress pages, helping search engines better understand your content.\n\nSupported Schema Types:\n- Article/Blog Posting\n- Product (WooCommerce integration)\n- Local Business\n- FAQ and How-to\n- Custom post type schemas\n\nFeatures:\n- Automatic schema detection based on content type\n- Manual override and customization options\n- Schema validation and error reporting\n- JSON-LD output following Google guidelines",
    authors: "Saad + Claude",
    media: [
      { type: "image" as const, url: "https://images.unsplash.com/photo-1432889821006-314940b9b1d0?w=800&q=80", alt: "Schema Configuration" },
      { type: "image" as const, url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80", alt: "Rich Snippet Preview" },
    ],
  },
  {
    id: 4,
    title: "Security Shield",
    description: "Comprehensive security monitoring and threat protection with real-time scanning and automated vulnerability patching.",
    fullDescription: "Security Shield provides enterprise-grade protection for WordPress sites with minimal configuration required.\n\nSecurity Features:\n- Real-time malware scanning and detection\n- Login attempt monitoring and blocking\n- File integrity monitoring\n- Firewall rules and IP blocking\n- Two-factor authentication integration\n- Security audit logging",
    authors: "Saad",
    media: [
      { type: "image" as const, url: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80", alt: "Security Dashboard" },
    ],
  },
  {
    id: 5,
    title: "Media Cloud Sync",
    description: "Automated media library synchronization with cloud storage services for backup, CDN delivery, and space optimization.",
    fullDescription: "Media Cloud Sync automatically synchronizes your WordPress media library with popular cloud storage providers.\n\nCore Features:\n- Seamless integration with AWS S3, Google Cloud, and DigitalOcean Spaces\n- Automatic CDN delivery for all media assets\n- Bulk migration tool for existing media\n- Smart compression with quality preservation\n- Lazy loading and responsive image generation",
    authors: "Saad + Claude",
    media: [
      { type: "image" as const, url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80", alt: "Cloud Sync Interface" },
      { type: "image" as const, url: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80", alt: "Storage Dashboard" },
    ],
  },
  {
    id: 6,
    title: "Smart Forms Builder",
    description: "Drag-and-drop form builder with conditional logic, payment integrations, and advanced analytics for lead generation.",
    fullDescription: "Smart Forms Builder is a powerful form creation tool that enables you to build complex forms without writing a single line of code.\n\nFeatures:\n- Drag-and-drop form builder\n- Conditional field logic\n- Stripe and PayPal payment integration\n- Real-time form analytics\n- Email automation workflows\n- GDPR-compliant data handling",
    authors: "Saad + Gemini",
    media: [
      { type: "image" as const, url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", alt: "Form Builder" },
      { type: "image" as const, url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", alt: "Analytics Dashboard" },
    ],
  },
];

type ViewMode = "grid" | "list";

export default function PluginsPage() {
  const [selectedPlugin, setSelectedPlugin] = useState<(typeof pluginsData)[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const handleCardClick = (plugin: (typeof pluginsData)[0]) => {
    setSelectedPlugin(plugin);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPlugin(null);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.animationPlayState = "running";
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".svc-card, .plugin-horizontal-card");
    elements.forEach((el) => {
      (el as HTMLElement).style.animationPlayState = "paused";
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [viewMode]);

  return (
    <>
      {/* Page Header */}
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-grid" />
        <div className="page-hero-inner">
          <div className="page-badge">
            <div className="badge-dot" />
            WordPress
          </div>
          <h1>
            WordPress <span>Plugins</span>
          </h1>
          <p>
            Custom-built extensions and tools engineered to optimize functionality, performance, and user experience.
          </p>
        </div>
      </section>

      {/* Plugins Section */}
      <section className="relative py-20 px-6" style={{ background: "#060b14" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="section-label mb-3">Plugins</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Custom WordPress Solutions</h2>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl" style={{ background: "rgba(10,16,32,0.8)", border: "1px solid rgba(99,179,237,0.12)" }}>
              <button onClick={() => setViewMode("grid")} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200" style={viewMode === "grid" ? { background: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.15))", border: "1px solid rgba(6,182,212,0.25)", color: "#fff" } : { background: "transparent", color: "#64748b" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                Grid
              </button>
              <button onClick={() => setViewMode("list")} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200" style={viewMode === "list" ? { background: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.15))", border: "1px solid rgba(6,182,212,0.25)", color: "#fff" } : { background: "transparent", color: "#64748b" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                List
              </button>
            </div>
          </div>

          <p className="text-sm text-slate-500 mb-10 max-w-xl">
            Each plugin is crafted with clean code, optimized performance, and seamless integration with WordPress core.
          </p>

          {/* Grid View */}
          <div className="cards-grid" style={{ display: viewMode === "grid" ? "grid" : "none" }}>
            {pluginsData.map((plugin, i) => (
              <PluginCardGrid key={plugin.id} index={i} title={plugin.title} description={plugin.description} authors={plugin.authors} media={plugin.media} onClick={() => handleCardClick(plugin)} />
            ))}
          </div>

          {/* List View */}
          <div className="list-view-container" style={{ display: viewMode === "list" ? "flex" : "none", flexDirection: "column", gap: "12px" }}>
            {pluginsData.map((plugin, i) => (
              <PluginHorizontalCard key={plugin.id} index={i} title={plugin.title} description={plugin.description} authors={plugin.authors} media={plugin.media} onClick={() => handleCardClick(plugin)} />
            ))}
          </div>

        </div>
      </section>

      {/* Plugin Modal */}
      <AnimatePresence>
        {selectedPlugin && (
          <PluginModal isOpen={modalOpen} onClose={handleCloseModal} title={selectedPlugin.title} description={selectedPlugin.fullDescription} authors={selectedPlugin.authors} media={selectedPlugin.media as MediaItem[]} />
        )}
      </AnimatePresence>
    </>
  );
}