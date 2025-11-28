import WorkshopDetailPage from "@/components/pages/workshopDetail";

export type WorkshopDetailProps = {
    params: Promise<{ id: string }>;
};

export default async function WorkshopDetail({ params }: WorkshopDetailProps) {
    const { id } = await params
    return (
        <WorkshopDetailPage id={id} />
    )
}
