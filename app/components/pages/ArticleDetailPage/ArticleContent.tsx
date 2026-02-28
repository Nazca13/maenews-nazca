interface ArticleContentProps {
  htmlContent: string;
}

export function ArticleContent({ htmlContent }: ArticleContentProps) {
  return (
    <div 
      className="prose prose-lg max-w-none 
        prose-headings:font-black prose-headings:italic prose-headings:uppercase prose-headings:tracking-tighter
        prose-p:text-gray-700 prose-p:leading-relaxed
        prose-blockquote:border-l-primary prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-img:rounded-3xl shadow-sm"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}