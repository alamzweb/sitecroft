import type { Metadata } from "next";
import BlogClient from "./BlogClient";
import { getAllPosts, getAllCategories } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — Web Development for Small Businesses",
  description:
    "Practical guides, honest comparisons, and tutorials on WordPress, custom-coded websites, WooCommerce, and building a real online presence as a small business.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog — Web Development for Small Businesses",
    description:
      "Practical guides, honest comparisons, and tutorials on WordPress, custom-coded websites, WooCommerce, and building a real online presence as a small business.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-grid" />
        <div className="page-hero-inner">
          <div className="page-badge">
            <div className="badge-dot" />
            Blog
          </div>
          <h1>
            Notes on Building <span>for the Web</span>
          </h1>
          <p>
            Practical guides, honest comparisons, and tutorials on WordPress,
            custom-coded websites, WooCommerce, and building a real online
            presence as a small business.
          </p>
        </div>
      </section>

      <section className="blog-section">
        <div className="blog-inner">
          <BlogClient posts={posts} categories={categories} />
        </div>
      </section>
    </>
  );
}