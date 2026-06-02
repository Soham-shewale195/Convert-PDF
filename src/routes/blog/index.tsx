import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Calendar, Search, ArrowRight, BookOpen, User, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import { Footer } from "@/components/Sections";
import { ALL_BLOG_POSTS } from "@/components/BlogLayout";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "PDF & Image Tips Blog — Convert PDF" },
      {
        name: "description",
        content:
          "Expert guides on PDF conversion, image formats, compression, privacy and productivity. Learn how to work smarter with free browser-based tools.",
      },
      { name: "keywords", content: "pdf blog, pdf tutorials, image format guide, pdf tips, compress pdf, convert pdf, pdf tools guide" },
      { property: "og:title", content: "PDF & Image Tips Blog — Convert PDF" },
      {
        property: "og:description",
        content: "Expert guides on PDF tools, image formats, and document productivity. All free, browser-based.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://converttpdf.com/blog" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "PDF & Image Tips Blog — Convert PDF" },
      {
        name: "twitter:description",
        content: "Expert guides on PDF tools, image formats, and document productivity.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Convert PDF Blog",
          description:
            "Expert guides on PDF conversion, image formats, compression, privacy and productivity.",
          url: "https://converttpdf.com/blog",
          publisher: {
            "@type": "Organization",
            name: "Convert PDF",
            url: "https://converttpdf.com",
          },
          blogPost: ALL_BLOG_POSTS.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            description: p.description,
            url: `https://converttpdf.com/blog/${p.slug}`,
            datePublished: p.publishedDate,
            author: { "@type": "Organization", name: "ConvertPDF Team" },
          })),
        }),
      },
    ],
  }),
  component: BlogIndex,
});

const CATEGORIES = ["All", "PDF Tools", "Image Tools", "Privacy & Security"];

function BlogIndex() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = ALL_BLOG_POSTS.filter((p) => {
    const matchesSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featured = ALL_BLOG_POSTS[ALL_BLOG_POSTS.length - 1];
  const rest = filtered.filter((p) => p.slug !== featured.slug || activeCategory !== "All" || search !== "");

  return (
    <div className="min-h-screen flex flex-col relative z-0">
      <Background />
      <Navbar />

      <main className="flex-1 px-4 sm:px-6 pt-24 pb-16 sm:pt-32 sm:pb-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="inline-block px-3 py-1 rounded-full glass text-xs font-medium text-primary mb-4">
              Resources & Guides
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              PDF & Image{" "}
              <span className="gradient-text">Tips & Guides</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Practical tutorials on PDF conversion, image formats, compression, and privacy. Written by the ConvertPDF Team.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative max-w-xl mx-auto mb-8"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              id="blog-search"
              type="search"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full glass rounded-xl pl-12 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground bg-transparent outline-none focus:ring-1 focus:ring-primary/50 transition"
            />
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === cat
                    ? "btn-gradient text-white"
                    : "glass text-muted-foreground hover:text-foreground hover:bg-white/10"
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Featured Article (only when no filter active) */}
          {activeCategory === "All" && search === "" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="text-sm font-semibold text-white/60 uppercase tracking-wider">Featured</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              <Link
                to={`/blog/${featured.slug}` as any}
                className="group grid lg:grid-cols-2 glass rounded-2xl sm:rounded-3xl overflow-hidden hover:bg-white/[0.09] transition"
              >
                <div
                  className={`h-52 lg:h-auto bg-gradient-to-br ${featured.featuredImageGradient} flex items-center justify-center text-7xl sm:text-8xl relative overflow-hidden`}
                >
                  <div className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                      backgroundSize: "28px 28px"
                    }}
                  />
                  <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
                  {featured.featuredImageEmoji}
                </div>
                <div className="p-7 sm:p-10 flex flex-col justify-center">
                  <span className="text-xs font-medium text-primary mb-3">{featured.category}</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-primary transition leading-snug">
                    {featured.title}
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base mb-6 leading-relaxed">
                    {featured.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(featured.publishedDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      ConvertPDF Team
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      {featured.readTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                    Read article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Blog Grid */}
          <div>
            {activeCategory === "All" && search === "" && (
              <div className="flex items-center gap-2 mb-5">
                <span className="text-sm font-semibold text-white/60 uppercase tracking-wider">All Articles</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg">No articles found for "{search}"</p>
                <button
                  onClick={() => { setSearch(""); setActiveCategory("All"); }}
                  className="mt-4 text-sm text-primary hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {(activeCategory === "All" && search === "" ? rest : filtered).map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    whileHover={{ y: -6 }}
                  >
                    <Link
                      to={`/blog/${post.slug}` as any}
                      className="group flex flex-col glass rounded-2xl overflow-hidden hover:bg-white/[0.09] transition h-full"
                    >
                      <div
                        className={`h-44 bg-gradient-to-br ${post.featuredImageGradient} flex items-center justify-center text-5xl relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 opacity-10"
                          style={{
                            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                            backgroundSize: "20px 20px"
                          }}
                        />
                        {post.featuredImageEmoji}
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <span className="text-xs font-medium text-primary mb-2">{post.category}</span>
                        <h2 className="font-bold text-base text-white mb-2 group-hover:text-primary transition leading-snug flex-1">
                          {post.title}
                        </h2>
                        <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                          {post.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(post.publishedDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
