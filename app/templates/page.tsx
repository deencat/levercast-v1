import MainLayout from "../../components/layout/MainLayout";
import TemplatesList from "../../components/templates/TemplatesList";
import { Suspense } from "react";
import { TemplatesSkeleton } from "../../components/content/LoadingStates";

export default function TemplatesPage() {
  return (
    <MainLayout>
      <Suspense fallback={<TemplatesSkeleton />}>
        <TemplatesList />
      </Suspense>
    </MainLayout>
  );
} 