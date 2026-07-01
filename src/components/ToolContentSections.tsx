import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronDown, ShieldCheck, ArrowRight, BookOpen, Calendar } from "lucide-react";
import { useState } from "react";
import { ALL_BLOG_POSTS } from "@/components/BlogLayout";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ToolContentData {
  /** H2 heading for the "What Is" section, e.g. "What Is PDF Compression?" */
  whatIs: {
    heading: string;
    paragraphs: string[];
  };
  howTo: {
    heading: string;
    steps: { title: string; description: string }[];
  };
  benefits: {
    heading: string;
    items: {
      icon: React.ComponentType<{ className?: string }>;
      title: string;
      description: string;
    }[];
  };
  useCases: {
    heading: string;
    intro: string;
    items: { label: string; description: string }[];
  };
  privacy: {
    heading: string;
    paragraphs: string[];
  };
  faqs: { question: string; answer: string }[];
  relatedTools: {
    name: string;
    href: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    accent: string;
  }[];
  relatedArticleSlugs: string[];
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SectionShell({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay }}
      className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
    >
      {children}
    </motion.section>
  );
}

function FAQAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-4 sm:px-6 py-4 flex items-center justify-between gap-3 text-left"
        aria-expanded={isOpen}
      >
        <h3 className="font-medium text-sm sm:text-base text-white">{question}</h3>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm text-muted-foreground leading-relaxed"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ToolContentSections({ data }: { data: ToolContentData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const relatedPosts = ALL_BLOG_POSTS.filter((p) => data.relatedArticleSlugs.includes(p.slug));

  return (
    <div className="space-y-6 sm:space-y-8 mt-10 sm:mt-14">
      {/* ── What Is ── */}
      <SectionShell>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">{data.whatIs.heading}</h2>
        <div className="space-y-4 text-sm sm:text-base text-white/80 leading-relaxed">
          {data.whatIs.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </SectionShell>

      {/* ── How To ── */}
      <SectionShell delay={0.05}>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">{data.howTo.heading}</h2>
        <div className="space-y-4">
          {data.howTo.steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl btn-gradient flex items-center justify-center font-bold text-sm shrink-0">
                {i + 1}
              </div>
              <div className="pt-1">
                <h3 className="font-semibold text-white text-sm sm:text-base">{step.title}</h3>
                <p className="text-sm text-white/70 mt-1 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* ── Benefits ── */}
      <SectionShell delay={0.05}>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">{data.benefits.heading}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {data.benefits.items.map((item, i) => (
            <div key={i} className="flex items-start gap-3 glass rounded-xl p-4">
              <div className="w-9 h-9 rounded-lg btn-gradient flex items-center justify-center shrink-0">
                <item.icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-xs sm:text-sm text-white/65 mt-0.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* ── When to Use ── */}
      <SectionShell delay={0.05}>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">{data.useCases.heading}</h2>
        <p className="text-sm sm:text-base text-white/70 mb-5 leading-relaxed">
          {data.useCases.intro}
        </p>
        <ul className="space-y-3">
          {data.useCases.items.map((uc, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">
                ✓
              </span>
              <span className="text-white/80 leading-relaxed">
                <strong className="text-white">{uc.label}:</strong> {uc.description}
              </span>
            </li>
          ))}
        </ul>
      </SectionShell>

      {/* ── Privacy & Security ── */}
      <SectionShell delay={0.05}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">{data.privacy.heading}</h2>
        </div>
        <div className="space-y-4 text-sm sm:text-base text-white/80 leading-relaxed">
          {data.privacy.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="text-xs text-white/50">
            Read our full{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>{" "}
            for more details.
          </p>
        </div>
      </SectionShell>

      {/* ── FAQs ── */}
      <SectionShell delay={0.05}>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {data.faqs.map((faq, i) => (
            <FAQAccordionItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </SectionShell>

      {/* ── Related Tools ── */}
      {data.relatedTools.length > 0 && (
        <SectionShell delay={0.05}>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.relatedTools.map((tool, i) => (
              <Link
                key={i}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                to={tool.href as any}
                className="group flex items-center gap-3 glass rounded-xl p-4 hover:bg-white/10 transition"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.accent} flex items-center justify-center shrink-0`}
                >
                  <tool.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm group-hover:text-primary transition">
                    {tool.name}
                  </div>
                  <div className="text-xs text-white/55 mt-0.5 truncate">{tool.description}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </SectionShell>
      )}

      {/* ── Related Articles ── */}
      {relatedPosts.length > 0 && (
        <SectionShell delay={0.05}>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Learn More</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                to={`/blog/${post.slug}` as any}
                className="group glass rounded-2xl overflow-hidden hover:bg-white/[0.09] transition"
              >
                <div
                  className={`h-28 bg-gradient-to-br ${post.featuredImageGradient} flex items-center justify-center text-3xl relative overflow-hidden`}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  {post.featuredImageEmoji}
                </div>
                <div className="p-4">
                  <span className="text-xs text-primary font-medium">{post.category}</span>
                  <h3 className="font-semibold text-sm text-white mt-1 mb-2 group-hover:text-primary transition leading-snug">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.publishedDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </SectionShell>
      )}
    </div>
  );
}
