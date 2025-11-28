import TheaterDetailPage from "@/components/pages/theaterDetail";

export type TheaterDetailProps = {
    params: Promise<{ id: string }>;
};

export default async function TheaterDetail({ params }: TheaterDetailProps) {
    const { id } = await params
    return (
        <TheaterDetailPage id={id} />
    )
}
