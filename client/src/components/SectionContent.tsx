import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";

interface SectionContentProps {
  content: string;
}

export function SectionContent({ content }: SectionContentProps) {
  return (
    <div className="prose prose-slate max-w-none">
      <ReactMarkdown
        components={{
          // Style headers
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>
          ),
          // Style lists
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-4">{children}</ul>
          ),
          // Style blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic">
              {children}
            </blockquote>
          ),
          // Add syntax highlighting for code blocks
          //   code: ({ node, inline, className, children, ...props }) => {
          //     const match = /language-(\w+)/.exec(className || "");
          //     return !inline && match ? (
          //       <SyntaxHighlighter
          //         style={vs}
          //         language={match[1]}
          //         PreTag="div"
          //         className="rounded-md"
          //         {...props}
          //       >
          //         {String(children).replace(/\n$/, "")}
          //       </SyntaxHighlighter>
          //     ) : (
          //       <code className={className} {...props}>
          //         {children}
          //       </code>
          //     );
          //   },
          code: ({ children = [], className, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            return (
              <pre className="markdown-pre">
                {/** @ts-expect-error error */}
                <SyntaxHighlighter
                  language={match?.[1]}
                  showLineNumbers={true}
                  PreTag="div"
                  className="syntax-hight-wrapper"
                  {...props}
                  style={vs}
                >
                  {(children as string).trim()}
                </SyntaxHighlighter>
              </pre>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
