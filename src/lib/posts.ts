import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostCategory =
  | "Comparison"
  | "Freelancing"
  | "AI & Automation"

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  category: PostCategory;
  tags?: string[];
  coverImage?: string;
  author?: string;
  featured?: boolean;
}

export interface Post extends PostFrontmatter {
  slug: string;
  readingTime: string;
  tags: string[];
}

export interface PostWithContent extends Post {
  content: string;
}

const DEFAULT_AUTHOR = "Saad";

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => /\.mdx?$/.test(f));

  const posts = files
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const fullPath = path.join(POSTS_DIR, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);
      const fm = data as PostFrontmatter;
      const rt = readingTime(content);

      return {
        slug,
        title: fm.title || "Untitled",
        description: fm.description || "",
        date: fm.date || new Date().toISOString().split("T")[0],
        category: fm.category || "Other",
        tags: fm.tags || [],
        coverImage: fm.coverImage,
        author: fm.author || DEFAULT_AUTHOR,
        featured: fm.featured || false,
        readingTime: rt.text.replace("read", "read").trim(),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return posts;
}

export function getPostBySlug(slug: string): PostWithContent | null {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const altPath = path.join(POSTS_DIR, `${slug}.md`);

  let filePath: string;
  if (fs.existsSync(fullPath)) filePath = fullPath;
  else if (fs.existsSync(altPath)) filePath = altPath;
  else return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  const rt = readingTime(content);

  return {
    slug,
    title: fm.title || "Untitled",
    description: fm.description || "",
    date: fm.date || new Date().toISOString().split("T")[0],
    category: fm.category || "Other",
    tags: fm.tags || [],
    coverImage: fm.coverImage,
    author: fm.author || DEFAULT_AUTHOR,
    featured: fm.featured || false,
    readingTime: rt.text.replace("read", "read").trim(),
    content,
  };
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getAllCategories(): PostCategory[] {
  const posts = getAllPosts();
  const cats = new Set<PostCategory>();
  posts.forEach((p) => cats.add(p.category));
  return Array.from(cats).sort();
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}