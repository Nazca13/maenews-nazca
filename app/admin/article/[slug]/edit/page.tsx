import { ArticleEditorPage } from "@/app/components/pages/admin/article/ArticleEditorPage";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticleEditorPage slug={slug} />;
}
