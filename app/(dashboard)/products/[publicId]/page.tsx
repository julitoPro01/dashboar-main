
interface Props { params: Promise<{ publicId: string }> }

export default async function DetailsPage({ params }: Props) {

    const { publicId } = await params;

    return (
        <div>
            <h1>Hello Page {publicId}</h1>
        </div>
    );
}