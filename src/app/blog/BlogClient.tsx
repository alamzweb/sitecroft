"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PostCard from "@/components/blog/PostCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import type { Post, PostCategory } from "@/lib/posts";

interface BlogClientProps {
  posts: Post[];
  categories: PostCategory[];
}

export default function BlogClient({ posts, categories }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState<PostCategory | "All">(
    "All"
  );

  const filtered = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <>
      <CategoryFilter
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
        counts={{
          All: posts.length,
          ...categories.reduce<Record<string, number>>((acc, c) => {
            acc[c] = posts.filter((p) => p.category === c).length;
            return acc;
          }, {}),
        }}
      />

      {filtered.length === 0 ? (
        <div
          className="rounded-2xl p-12 text-center"
          style={{
            background: "rgba(10,16,32,0.7)",
            border: "1px solid rgba(99,179,237,0.1)",
          }}
        >
          <p className="text-slate-400 text-sm">
            No posts in this category yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((post, i) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  duration: 0.35,
                  delay: i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}