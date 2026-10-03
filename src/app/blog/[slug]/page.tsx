import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug, getAllPosts } from "@/lib/posts";
import { getMDXComponents } from "@/mdx-components";
import AuthorBlock from "@/components/blog/AuthorBlock";
import ShareLinks from "@/components/blog/ShareLinks";
import PostCard from "@/components/blog/PostCard";
import remarkGfm from "remark-gfm";

const SITE_URL = "https://sitecroftdev.vercel.app";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const components = getMDXComponents({});
  const allPosts = getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author || "Saad",
    },
    publisher: {
      "@type": "Organization",
      name: "Sitecroft",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-grid" />
        <div className="page-hero-inner">
          <Link href="/blog" className="post-back-link">
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
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All posts
          </Link>

          <div className="post-badge-row">
            <div className="page-badge">
              <div className="badge-dot" />
              {post.category}
            </div>
          </div>

          <h1>{post.title}</h1>
          {post.description && <p>{post.description}</p>}

          <div className="post-meta">
            <span>{formatDate(post.date)}</span>
            <span className="post-meta-dot" />
            <span>{post.readingTime}</span>
            <span className="post-meta-dot" />
            <span>{post.author}</span>
          </div>
        </div>
      </section>

      <article className="post-article">
        <div className="post-article-inner">
          {post.coverImage && (
            <div className="post-cover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.coverImage} alt={post.title} />
            </div>
          )}

          <div className="post-body">
            <MDXRemote
              source={post.content}
              components={components}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </div>

          {post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="post-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <ShareLinks url={`${SITE_URL}/blog/${post.slug}`} title={post.title} />

          <AuthorBlock
            author={post.author || "Saad"}
            role="Full-stack web developer at Sitecroft"
          />

          <div className="post-back-cta">
            <Link href="/blog" className="post-back-link post-back-link-cyan">
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
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to all posts
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="related-section">
          <div className="related-inner">
            <h2 className="related-title">More in {post.category}</h2>
            <div className="related-grid">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}