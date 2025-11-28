import NewsDetailPage from "@/components/pages/newsDetail";

export type NewsDetailProps = {
    params: Promise<{ id: string }>;
};

export default async function NewsDetail({ params }: NewsDetailProps) {
    const { id } = await params
    return (
        <NewsDetailPage id={id} />
    )
}