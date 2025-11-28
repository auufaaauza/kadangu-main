import ShowDetailPage from "@/components/pages/showsDetail";

export type ShowDetailProps = {
    params: Promise<{ id: string }>;
};

export default async function ShowDetail({ params }: ShowDetailProps) {
    const { id } = await params
    return (
        <ShowDetailPage id={id} />
    )
}
