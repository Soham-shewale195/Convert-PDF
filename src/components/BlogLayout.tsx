import { ReactNode, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  User,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Clock,
  Tag,
  Menu,
  X,
  CheckCircle2,
} from "lucide-react";
import Navbar from "./Navbar";
import Background from "@/components/Background";
import { Footer } from "./Footer";

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
    description:
      "Learn how to convert PDF to Word documents online for free, without losing formatting. Step-by-step guide with tips for the best results.",
    category: "PDF Tools",
    publishedDate: "2024-12-15",
    readTime: "8 min read",
    featuredImageGradient: "from-violet-600 via-purple-600 to-blue-600",
    featuredImageEmoji: "📄",
  },
  {
    slug: "compress-pdf-without-losing-quality",
    title: "How to Compress PDF Without Losing Quality",
    description:
      "Discover the best techniques to reduce PDF file size while maintaining document quality. Complete guide to PDF compression.",
    category: "PDF Tools",
    publishedDate: "2024-12-20",
    readTime: "7 min read",
    featuredImageGradient: "from-cyan-600 via-teal-600 to-emerald-600",
    featuredImageEmoji: "🗜️",
  },
  {
    slug: "jpg-vs-png-guide",
    title: "JPG vs PNG: Which Image Format Should You Use?",
    description:
      "A complete comparison of JPG and PNG image formats. Learn when to use each format for photos, graphics, web, and print.",
    category: "Image Tools",
    publishedDate: "2025-01-05",
    readTime: "9 min read",
    featuredImageGradient: "from-orange-500 via-amber-500 to-yellow-500",
    featuredImageEmoji: "🖼️",
  },
  {
    slug: "browser-pdf-converter-privacy",
    title: "Why a Browser-Based PDF Converter is the Safest Choice",
    description:
      "Understand the privacy advantages of browser-based PDF conversion vs server-side tools. Your documents never leave your device.",
    category: "Privacy & Security",
    publishedDate: "2025-01-12",
    readTime: "6 min read",
    featuredImageGradient: "from-emerald-600 via-green-600 to-teal-600",
    featuredImageEmoji: "🔒",
  },
  {
    slug: "best-free-pdf-tools",
    title: "The 10 Best Free PDF Tools Online in 2025",
    description:
      "A comprehensive roundup of the best free online PDF tools for converting, compressing, merging, splitting and editing PDFs.",
    category: "PDF Tools",
    publishedDate: "2025-01-20",
    readTime: "10 min read",
    featuredImageGradient: "from-pink-600 via-rose-600 to-red-600",
    featuredImageEmoji: "🏆",
  },
  {
    slug: "how-to-merge-pdf-files-online",
    title: "How to Merge PDF Files Online — Fast, Free & Private",
    description:
      "Learn how to combine multiple PDF files into one document online for free. Step-by-step guide to merging PDFs without software.",
    category: "PDF Tools",
    publishedDate: "2025-01-28",
    readTime: "7 min read",
    featuredImageGradient: "from-blue-600 via-indigo-600 to-violet-600",
    featuredImageEmoji: "🔗",
  },
  {
    slug: "how-to-split-pdf-pages",
    title: "How to Split a Large PDF into Multiple Files Online",
    description:
      "Learn how to split large PDF documents into smaller files safely and instantly. Step-by-step guide on extracting pages without uploading.",
    category: "PDF Tools",
    publishedDate: "2025-02-10",
    readTime: "8 min read",
    featuredImageGradient: "from-blue-500 via-cyan-500 to-teal-500",
    featuredImageEmoji: "✂️",
  },
  {
    slug: "excel-to-pdf-formatting-guide",
    title: "Excel to PDF: How to Convert Spreadsheets Perfectly",
    description:
      "Stop dealing with cutoff columns. Learn how to convert Excel spreadsheets to PDF while perfectly preserving your layout and formatting.",
    category: "PDF Tools",
    publishedDate: "2025-02-12",
    readTime: "9 min read",
    featuredImageGradient: "from-green-600 via-emerald-600 to-teal-600",
    featuredImageEmoji: "📊",
  },
  {
    slug: "webp-vs-jpg-vs-png",
    title: "WebP vs JPG vs PNG: The Ultimate Image Format Guide",
    description:
      "Confused by image formats? Discover the differences between WebP, JPG, and PNG, and learn exactly when to use each for web, print, and social media.",
    category: "Image Tools",
    publishedDate: "2025-02-15",
    readTime: "12 min read",
    featuredImageGradient: "from-purple-600 via-fuchsia-600 to-pink-600",
    featuredImageEmoji: "🖼️",
  },
  {
    slug: "how-to-rotate-pdf-pages",
    title: "How to Rotate PDF Pages and Save Permanently",
    description:
      "Fix sideways or upside-down PDF pages in seconds. Learn how to rotate specific pages or entire documents and save the changes permanently.",
    category: "PDF Tools",
    publishedDate: "2025-02-18",
    readTime: "7 min read",
    featuredImageGradient: "from-orange-500 via-red-500 to-rose-500",
    featuredImageEmoji: "🔄",
  },
  {
    slug: "how-to-resize-images-social-media",
    title: "How to Resize Images for Social Media Without Quality Loss",
    description:
      "The complete guide to resizing images for Instagram, Facebook, LinkedIn, and Twitter. Learn how to avoid pixelation and cropping issues.",
    category: "Image Tools",
    publishedDate: "2025-02-22",
    readTime: "10 min read",
    featuredImageGradient: "from-indigo-500 via-blue-500 to-sky-500",
    featuredImageEmoji: "📱",
  },
  {
    slug: "pdf-vs-word-differences",
    title: "PDF vs Word: When to Use Which Document Format",
    description:
      "Discover the fundamental differences between PDF and Word documents. Learn exactly when to use each format for professional communication.",
    category: "PDF Tools",
    publishedDate: "2025-02-28",
    readTime: "9 min read",
    featuredImageGradient: "from-blue-700 via-indigo-600 to-blue-500",
    featuredImageEmoji: "📄",
  },
  {
    slug: "risks-of-online-file-converters",
    title: "The Hidden Risks of Server-Based File Converters",
    description:
      "Are online PDF converters safe? Discover the hidden privacy risks of uploading sensitive documents to cloud servers, and how to avoid them.",
    category: "Privacy & Security",
    publishedDate: "2025-03-02",
    readTime: "11 min read",
    featuredImageGradient: "from-gray-700 via-slate-600 to-gray-500",
    featuredImageEmoji: "🔒",
  },
  {
    slug: "how-to-convert-webp-to-jpg",
    title: "How to Convert WEBP Images to JPG Instantly",
    description:
      "Frustrated by downloaded WEBP files that won't open? Learn how to convert WEBP to JPG instantly and safely right in your web browser.",
    category: "Image Tools",
    publishedDate: "2025-03-05",
    readTime: "7 min read",
    featuredImageGradient: "from-fuchsia-600 via-purple-600 to-pink-600",
    featuredImageEmoji: "🔄",
  },
  {
    slug: "how-to-watermark-pdf-documents",
    title: "How to Add a Watermark to a PDF Safely",
    description:
      "Protect your intellectual property. Learn how to securely draft, position, and stamp watermarks onto your PDF documents without uploading them.",
    category: "PDF Tools",
    publishedDate: "2025-03-08",
    readTime: "10 min read",
    featuredImageGradient: "from-cyan-600 via-sky-600 to-blue-600",
    featuredImageEmoji: "©️",
  },
  {
    slug: "image-aspect-ratio-cropping-guide",
    title: "The Complete Guide to Image Aspect Ratios and Cropping",
    description:
      "Master the art of image cropping. Understand aspect ratios like 16:9 and 1:1, and learn how to frame your photography perfectly for any platform.",
    category: "Image Tools",
    publishedDate: "2025-03-12",
    readTime: "12 min read",
    featuredImageGradient: "from-amber-500 via-orange-500 to-red-500",
    featuredImageEmoji: "✂️",
  },
  {
    slug: "how-to-watermark-photos-online",
    title: "How to Watermark Your Photography Online for Free",
    description:
      "Stop image theft. Learn how to protect your photos with custom text watermarks before uploading them to social media or portfolio sites.",
    category: "Image Tools",
    publishedDate: "2025-03-15",
    readTime: "8 min read",
    featuredImageGradient: "from-emerald-500 via-teal-500 to-cyan-500",
    featuredImageEmoji: "📸",
  },
  {
    slug: "what-is-client-side-processing",
    title: "What is Client-Side Document Processing?",
    description:
      "Understand the technology that keeps your files safe. Learn how WebAssembly and client-side processing eliminate the need for cloud servers.",
    category: "Privacy & Security",
    publishedDate: "2025-03-20",
    readTime: "11 min read",
    featuredImageGradient: "from-blue-600 via-indigo-600 to-violet-600",
    featuredImageEmoji: "💻",
  },
  {
    slug: "text-to-pdf-converter-guide",
    title: "Text to PDF: The Easiest Way to Convert Code & Notes",
    description:
      "Learn how to instantly convert plain text files, markdown, and source code into perfectly formatted PDF documents.",
    category: "PDF Tools",
    publishedDate: "2025-03-22",
    readTime: "8 min read",
    featuredImageGradient: "from-emerald-600 via-teal-600 to-cyan-600",
    featuredImageEmoji: "📝",
  },
  {
    slug: "how-to-convert-images-to-pdf",
    title: "How to Combine Photos into a Single PDF Document",
    description:
      "The complete guide to merging multiple JPG and PNG images into a single, highly compressed PDF file for easy sharing.",
    category: "PDF Tools",
    publishedDate: "2025-03-25",
    readTime: "10 min read",
    featuredImageGradient: "from-orange-500 via-amber-500 to-yellow-500",
    featuredImageEmoji: "🖼️",
  },
  {
    slug: "how-to-check-pdf-converter-safety",
    title: "How to Tell if a Free PDF Converter is Actually Safe",
    description:
      "Don't fall for fake privacy policies. Learn the technical tests you can run to prove whether a PDF converter is stealing your documents.",
    category: "Privacy & Security",
    publishedDate: "2025-03-28",
    readTime: "12 min read",
    featuredImageGradient: "from-red-600 via-rose-600 to-pink-600",
    featuredImageEmoji: "🛡️",
  },
  {
    slug: "digital-document-workflow-students",
    title: "The Ultimate Digital Document Workflow for Students",
    description:
      "How to organize, merge, compress, and format your research papers and study materials using free browser-based tools.",
    category: "Productivity",
    publishedDate: "2025-04-02",
    readTime: "14 min read",
    featuredImageGradient: "from-sky-500 via-blue-500 to-indigo-500",
    featuredImageEmoji: "🎓",
  },
  {
    slug: "freelance-contract-management-free",
    title: "How Freelancers Can Manage Contracts Without Paid Software",
    description:
      "A complete guide for freelancers on how to create, merge, and protect client contracts using completely free, secure web tools.",
    category: "Productivity",
    publishedDate: "2025-04-05",
    readTime: "13 min read",
    featuredImageGradient: "from-fuchsia-600 via-purple-600 to-violet-600",
    featuredImageEmoji: "💼",
  },
  {
    slug: "why-compress-pdfs-for-email",
    title: "Why You Shouldn't Email Uncompressed PDFs",
    description:
      "Stop getting your emails bounced by corporate servers. Learn the technical limits of email attachments and how to compress PDFs properly.",
    category: "PDF Tools",
    publishedDate: "2025-04-08",
    readTime: "9 min read",
    featuredImageGradient: "from-cyan-500 via-teal-500 to-emerald-500",
    featuredImageEmoji: "📧",
  },
  {
    slug: "batch-image-processing-guide",
    title: "Batch Image Processing: Saving Time in Your Workflow",
    description:
      "Learn how to crop, resize, and convert hundreds of images simultaneously using local browser memory.",
    category: "Image Tools",
    publishedDate: "2025-04-12",
    readTime: "11 min read",
    featuredImageGradient: "from-pink-500 via-rose-500 to-red-500",
    featuredImageEmoji: "⚡",
  },
  {
    slug: "browser-tech-replacing-desktop-apps",
    title: "Top Browser Technologies That Replaced Desktop Software",
    description:
      "Explore how WebAssembly, Canvas API, and local processing are making expensive desktop software obsolete.",
    category: "Productivity",
    publishedDate: "2025-04-15",
    readTime: "15 min read",
    featuredImageGradient: "from-violet-600 via-purple-600 to-fuchsia-600",
    featuredImageEmoji: "🌐",
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

// Table of Contents hook
function useTableOfContents() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const content = document.querySelector(".blog-content");
    if (!content) return;

    const headingElements = content.querySelectorAll("h2, h3");
    const newHeadings = Array.from(headingElements).map((el) => {
      const text = el.textContent || "";
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      el.id = id;
      return { id, text, level: el.tagName === "H2" ? 2 : 3 };
    });
    setHeadings(newHeadings);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" },
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return { headings, activeId };
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

  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const { headings, activeId } = useTableOfContents();

  const canonicalUrl = `https://converttpdf.com${canonicalPath}`;
  const relatedPosts = ALL_BLOG_POSTS.filter((p) => relatedSlugs.includes(p.slug));

  const authorName = "ConvertPDF Editorial Team";
  const finalModifiedDate = modifiedDate || publishedDate;

  // JSON-LD Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": "Person",
      name: authorName,
      url: "https://converttpdf.com/about",
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
    dateModified: finalModifiedDate,
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://converttpdf.com/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://converttpdf.com/blog" },
      { "@type": "ListItem", position: 3, name: title, item: canonicalUrl },
    ],
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col relative z-0">
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
        {/* Full width intro section */}
        <div className="max-w-6xl mx-auto mb-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
          >
            <Link to="/" className="hover:text-foreground transition">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/blog" className="hover:text-foreground transition">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground truncate max-w-[200px] sm:max-w-none">{title}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden group"
            style={{ minHeight: "280px" }}
          >
            <img
              src={`/blog-images/${slug}.webp`}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 group-hover:opacity-50 transition-opacity"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${featuredImageGradient} opacity-90 mix-blend-multiply`}
            />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-52 h-52 rounded-full bg-black/20 blur-2xl pointer-events-none" />

            <div
              className="relative z-10 flex flex-col justify-end h-full p-8 sm:p-12 pointer-events-none"
              style={{ minHeight: "280px" }}
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-sm shadow-sm">
                  {category}
                </span>
              </div>
              <div className="text-6xl sm:text-7xl mb-4">{featuredImageEmoji}</div>
            </div>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-start">
          {/* Main Article Column */}
          <div className="flex-1 min-w-0 w-full">
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

              {/* Metadata Bar */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white/70 mb-8 border-b border-white/10 pb-6">
                <span className="flex items-center gap-1.5 font-medium">
                  <User className="w-4 h-4 text-primary" />
                  {authorName}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary" />
                  Published: {formatDate(publishedDate)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  Updated: {formatDate(finalModifiedDate)}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-primary" />
                  {readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-primary" />
                  {category}
                </span>
              </div>

              <p className="text-lg sm:text-xl text-white/80 mb-10 leading-relaxed font-medium">
                {description}
              </p>

              {/* Mobile TOC Toggle */}
              {headings.length > 0 && (
                <div className="lg:hidden mb-8">
                  <button
                    onClick={() => setMobileTocOpen(!mobileTocOpen)}
                    className="flex items-center justify-between w-full glass rounded-xl px-4 py-3 text-sm font-semibold text-white border border-white/10"
                  >
                    Table of Contents
                    {mobileTocOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                  </button>
                  <AnimatePresence>
                    {mobileTocOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <nav className="glass mt-2 rounded-xl p-4 space-y-2 border border-white/10">
                          {headings.map((h) => (
                            <a
                              key={h.id}
                              href={`#${h.id}`}
                              onClick={() => setMobileTocOpen(false)}
                              className={`block text-sm transition py-1 ${activeId === h.id ? "text-primary font-medium" : "text-white/70 hover:text-white"} ${h.level === 3 ? "pl-4" : ""}`}
                            >
                              {h.text}
                            </a>
                          ))}
                        </nav>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Article body */}
              <div className="blog-content space-y-6 text-sm sm:text-base text-white/90 leading-relaxed">
                {/* CSS enhancements via global or inline class matching */}
                <style>{`
                  .blog-content h2 { font-size: 1.5rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1rem; color: white; scroll-margin-top: 100px; }
                  .blog-content h3 { font-size: 1.25rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.75rem; color: white; scroll-margin-top: 100px; }
                  .blog-content p { margin-bottom: 1.25rem; line-height: 1.75; }
                  .blog-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; }
                  .blog-content li { margin-bottom: 0.5rem; }
                  .blog-content strong { color: white; font-weight: 600; }
                  .blog-content a { color: var(--color-primary, #60a5fa); text-decoration: none; font-weight: 500; }
                  .blog-content a:hover { text-decoration: underline; }
                  .blog-content .callout { background: rgba(255, 255, 255, 0.05); border-left: 4px solid var(--color-primary, #60a5fa); padding: 1rem 1.5rem; border-radius: 0 0.5rem 0.5rem 0; margin: 1.5rem 0; font-style: italic; }
                  .blog-content table { width: 100%; border-collapse: collapse; margin: 2rem 0; background: rgba(255,255,255,0.02); border-radius: 0.75rem; overflow: hidden; }
                  .blog-content th { background: rgba(255,255,255,0.05); text-align: left; padding: 1rem; color: white; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.1); }
                  .blog-content td { padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
                  .blog-content tr:last-child td { border-bottom: none; }
                `}</style>
                {children}
              </div>

              <AuthorBio />
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
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 280 / 30%), oklch(0.72 0.18 220 / 30%))",
                  border: "1px solid oklch(1 0 0 / 15%)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <h2 className="relative z-10 text-2xl sm:text-3xl font-bold text-white mb-3">
                  Try These Free Tools
                </h2>
                <p className="relative z-10 text-white/70 mb-8">
                  Everything runs locally in your browser — no uploads, no account required.
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
                className="mt-10 mb-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Read Next</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {relatedPosts.map((post) => (
                    <Link
                      key={post.slug}
                      to={`/blog/${post.slug}` as any}
                      className="group glass rounded-2xl overflow-hidden hover:bg-white/[0.09] transition flex flex-col h-full"
                    >
                      <div
                        className={`h-36 bg-gradient-to-br ${post.featuredImageGradient} flex items-center justify-center text-4xl relative overflow-hidden shrink-0`}
                      >
                        <img
                          src={`/blog-images/${post.slug}.webp`}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 group-hover:opacity-40 transition-opacity"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                        <div
                          className="absolute inset-0 opacity-10"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                            backgroundSize: "20px 20px",
                          }}
                        />
                        <span className="relative z-10">{post.featuredImageEmoji}</span>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <span className="text-xs text-primary font-medium mb-1.5">
                          {post.category}
                        </span>
                        <h3 className="font-semibold text-sm text-white mb-3 group-hover:text-primary transition leading-snug flex-1">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-auto">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(post.publishedDate)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar (Desktop TOC) */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div
              className="sticky top-28 glass rounded-2xl p-6 border border-white/10"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
            >
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Menu className="w-4 h-4 text-primary" />
                Table of Contents
              </h3>
              <nav className="space-y-1.5 text-sm max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
                {headings.length === 0 && (
                  <p className="text-white/50 text-xs italic">No headings found.</p>
                )}
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className={`block py-1.5 leading-snug transition-colors ${
                      activeId === h.id
                        ? "text-primary font-medium border-l-2 border-primary pl-3 -ml-3.5"
                        : "text-white/60 hover:text-white"
                    } ${h.level === 3 ? "pl-4" : ""}`}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

function AuthorBio() {
  return (
    <div className="mt-16 border-t border-white/10 pt-10 flex flex-col sm:flex-row gap-6 items-start">
      <div className="w-16 h-16 rounded-full glass flex items-center justify-center shrink-0 border border-white/10 bg-white/5">
        <User className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h3 className="font-bold text-lg text-white mb-2 flex items-center gap-2">
          ConvertPDF Editorial Team
          <CheckCircle2 className="w-4 h-4 text-primary" />
        </h3>
        <p className="text-white/70 text-sm leading-relaxed mb-3">
          The ConvertPDF Editorial Team creates privacy-focused educational content and guides. We
          are dedicated to providing accurate, regularly reviewed tutorials based on the actual
          browser-based technologies powering our PDF and image processing tools.
        </p>
        <div className="flex items-center gap-4 text-xs font-medium text-primary">
          <Link to="/about" className="hover:underline">
            About Our Technology
          </Link>
          <Link to="/privacy" className="hover:underline">
            Privacy Commitment
          </Link>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="glass rounded-xl p-5 sm:p-6 border border-white/5">
      <h3 className="font-semibold text-white text-base mb-2">{question}</h3>
      <p className="text-sm text-white/75 leading-relaxed">{answer}</p>
    </div>
  );
}
