import { promises as fs } from "fs";
import path from "path";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";

import { notFound } from "next/navigation";

import { articles } from "@/lib/articleList";
import styles from "./page.module.css";

interface SubTitleValus {
  id: string;
  text: string;
}
type SubTitle =
  | { tag: "h2"; value: SubTitleValus }
  | { tag: "h3"; values: SubTitleValus[] };

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(
    process.cwd(),
    "public",
    "articles",
    slug,
    "page.md",
  );

  let content: string;

  try {
    content = await fs.readFile(filePath, "utf-8");
  } catch {
    return notFound();
  }

  const tree = unified().use(remarkParse).parse(content);

  const subtitles: SubTitle[] = [
    { tag: "h2", value: { id: "index-list", text: "目次" } },
  ];

  let h2Count = 0;
  let h3Count = 0;

  visit(tree, "heading", (node: any) => {
    const text = node.children
      .filter((c: any) => c.type === "text")
      .map((c: any) => c.value)
      .join("");

    if (node.depth === 2) {
      const id = `h2_subtitle-${h2Count++}`;
      subtitles.push({ tag: "h2", value: { id, text } });
    }

    if (node.depth === 3) {
      const id = `h3_subtitle-${h3Count++}`;
      const last = subtitles[subtitles.length - 1];

      if (last.tag === "h3") {
        last.values.push({ id, text });
      } else {
        subtitles.push({ tag: "h3", values: [{ id, text }] });
      }
    }
  });

  h2Count = 0;
  h3Count = 0;
  let indexListNum = 0;

  return (
    <div className={styles.root}>
      <h1>{articles.find((a) => a?.slug === slug)?.title}</h1>
      <hr className={styles.hr} />
      <h2 id="index-list" className={styles.sub_title_text}>
        目次
      </h2>
      <ol start={0}>
        {subtitles.map((v, i) => {
          if (v.tag === "h2") {
            return (
              <li key={i} value={indexListNum++}>
                <a className={styles.a} href={`#${v.value.id}`}>
                  {v.value.text}
                </a>
              </li>
            );
          } else {
            return (
              <li key={i} className={styles.no_number}>
                <ul>
                  {v.values.map((iv, ii) => {
                    return (
                      <li key={ii}>
                        <a className={styles.a} href={`#${iv.id}`}>
                          {iv.text}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          }
        })}
      </ol>
      <hr className={styles.hr} />

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ id, href, children }) => {
            if (
              href?.startsWith("#user-content-fn-") ||
              href?.startsWith("#user-content-fnref-")
            ) {
              const tag_id = href.slice(1);
              return (
                <a href={tag_id} className={styles.a} id={id}>
                  {children}
                </a>
              );
            }

            // 通常リンクはそのまま
            return (
              <a
                href={href}
                className={styles.a}
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          },

          h2: ({ children }) => {
            return (
              <>
                <h2
                  className={styles.sub_title_text}
                  id={`h2_subtitle-${h2Count++}`}
                >
                  {children}
                </h2>
                <hr className={styles.sub_title_hr} />
              </>
            );
          },

          h3: ({ children }) => {
            return (
              <>
                <h3
                  className={styles.lower_sub_title}
                  id={`h3_subtitle-${h3Count++}`}
                >
                  {children}
                </h3>
                <hr className={styles.lower_sub_title_hr} />
              </>
            );
          },

          strong: ({ children }) => {
            return <strong className={styles.strong}>{children}</strong>;
          },

          pre: ({ children }) => {
            return <pre className={styles.pre}>{children}</pre>;
          },

          img: ({ src, alt }) => {
            return (
              <>
                <img className={styles.img} src={src} alt={alt} />
                {alt && <figcaption>{alt}</figcaption>}
              </>
            );
          },

          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            let language = match?.[1];

            const isBlock =
              node?.position?.start?.line !== node?.position?.end?.line;

            if (!language) {
              language = "txt";
            }

            if (isBlock) {
              return (
                <div className="code_wrapper">
                  <div className={styles.lung_name}>{language}</div>
                  <SyntaxHighlighter
                    style={oneDark}
                    language={language}
                    PreTag="div"
                    codeTagProps={{
                      style: { fontFamily: "var(--font-code)" },
                    }}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              );
            }

            return (
              <code className={styles.code_inline} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
