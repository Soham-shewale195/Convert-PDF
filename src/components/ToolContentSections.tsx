import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  Minus,
  AlertTriangle,
  Info,
  CornerDownRight,
} from "lucide-react";
import { useState } from "react";
import { ALL_BLOG_POSTS } from "@/components/BlogLayout";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type IconType = React.ComponentType<{ className?: string }>;

export interface RelatedToolLink {
  name: string;
  href: string;
  description: string;
  icon: IconType;
  accent: string;
}

/**
 * A single content block on a tool page.
 *
 * Pages compose their own ordered array of these, so no two tool pages are
 * required to share a section set or a section order. Add new `kind`s here
 * rather than overloading an existing one — variety between pages is the
 * point.
 */
export type ToolSection =
  /** Free-form headed prose. */
  | { kind: "prose"; heading: string; paragraphs: string[] }
  /** Ordered walkthrough. `timeline` draws a connecting rail instead of loose numbered rows. */
  | {
      kind: "steps";
      heading: string;
      intro?: string;
      steps: { title: string; description: string }[];
      variant?: "numbered" | "timeline";
    }
  /** Icon cards in a grid. */
  | {
      kind: "cards";
      heading: string;
      intro?: string;
      items: { icon: IconType; title: string; description: string }[];
      columns?: 2 | 3;
    }
  /** Ticked list of label + description pairs. */
  | {
      kind: "checklist";
      heading: string;
      intro?: string;
      items: { label: string; description: string }[];
    }
  /** Highlighted note. `privacy` keeps the shield styling and the policy link. */
  | {
      kind: "callout";
      heading: string;
      paragraphs: string[];
      tone?: "privacy" | "info" | "warn";
      policyLink?: boolean;
    }
  /** Two-value reference table: what a setting is, and what it does. */
  | {
      kind: "specTable";
      heading: string;
      intro?: string;
      columns?: [string, string];
      rows: { label: string; value: string; note?: string }[];
    }
  /** Side-by-side comparison of two options across several aspects. */
  | {
      kind: "comparison";
      heading: string;
      intro?: string;
      columns: [string, string];
      rows: { aspect: string; a: string; b: string }[];
    }
  /** Support-style problem / cause / fix entries. */
  | {
      kind: "troubleshooting";
      heading: string;
      intro?: string;
      items: { problem: string; cause: string; fix: string }[];
    }
  /** Capability grid — booleans render as tick / dash, strings render as-is. */
  | {
      kind: "matrix";
      heading: string;
      intro?: string;
      columnHeadings: string[];
      rows: { label: string; cells: (string | boolean)[] }[];
    }
  /** "If this, then that" routing to the right tool or setting. */
  | {
      kind: "decision";
      heading: string;
      intro?: string;
      branches: {
        condition: string;
        recommendation: string;
        href?: string;
        linkLabel?: string;
      }[];
    }
  /** Term / definition pairs. */
  | {
      kind: "definitions";
      heading: string;
      intro?: string;
      terms: { term: string; definition: string }[];
    }
  /** Accordion FAQ. Heading defaults to "Frequently Asked Questions". */
  | { kind: "faq"; heading?: string; intro?: string; faqs: { question: string; answer: string }[] }
  /** Cross-links to sibling tools. Heading defaults to "Related Tools". */
  | { kind: "toolLinks"; heading?: string; intro?: string; tools: RelatedToolLink[] }
  /** Cross-links to blog posts by slug. Heading defaults to "Learn More". */
  | { kind: "articleLinks"; heading?: string; intro?: string; slugs: string[] };

/**
 * Legacy fixed-shape page content.
 *
 * Every field is required, which is exactly why all tool pages ended up
 * structurally identical. Kept so pages can migrate to `sections` one at a
 * time; new pages should not use it.
 *
 * @deprecated Compose a `ToolSection[]` instead.
 */
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
      icon: IconType;
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
  relatedTools: RelatedToolLink[];
  relatedArticleSlugs: string[];
}

/** Expands the legacy object into the canonical block order it used to render. */
function legacySectionsFrom(data: ToolContentData): ToolSection[] {
  return [
    { kind: "prose", heading: data.whatIs.heading, paragraphs: data.whatIs.paragraphs },
    { kind: "steps", heading: data.howTo.heading, steps: data.howTo.steps },
    { kind: "cards", heading: data.benefits.heading, items: data.benefits.items },
    {
      kind: "checklist",
      heading: data.useCases.heading,
      intro: data.useCases.intro,
      items: data.useCases.items,
    },
    {
      kind: "callout",
      heading: data.privacy.heading,
      paragraphs: data.privacy.paragraphs,
      tone: "privacy",
      policyLink: true,
    },
    { kind: "faq", faqs: data.faqs },
    { kind: "toolLinks", tools: data.relatedTools },
    { kind: "articleLinks", slugs: data.relatedArticleSlugs },
  ];
}

/* ------------------------------------------------------------------ */
/*  Shared pieces                                                      */
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

function SectionHeading({
  children,
  tight = false,
}: {
  children: React.ReactNode;
  tight?: boolean;
}) {
  return (
    <h2 className={`text-xl sm:text-2xl font-bold text-white ${tight ? "mb-3" : "mb-6"}`}>
      {children}
    </h2>
  );
}

function SectionIntro({ children }: { children: React.ReactNode }) {
  return <p className="text-sm sm:text-base text-white/70 mb-5 leading-relaxed">{children}</p>;
}

/** Horizontally scrollable wrapper so wide tables never break the page layout. */
function TableScroll({ children }: { children: React.ReactNode }) {
  return <div className="overflow-x-auto -mx-1 px-1">{children}</div>;
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
/*  Block renderers                                                    */
/* ------------------------------------------------------------------ */

function ProseBlock({ heading, paragraphs }: { heading: string; paragraphs: string[] }) {
  return (
    <>
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">{heading}</h2>
      <div className="space-y-4 text-sm sm:text-base text-white/80 leading-relaxed">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </>
  );
}

function StepsBlock({
  heading,
  intro,
  steps,
  variant = "numbered",
}: Extract<ToolSection, { kind: "steps" }>) {
  return (
    <>
      <SectionHeading tight={Boolean(intro)}>{heading}</SectionHeading>
      {intro && <SectionIntro>{intro}</SectionIntro>}
      {variant === "timeline" ? (
        <ol className="relative space-y-6 pl-8 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-white/15">
          {steps.map((step, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-8 top-0 w-8 h-8 rounded-full btn-gradient flex items-center justify-center font-bold text-xs">
                {i + 1}
              </span>
              <h3 className="font-semibold text-white text-sm sm:text-base">{step.title}</h3>
              <p className="text-sm text-white/70 mt-1 leading-relaxed">{step.description}</p>
            </li>
          ))}
        </ol>
      ) : (
        <div className="space-y-4">
          {steps.map((step, i) => (
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
      )}
    </>
  );
}

function CardsBlock({
  heading,
  intro,
  items,
  columns = 2,
}: Extract<ToolSection, { kind: "cards" }>) {
  return (
    <>
      <SectionHeading tight={Boolean(intro)}>{heading}</SectionHeading>
      {intro && <SectionIntro>{intro}</SectionIntro>}
      <div
        className={`grid gap-4 ${columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}
      >
        {items.map((item, i) => (
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
    </>
  );
}

function ChecklistBlock({ heading, intro, items }: Extract<ToolSection, { kind: "checklist" }>) {
  return (
    <>
      <SectionHeading tight>{heading}</SectionHeading>
      {intro && <SectionIntro>{intro}</SectionIntro>}
      <ul className="space-y-3">
        {items.map((uc, i) => (
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
    </>
  );
}

const CALLOUT_TONES = {
  privacy: { icon: ShieldCheck, wrap: "bg-emerald-500/20", text: "text-emerald-400" },
  info: { icon: Info, wrap: "bg-sky-500/20", text: "text-sky-400" },
  warn: { icon: AlertTriangle, wrap: "bg-amber-500/20", text: "text-amber-400" },
} as const;

function CalloutBlock({
  heading,
  paragraphs,
  tone = "info",
  policyLink,
}: Extract<ToolSection, { kind: "callout" }>) {
  const { icon: ToneIcon, wrap, text } = CALLOUT_TONES[tone];
  return (
    <>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-9 h-9 rounded-lg ${wrap} flex items-center justify-center shrink-0`}>
          <ToneIcon className={`w-5 h-5 ${text}`} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">{heading}</h2>
      </div>
      <div className="space-y-4 text-sm sm:text-base text-white/80 leading-relaxed">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {policyLink && (
          <p className="text-xs text-white/50">
            Read our full{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>{" "}
            for more details.
          </p>
        )}
      </div>
    </>
  );
}

function SpecTableBlock({
  heading,
  intro,
  columns = ["Setting", "What it does"],
  rows,
}: Extract<ToolSection, { kind: "specTable" }>) {
  return (
    <>
      <SectionHeading tight={Boolean(intro)}>{heading}</SectionHeading>
      {intro && <SectionIntro>{intro}</SectionIntro>}
      <TableScroll>
        <table className="w-full text-sm border-collapse min-w-[32rem]">
          <thead>
            <tr className="border-b border-white/15">
              <th className="text-left py-2.5 pr-4 font-semibold text-white whitespace-nowrap">
                {columns[0]}
              </th>
              <th className="text-left py-2.5 font-semibold text-white">{columns[1]}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-white/[0.07] last:border-0 align-top">
                <td className="py-3 pr-4 font-medium text-white/90 whitespace-nowrap">
                  {row.label}
                </td>
                <td className="py-3 text-white/70 leading-relaxed">
                  {row.value}
                  {row.note && <span className="block text-xs text-white/45 mt-1">{row.note}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>
    </>
  );
}

function ComparisonBlock({
  heading,
  intro,
  columns,
  rows,
}: Extract<ToolSection, { kind: "comparison" }>) {
  return (
    <>
      <SectionHeading tight={Boolean(intro)}>{heading}</SectionHeading>
      {intro && <SectionIntro>{intro}</SectionIntro>}
      <TableScroll>
        <table className="w-full text-sm border-collapse min-w-[36rem]">
          <thead>
            <tr className="border-b border-white/15">
              <th className="text-left py-2.5 pr-4 font-semibold text-white/60 whitespace-nowrap">
                &nbsp;
              </th>
              <th className="text-left py-2.5 pr-4 font-semibold text-white">{columns[0]}</th>
              <th className="text-left py-2.5 font-semibold text-white">{columns[1]}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-white/[0.07] last:border-0 align-top">
                <td className="py-3 pr-4 font-medium text-white/90">{row.aspect}</td>
                <td className="py-3 pr-4 text-white/70 leading-relaxed">{row.a}</td>
                <td className="py-3 text-white/70 leading-relaxed">{row.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>
    </>
  );
}

function MatrixBlock({
  heading,
  intro,
  columnHeadings,
  rows,
}: Extract<ToolSection, { kind: "matrix" }>) {
  return (
    <>
      <SectionHeading tight={Boolean(intro)}>{heading}</SectionHeading>
      {intro && <SectionIntro>{intro}</SectionIntro>}
      <TableScroll>
        <table className="w-full text-sm border-collapse min-w-[34rem]">
          <thead>
            <tr className="border-b border-white/15">
              <th className="text-left py-2.5 pr-4 font-semibold text-white">&nbsp;</th>
              {columnHeadings.map((c, i) => (
                <th key={i} className="text-left py-2.5 pr-4 font-semibold text-white last:pr-0">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-white/[0.07] last:border-0 align-top">
                <td className="py-3 pr-4 font-medium text-white/90">{row.label}</td>
                {row.cells.map((cell, j) => (
                  <td key={j} className="py-3 pr-4 text-white/70 leading-relaxed last:pr-0">
                    {typeof cell === "boolean" ? (
                      cell ? (
                        <Check className="w-4 h-4 text-emerald-400" aria-label="Yes" />
                      ) : (
                        <Minus className="w-4 h-4 text-white/30" aria-label="No" />
                      )
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>
    </>
  );
}

function TroubleshootingBlock({
  heading,
  intro,
  items,
}: Extract<ToolSection, { kind: "troubleshooting" }>) {
  return (
    <>
      <SectionHeading tight={Boolean(intro)}>{heading}</SectionHeading>
      {intro && <SectionIntro>{intro}</SectionIntro>}
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="glass rounded-xl p-4 sm:p-5">
            <h3 className="font-semibold text-white text-sm sm:text-base flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              {item.problem}
            </h3>
            <p className="text-sm text-white/60 mt-2 leading-relaxed">
              <strong className="text-white/80 font-medium">Why it happens:</strong> {item.cause}
            </p>
            <p className="text-sm text-white/75 mt-1.5 leading-relaxed">
              <strong className="text-white/90 font-medium">Fix:</strong> {item.fix}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

function DecisionBlock({ heading, intro, branches }: Extract<ToolSection, { kind: "decision" }>) {
  return (
    <>
      <SectionHeading tight={Boolean(intro)}>{heading}</SectionHeading>
      {intro && <SectionIntro>{intro}</SectionIntro>}
      <div className="space-y-3">
        {branches.map((b, i) => (
          <div key={i} className="glass rounded-xl p-4 sm:p-5">
            <h3 className="font-semibold text-white text-sm">{b.condition}</h3>
            <p className="text-sm text-white/70 mt-1.5 leading-relaxed flex items-start gap-2">
              <CornerDownRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>
                {b.recommendation}
                {b.href && (
                  <>
                    {" "}
                    <Link
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      to={b.href as any}
                      className="text-primary hover:underline font-medium whitespace-nowrap"
                    >
                      {b.linkLabel ?? "Open the tool"} →
                    </Link>
                  </>
                )}
              </span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

function DefinitionsBlock({
  heading,
  intro,
  terms,
}: Extract<ToolSection, { kind: "definitions" }>) {
  return (
    <>
      <SectionHeading tight={Boolean(intro)}>{heading}</SectionHeading>
      {intro && <SectionIntro>{intro}</SectionIntro>}
      <dl className="space-y-4">
        {terms.map((t, i) => (
          <div key={i} className="border-l-2 border-primary/40 pl-4">
            <dt className="font-semibold text-white text-sm">{t.term}</dt>
            <dd className="text-sm text-white/70 mt-1 leading-relaxed">{t.definition}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function FAQBlock({ heading, intro, faqs }: Extract<ToolSection, { kind: "faq" }>) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <>
      <SectionHeading tight={Boolean(intro)}>
        {heading ?? "Frequently Asked Questions"}
      </SectionHeading>
      {intro && <SectionIntro>{intro}</SectionIntro>}
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <FAQAccordionItem
            key={i}
            question={faq.question}
            answer={faq.answer}
            isOpen={openFaq === i}
            onToggle={() => setOpenFaq(openFaq === i ? null : i)}
          />
        ))}
      </div>
    </>
  );
}

function ToolLinksBlock({ heading, intro, tools }: Extract<ToolSection, { kind: "toolLinks" }>) {
  return (
    <>
      <SectionHeading tight={Boolean(intro)}>{heading ?? "Related Tools"}</SectionHeading>
      {intro && <SectionIntro>{intro}</SectionIntro>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool, i) => (
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
    </>
  );
}

function ArticleLinksBlock({
  heading,
  intro,
  slugs,
}: Extract<ToolSection, { kind: "articleLinks" }>) {
  const relatedPosts = ALL_BLOG_POSTS.filter((p) => slugs.includes(p.slug));
  if (relatedPosts.length === 0) return null;

  return (
    <>
      <SectionHeading tight={Boolean(intro)}>{heading ?? "Learn More"}</SectionHeading>
      {intro && <SectionIntro>{intro}</SectionIntro>}
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
                  backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
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
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Dispatch                                                           */
/* ------------------------------------------------------------------ */

function SectionBody({ section }: { section: ToolSection }) {
  switch (section.kind) {
    case "prose":
      return <ProseBlock {...section} />;
    case "steps":
      return <StepsBlock {...section} />;
    case "cards":
      return <CardsBlock {...section} />;
    case "checklist":
      return <ChecklistBlock {...section} />;
    case "callout":
      return <CalloutBlock {...section} />;
    case "specTable":
      return <SpecTableBlock {...section} />;
    case "comparison":
      return <ComparisonBlock {...section} />;
    case "matrix":
      return <MatrixBlock {...section} />;
    case "troubleshooting":
      return <TroubleshootingBlock {...section} />;
    case "decision":
      return <DecisionBlock {...section} />;
    case "definitions":
      return <DefinitionsBlock {...section} />;
    case "faq":
      return <FAQBlock {...section} />;
    case "toolLinks":
      return <ToolLinksBlock {...section} />;
    case "articleLinks":
      return <ArticleLinksBlock {...section} />;
  }
}

/** Blocks that render nothing when empty should not leave an empty shell behind. */
function isEmptySection(section: ToolSection): boolean {
  switch (section.kind) {
    case "toolLinks":
      return section.tools.length === 0;
    case "articleLinks":
      return !ALL_BLOG_POSTS.some((p) => section.slugs.includes(p.slug));
    default:
      return false;
  }
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

interface ToolContentSectionsProps {
  /** Ordered, per-page section list. Preferred. */
  sections?: ToolSection[];
  /** @deprecated Legacy fixed-shape content; expanded via {@link legacySectionsFrom}. */
  data?: ToolContentData;
}

export default function ToolContentSections({ sections, data }: ToolContentSectionsProps) {
  const resolved = sections ?? (data ? legacySectionsFrom(data) : []);
  const visible = resolved.filter((s) => !isEmptySection(s));

  return (
    <div className="space-y-6 sm:space-y-8 mt-10 sm:mt-14">
      {visible.map((section, i) => (
        <SectionShell key={i} delay={i === 0 ? 0 : 0.05}>
          <SectionBody section={section} />
        </SectionShell>
      ))}
    </div>
  );
}
