import CultureDetailPage from "@/components/pages/cultureDetail";

export type CultureDetailProps = {
    params: Promise<{ id: string }>;
};

export default async function CultureDetail({ params }: CultureDetailProps) {
    const { id } = await params
    return (
        <CultureDetailPage id={id} />
    )
}
