import MusicDetailPage from "@/components/pages/musicDetail";

export type MusicDetailProps = {
    params: Promise<{ id: string }>;
};

export default async function MusicDetail({ params }: MusicDetailProps) {
    const { id } = await params
    return (
        <MusicDetailPage id={id} />
    )
}