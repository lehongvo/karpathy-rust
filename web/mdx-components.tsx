import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="mb-4 text-3xl font-bold" {...props} />,
    h2: (props) => <h2 className="mb-3 mt-8 text-xl font-semibold" {...props} />,
    h3: (props) => <h3 className="mb-2 mt-6 font-mono text-sm uppercase tracking-wider text-white/60" {...props} />,
    p: (props) => <p className="mb-4 leading-relaxed text-white/80" {...props} />,
    ul: (props) => <ul className="mb-4 list-disc space-y-1 pl-6 text-white/80" {...props} />,
    ol: (props) => <ol className="mb-4 list-decimal space-y-1 pl-6 text-white/80" {...props} />,
    code: (props) => <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-rust" {...props} />,
    a: (props) => <a className="text-rust underline-offset-4 hover:underline" {...props} />,
    blockquote: (props) => <blockquote className="my-4 border-l-2 border-rust/40 pl-4 italic text-white/60" {...props} />,
    ...components,
  };
}
