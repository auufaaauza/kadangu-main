import TariDetailPage from "@/components/pages/tariDetail";

export type TariDetailProps = {
    params: Promise<{ id: string }>;
};

export default async function TariDetail({ params }: TariDetailProps) {
    const { id } = await params
    return (
        <TariDetailPage id={id} />
    )
}
