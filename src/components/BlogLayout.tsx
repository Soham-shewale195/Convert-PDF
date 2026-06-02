import { ReactNode, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, User, ChevronRight, ArrowRight, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import { Footer } from "@/components/Sections";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedDate: string;
  readTime: string;
  featuredImageGradient: string;
  featuredImageEmoji: string;
}

export const ALL_BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-convert-pdf-to-word",
    title: "How to Convert PDF to Word Online — Free & Instant",
    description: "Learn how to convert PDF to Word documents online for free, without losing formatting. Step-by-step guide with tips for the best results.",
    category: "PDF Tools",
    publishedDate: "2024-12-15",
    readTime: "8 min read",
    featuredImageGradient: "from-violet-600 via-purple-600 to-blue-600",
    featuredImageEmoji: "📄",
  },
  {
    slug: "compress-pdf-without-losing-quality",
    title: "How to Compress PDF Without Losing Quality",
    description: "Discover the best techniques to reduce PDF file size while maintaining document quality. Complete guide to PDF compression.",
    category: "PDF Tools",
    publishedDate: "2024-12-20",
    readTime: "7 min read",
    featuredImageGradient: "from-cyan-600 via-teal-600 to-emerald-600",
    featuredImageEmoji: "🗜️",
  },
  {
    slug: "jpg-vs-png-guide",
    title: "JPG vs PNG: Which Image Format Should You Use?",
    description: "A complete comparison of JPG and PNG image formats. Learn when to use each format for photos, graphics, web, and print.",
    category: "Image Tools",
    publishedDate: "2025-01-05",
    readTime: "9 min read",
    featuredImageGradient: "from-orange-500 via-amber-500 to-yellow-500",
    featuredImageEmoji: "🖼️",
  },
  {
    slug: "browser-pdf-converter-privacy",
    title: "Why a Browser-Based PDF Converter is the Safest Choice",
    description: "Understand the privacy advantages of browser-based PDF conversion vs server-side tools. Your documents never leave your device.",
    category: "Privacy & Security",
    publishedDate: "2025-01-12",
    readTime: "6 min read",
    featuredImageGradient: "from-emerald-600 via-green-600 to-teal-600",
    featuredImageEmoji: "🔒",
  },
  {
    slug: "best-free-pdf-tools",
    title: "The 10 Best Free PDF Tools Online in 2025",
    description: "A comprehensive roundup of the best free online PDF tools for converting, compressing, merging, splitting and editing PDFs.",
    category: "PDF Tools",
    publishedDate: "2025-01-20",
    readTime: "10 min read",
    featuredImageGradient: "from-pink-600 via-rose-600 to-red-600",
    featuredImageEmoji: "🏆",
  },
  {
    slug: "how-to-merge-pdf-files-online",
    title: "How to Merge PDF Files Online — Fast, Free & Private",
    description: "Learn how to combine multiple PDF files into one document online for free. Step-by-step guide to merging PDFs without software.",
    category: "PDF Tools",
    publishedDate: "2025-01-28",
    readTime: "7 min read",
    featuredImageGradient: "from-blue-600 via-indigo-600 to-violet-600",
    featuredImageEmoji: "🔗",
  },
];

interface FAQItem {
  question: string;
  answer: string;
}

interface CTAItem {
  label: string;
  href: string;
  description: string;
}

interface BlogLayoutProps {
  slug: string;
  title: string;
  description: string;
  canonicalPath: string;
  publishedDate: string;
  modifiedDate?: string;
  category: string;
  readTime: string;
  featuredImageGradient: string;
  featuredImageEmoji: string;
  faqs: FAQItem[];
  relatedSlugs: string[];
  ctas: CTAItem[];
  children: ReactNode;
}

export default function BlogLayout({
  slug,
  title,
  description,
  canonicalPath,
  publishedDate,
  modifiedDate,
  category,
  readTime,
  featuredImageGradient,
  featuredImageEmoji,
  faqs,
  relatedSlugs,
  ctas,
  children,
}: BlogLayoutProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canonicalUrl = `https://converttpdf.com${canonicalPath}`;
  const relatedPosts = ALL_BLOG_POSTS.filter((p) => relatedSlugs.includes(p.slug));

  // JSON-LD Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": "Organization",
      name: "ConvertPDF Team",
      url: "https://converttpdf.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Convert PDF",
      url: "https://converttpdf.com",
      logo: {
        "@type": "ImageObject",
        url: "https://converttpdf.com/favicon.png",
      },
    },
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    url: canonicalUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    articleSection: category,
    image: {
      "@type": "ImageObject",
      url: `https://converttpdf.com/blog-images/${slug}.webp`,
      width: 1200,
      height: 630,
    },
  };

  // JSON-LD FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // JSON-LD BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://converttpdf.com/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://converttpdf.com/blog" },
      { "@type": "ListItem", position: 3, name: title, item: canonicalUrl },
    ],
  };

  const formattedDate = new Date(publishedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col relative z-0">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Background />
      <Navbar />

      <main className="flex-1 px-4 sm:px-6 pt-24 pb-16 sm:pt-32 sm:pb-24 relative z-10">
        <div className="max-w-4xl mx-auto">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/blog" className="hover:text-foreground transition">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground truncate max-w-[200px] sm:max-w-none">{title}</span>
          </nav>

          {/* Featured Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-8 group"
            style={{ minHeight: "280px" }}
          >
            {/* Actual SEO Image (loads if present in public/blog-images) */}
            <img 
              src={`/blog-images/${slug}.webp`} 
              alt={title}
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 group-hover:opacity-50 transition-opacity"
              onError={(e) => {
                // Fallback to gradient if image is not yet created
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />

            <div
              className={`absolute inset-0 bg-gradient-to-br ${featuredImageGradient} opacity-90 mix-blend-multiply`}
            />
            {/* Decorative grid */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "32px 32px"
              }}
            />
            {/* Decorative blobs */}
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-52 h-52 rounded-full bg-black/20 blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-end h-full p-8 sm:p-12 pointer-events-none" style={{ minHeight: "280px" }}>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-sm">
                  {category}
                </span>
              </div>
              <div className="text-6xl sm:text-7xl mb-4">{featuredImageEmoji}</div>
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  ConvertPDF Team
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  {readTime}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-14 relative overflow-hidden"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white leading-tight">
              {title}
            </h1>
            <p className="text-lg text-white/70 mb-10 leading-relaxed border-b border-white/10 pb-10">
              {description}
            </p>

            {/* Article body */}
            <div className="blog-content space-y-6 text-sm sm:text-base text-white/90 leading-relaxed">
              {children}
            </div>
          </motion.article>

          {/* FAQ Section */}
          {faqs.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 glass rounded-2xl sm:rounded-3xl p-6 sm:p-10"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <FAQItem key={i} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </motion.section>
          )}

          {/* CTA Section */}
          {ctas.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, oklch(0.68 0.20 280 / 30%), oklch(0.72 0.18 220 / 30%))",
                border: "1px solid oklch(1 0 0 / 15%)"
              }}
            >
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "24px 24px"
                }}
              />
              <h2 className="relative z-10 text-2xl sm:text-3xl font-bold text-white mb-3">
                Try These Free PDF Tools
              </h2>
              <p className="relative z-10 text-white/70 mb-8">
                Everything runs in your browser — no uploads, no account required.
              </p>
              <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ctas.map((cta, i) => (
                  <Link
                    key={i}
                    to={cta.href as any}
                    className="group flex items-center justify-between gap-3 glass rounded-xl p-4 hover:bg-white/10 transition"
                  >
                    <div>
                      <div className="font-semibold text-white text-sm">{cta.label}</div>
                      <div className="text-xs text-white/60 mt-0.5">{cta.description}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}` as any}
                    className="group glass rounded-2xl overflow-hidden hover:bg-white/[0.09] transition"
                  >
                    <div
                      className={`h-32 bg-gradient-to-br ${post.featuredImageGradient} flex items-center justify-center text-4xl relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                          backgroundSize: "20px 20px"
                        }}
                      />
                      {post.featuredImageEmoji}
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-primary font-medium">{post.category}</span>
                      <h3 className="font-semibold text-sm text-white mt-1 mb-2 group-hover:text-primary transition leading-snug">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publishedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* Back to blog */}
          <div className="mt-12 flex justify-center">
            <Link
              to="/blog"
              className="flex items-center gap-2 glass rounded-xl px-6 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="glass rounded-xl p-5 sm:p-6">
      <h3 className="font-semibold text-white text-base mb-2">{question}</h3>
      <p className="text-sm text-white/75 leading-relaxed">{answer}</p>
    </div>
  );
}
