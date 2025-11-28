import LiteratureDetailPage from "@/components/pages/literatureDetail";

export type LiteratureDetailProps = {
    params: Promise<{ id: string }>;
};

export default async function LiteratureDetail({ params }: LiteratureDetailProps) {
    const { id } = await params
    return (
        <LiteratureDetailPage id={id} />
    )
}
