import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";

interface IBlog {
  title: string;
  date: string;
  markdown: string;
}

const BlogPost = () => {
  const blog : IBlog = {
    title: "In imperdiet augue orci. Nullam suscipit, massa vitae imperdiet tristique",
    date: "September 3, 2024",
    markdown: `
# Header 1

## Header 2

### Header 3

Before diving deep lets list down goal of this article:

- İlk madde
- İkinci madde
- Üçüncü madde

### Kod Bloğu

\`\`\`javascript
// JavaScript kod bloğu
function helloWorld() {
  console.log("Merhaba, Dünya!");
}
\`\`\`
`
  }
  return (
    <div className="py-12">
      <div className="flex flex-col gap-3">
        <h1 className="text-xl dark:text-dark-secondary text-light-secondary">{blog.title}</h1>
        <p className="text-sm dark:text-dark-quaternary text-light-quaternary">{blog.date}</p>
      </div>
      <div className="markdown">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {blog.markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogPost;
