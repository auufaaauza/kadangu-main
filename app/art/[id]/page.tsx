import ArtDetailPage from "@/components/pages/artDetail";

export type ArtDetailProps = {
    params: Promise<{ id: string }>;
};

export default async function ArtDetail({ params }: ArtDetailProps) {
    const { id } = await params
    return (
        <ArtDetailPage id={id} />
    )
}
