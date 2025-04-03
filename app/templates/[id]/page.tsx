import MainLayout from "../../../components/layout/MainLayout";
import TemplateDetail from "../../../components/templates/TemplateDetail";
import { Suspense } from "react";
import { PostDetailSkeleton } from "../../../components/content/LoadingStates";

interface TemplatePageProps {
  params: {
    id: string;
  };
}

export default function TemplatePage({ params }: TemplatePageProps) {
  return (
    <MainLayout>
      <Suspense fallback={<PostDetailSkeleton />}>
        <TemplateDetail templateId={params.id} />
      </Suspense>
    </MainLayout>
  );
} 