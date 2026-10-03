"use client";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    // Particle canvas
    const canvas = document.getElementById("particles") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particlesArray: {
      x: number; y: number; directionX: number; directionY: number;
      size: number; color: string;
      draw(): void; update(): void;
    }[] = [];

    function setCanvasSize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    setCanvasSize();
    window.addEventListener("resize", () => { setCanvasSize(); init(); });

    class Particle {
      x: number; y: number; directionX: number; directionY: number;
      size: number; color: string;
      constructor(x: number, y: number, dX: number, dY: number, size: number, color: string) {
        this.x = x; this.y = y; this.directionX = dX; this.directionY = dY;
        this.size = size; this.color = color;
      }
      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx!.fillStyle = this.color;
        ctx!.fill();
      }
      update() {
        if (this.x > canvas!.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas!.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function init() {
      particlesArray = [];
      const n = (canvas!.width * canvas!.height) / 9000;
      for (let i = 0; i < n * 0.6; i++) {
        const size = Math.random() * 2 + 0.5;
        const x = Math.random() * (canvas!.width - size * 2) + size * 2;
        const y = Math.random() * (canvas!.height - size * 2) + size * 2;
        const dX = Math.random() * 0.4 - 0.2;
        const dY = Math.random() * 0.4 - 0.2;
        particlesArray.push(new Particle(x, y, dX, dY, size, "rgba(99,179,237,0.15)"));
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (let i = 0; i < particlesArray.length; i++) particlesArray[i].update();
      requestAnimationFrame(animate);
    }
    init();
    animate();

    // IntersectionObserver for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.animationPlayState = "running";
        }
      });
    }, { threshold: 0.1 });
    const animEls = document.querySelectorAll(".service-card, .stat-item, .why-item, .process-step");
    animEls.forEach((el) => {
      (el as HTMLElement).style.animationPlayState = "paused";
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* HERO */}
      <header className="hero">
        <canvas id="particles" />
        <div className="hero-glow" />
        <div className="hero-grid" />

        <div className="hero-content">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            <span>Available for New Projects</span>
          </div>
          <h1 className="hero-title">High-Performance Web Solutions & <span className="gradient">Advanced WordPress Development</span></h1>
          <p className="hero-sub">Built Fast. Built Right. Built to Last. — Custom-coded apps and powerful WordPress sites tailored to hit your exact business goals.</p>
          <div className="hero-btns">
            <a href="/contact" className="btn-primary">
              Let's Talk Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </a>
            <a href="#services" className="btn-secondary">Explore Services</a>
          </div>
        </div>

        <div className="hero-3d">
          <div className="card-3d">
            <div className="card-3d-title">Services Available</div>
            <div className="card-3d-item"><div className="card-3d-dot" style={{ background: "#3b82f6" }} /><span>WordPress Site</span></div>
            <div className="card-3d-item"><div className="card-3d-dot" style={{ background: "#06b6d4" }} /><span>Custom Code Website</span></div>
            <div className="card-3d-item"><div className="card-3d-dot" style={{ background: "#8b5cf6" }} /><span>WooCommerce Store</span></div>
            <div className="card-3d-item"><div className="card-3d-dot" style={{ background: "#10b981" }} /><span>WordPress Support & Tasks</span></div>
            <div className="card-3d-item"><div className="card-3d-dot" style={{ background: "#f59e0b" }} /><span>Landing Page</span></div>
            <div className="card-3d-item"><div className="card-3d-dot" style={{ background: "#6366f1" }} /><span>Custom Feature Edits</span></div>
            <div className="card-3d-item"><div className="card-3d-dot" style={{ background: "#f43f5e" }} /><span>Bug & Error Fixing</span></div>
            <div className="card-3d-item"><div className="card-3d-dot" style={{ background: "#14b8a6" }} /><span>Website Maintenance</span></div>
            <div className="card-3d-item"><div className="card-3d-dot" style={{ background: "#ec4899" }} /><span>Domain & Hosting Setup</span></div>
            <div className="card-3d-bar"><div className="card-3d-bar-fill" /></div>
            <div className="card-3d-divider" />
            <div className="card-3d-status"><div className="card-3d-status-dot" />Available for projects</div>
          </div>
        </div>

        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-dot"><div className="scroll-inner" /></div>
        </div>
      </header>

      {/* STATS */}
      <section className="stats">
        <div className="stat-item"><div className="stat-num">100%</div><div className="stat-label">Client Satisfaction</div></div>
        <div className="stat-item"><div className="stat-num">24/7</div><div className="stat-label">System Support</div></div>
        <div className="stat-item"><div className="stat-num">30+</div><div className="stat-label">Projects Completed</div></div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services">
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="section-label">Expertise</div>
          <h2 className="section-title">Web Services Tailored For You</h2>
          <p className="section-sub">From blazing-fast custom-coded apps to powerful WordPress sites — every service delivered with care and a focus on results.</p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg></div>
              <h3>Standard WordPress Site</h3>
              <p>Professional websites built using optimized pre-made templates — fast to launch, fully responsive, and easy to manage.</p>
              <div className="service-tag">From $150</div>
            </div>
            <div className="service-card">
              <div className="service-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg></div>
              <h3>Custom Code Website</h3>
              <p>High-performance, modern hand-coded websites (HTML, React, Next.js, Vite) deployed on Vercel for ultimate page speeds and clean SEO.</p>
              <div className="service-tag">From $300</div>
            </div>
            <div className="service-card">
              <div className="service-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg></div>
              <h3>WooCommerce Store</h3>
              <p>Full e-commerce infrastructure setup complete with secure checkout gateways, product variations, and order management.</p>
              <div className="service-tag">From $250</div>
            </div>
            <div className="service-card">
              <div className="service-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg></div>
              <h3>WordPress Support & Tasks</h3>
              <p>On-demand plugin setups, page additions, blog configurations, or any other WordPress task — handled quickly and professionally.</p>
              <div className="service-tag">From $15</div>
            </div>
            <div className="service-card">
              <div className="service-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg></div>
              <h3>Landing Page</h3>
              <p>A focused, conversion-driven landing page for your product, service, or campaign — built in WordPress or as custom code.</p>
              <div className="service-tag">From $60</div>
            </div>
            <div className="service-card">
              <div className="service-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg></div>
              <h3>Custom Feature / Page Edits</h3>
              <p>Modifications, new pages, layout changes, or feature expansions for existing hand-coded sites. Quoted based on scope.</p>
              <div className="service-tag">Based on work</div>
            </div>
            <div className="service-card">
              <div className="service-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></div>
              <h3>Bug & Error Fixing</h3>
              <p>Fast diagnostic repairs targeting fatal server codes, white screens, plugin conflicts, and active runtime failures.</p>
              <div className="service-tag">From $25</div>
            </div>
            <div className="service-card">
              <div className="service-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg></div>
              <h3>Website Maintenance</h3>
              <p>Ongoing background protection. Keeping plugins safe, environments backed up, and your site error-free every month.</p>
              <div className="service-tag">From $25/mo</div>
            </div>
            <div className="service-card">
              <div className="service-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg></div>
              <h3>Domain & Hosting Setup</h3>
              <p>Full done-for-you setup — I buy, configure, and launch your hosting and domain so you're ready to go without the tech headache.</p>
              <div className="service-tag">From $25</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="why">
        <div className="why-inner">
          <div>
            <div className="section-label">Philosophy</div>
            <h2 className="section-title">Coded For Speed, Styled For Impact</h2>
            <ul className="why-list">
              <li className="why-item">
                <div className="why-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg></div>
                <div><h4>Blazing Optimization</h4><p>No bloated, heavy template builders dragging down your search results. We value lightweight delivery and performance structures.</p></div>
              </li>
              <li className="why-item">
                <div className="why-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="3" x2="9" y2="21" /></svg></div>
                <div><h4>Bespoke Layout Control</h4><p>Every dynamic margin, interactive component, and text element crafted exactly to match your precise requirements.</p></div>
              </li>
              <li className="why-item">
                <div className="why-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg></div>
                <div><h4>Scalable Engineering</h4><p>Seamless code structures ensuring your digital infrastructure scales beautifully alongside your growing business.</p></div>
              </li>
            </ul>
          </div>
          <div className="why-visual">
            <div className="why-orb">
              <div className="why-orb-inner">
                <div className="why-center"><div className="num">100%</div><span>Core Vitals</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process">
        <div className="process-inner">
          <div className="section-label">Workflow</div>
          <h2 className="section-title">The Path to Performance</h2>
          <div className="process-steps">
            <div className="process-step"><div className="step-num">01</div><h4>Discovery</h4><p>We break down system scopes, operational goals, asset requirements, and technical stack options together.</p></div>
            <div className="process-step"><div className="step-num">02</div><h4>Development</h4><p>Writing organized CSS styles, clean HTML elements, and secure theme logics natively without bloatware.</p></div>
            <div className="process-step"><div className="step-num">03</div><h4>Optimization</h4><p>Compressing images, testing cache performance, and ensuring responsive structures scale across all screens.</p></div>
            <div className="process-step"><div className="step-num">04</div><h4>Launch</h4><p>Deploying production builds cleanly to live hosting environments or Vercel servers with absolute stability.</p></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to Build Something <span>Extraordinary?</span></h2>
        <p>Let's map out your project and get it moving. Free consultation, no commitment required.</p>
        <div className="cta-btns">
          <a href="/contact" className="btn-primary">Get Your Free Quote</a>
          <a href="/services" className="btn-secondary">View All Services</a>
        </div>
        <div className="cta-note">Average turnaround: 2–5 days based on project complexity.</div>
      </section>
    </>
  );
}