import MainLayout from "../../../components/layout/MainLayout";
import PostDetail from "../../../components/posts/PostDetail";
import { Suspense } from "react";
import { PostDetailSkeleton } from "../../../components/content/LoadingStates";

interface PostPageProps {
  params: {
    id: string;
  };
}

export default function PostPage({ params }: PostPageProps) {
  return (
    <MainLayout>
      <Suspense fallback={<PostDetailSkeleton />}>
        <PostDetail postId={params.id} />
      </Suspense>
    </MainLayout>
  );
} 