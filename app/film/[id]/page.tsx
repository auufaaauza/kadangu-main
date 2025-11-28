import FilmDetailPage from "@/components/pages/filmDetail";

export type FilmDetailProps = {
    params: Promise<{ id: string }>;
};

export default async function FilmDetail({ params }: FilmDetailProps) {
    const { id } = await params
    return (
        <FilmDetailPage id={id} />
    )
}
