import { getCategoryDetails } from "@/src/action/category";
import { AttributeConfig, Header, Metrics, Summary } from "@/src/features/category/details";
import { ErrorServer } from "@/src/shared/components/error";

interface Props { params: { publicId: string } };

export default async function DetailsPage({ params }: Props) {

    const { publicId } = await params;

    const res = await getCategoryDetails(publicId);

    if (!res.ok)
        return <div className="py-8">
            <ErrorServer Title="No se pudieron cargar los datos requeridos. Intenta nuevamente más tarde." onAction={true} />
        </div>

    const data = res.data!;
    return (
        <div className="bg-background py-6">
            {/* Header */}
            {/* ---------- */}
            <Header name={data.name} />

            <div className="grid grid-cols-12 gap-4">
                <Summary
                    name={data.name} description={data.description}
                    imageUrl={data.imageUrl} recordStatus={data.recordStatus}
                    slug={data.slug} level={data.level}
                    createdAt={data.createdAt} updatedAt={data.updatedAt} />
                {/* Resumen */}

                {/* Métricas */}
                <Metrics productsCount={data.productsCount} childCategoriesCount={data.childCategoriesCount}
                attributeCount={data.attributeCount}
                />

                {/* Configuración de atributos */}
                <AttributeConfig  attributes={data.attributes} paths={data.paths} categoryId={data.id} />

            </div>
        </div>
    );
}
