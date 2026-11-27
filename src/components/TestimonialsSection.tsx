
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Quote,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { testimonials } from "@/data/testimonials";

const PLACEHOLDER = "/testimonials/placeholder.png";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hide the section when there are no testimonials.
  if (testimonials.length === 0) return null;

  const testimonial = testimonials[currentIndex];

  // Automatically move to the next testimonial every 6 seconds.
  useEffect(() => {
    if (testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const previousTestimonial = () => {
    setCurrentIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const nextTestimonial = () => {
    setCurrentIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Centered heading with top-right link */}
        <div className="relative mb-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm text-[#06b6d4]">
              Client Feedback
            </span>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What clients say about{" "}
              <span className="text-[#06b6d4]">Sitecroft</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              Real feedback from people who have worked with Sitecroft.
            </p>
          </div>

          <Link
            href="/testimonials"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#06b6d4] transition hover:text-cyan-200 sm:absolute sm:right-0 sm:top-2 sm:mt-0"
          >
            View all testimonials
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Compact centered slideshow */}
        <div className="mx-auto flex max-w-[520px] items-center justify-center gap-2 sm:gap-3">
          {/* Previous arrow */}
          <button
            type="button"
            onClick={previousTestimonial}
            aria-label="Previous testimonial"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-[#06b6d4]/50 hover:bg-white/5 sm:h-10 sm:w-10"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Testimonial card */}
          <article
            key={currentIndex}
            className="mx-auto flex w-full max-w-[420px] min-w-0 flex-col rounded-2xl border border-white/10 bg-[#0a1020] p-6 transition hover:border-[#06b6d4]/30"
          >
            <div className="mb-5 flex items-center justify-between">
              <div
                className="flex gap-1"
                aria-label={`${testimonial.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < testimonial.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-600"
                    }
                  />
                ))}
              </div>

              <Quote className="text-[#06b6d4]/40" size={25} />
            </div>

            <p className="text-sm leading-7 text-gray-300">
              “{testimonial.feedback}”
            </p>

            <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5">
                <Image
                  src={testimonial.photo || PLACEHOLDER}
                  alt={`${testimonial.name}'s profile`}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {testimonial.name}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {testimonial.project}
                </p>
              </div>
            </div>
          </article>

          {/* Next arrow */}
          <button
            type="button"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-[#06b6d4]/50 hover:bg-white/5 sm:h-10 sm:w-10"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Share feedback button */}
        <div className="mt-10 text-center">
          <Link
            href="/feedback"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#06b6d4]/40 hover:bg-cyan-400/5"
          >
            Share your feedback
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
