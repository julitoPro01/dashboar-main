interface SearchCategoryTreesProps {
    search: string;
    inStatus?: RecordStatusDb[];
    notInStatus?: RecordStatusDb[];
}

export const searchCategoryTrees = async (props: SearchCategoryTreesProps) => {

    const statusFilter: Prisma.CategoryWhereInput = props.inStatus
        ? {
            recordStatus: {
                name: {
                    in: props.inStatus
                }
            }
        }
        : props.notInStatus
            ? {
                recordStatus: {
                    name: {
                        notIn: props.notInStatus
                    }
                }
            }
            : {};

    return PromiseReturn<CategoryTreeResponse[]>(async () => {

        // 1. Buscar coincidencias
        const matches = await prisma.category.findMany({
            where: {
                AND: [
                    {
                        name: {
                            contains: props.search,
                            mode: "insensitive"
                        }
                    },
                    statusFilter
                ]
            },
            select: {
                id: true,
                path: true
            }
        });

        if (!matches.length)
            return ApiResponse.success("Sin resultados.", []);

        // 2. Obtener ids de ancestros
        const ancestorIds = new Set<number>();

        for (const item of matches) {

            item.path
                .split("/")
                .filter(Boolean)
                .map(Number)
                .forEach(id => ancestorIds.add(id));

        }

        // 3. Obtener todos los nodos necesarios
        const categories = await prisma.category.findMany({
            where: {
                AND: [
                    statusFilter,
                    {
                        OR: [
                            {
                                id: {
                                    in: [...ancestorIds]
                                }
                            },
                            ...matches.map(item => ({
                                path: {
                                    startsWith: item.path
                                }
                            }))
                        ]
                    }
                ]
            },
            select: {
                id: true,
                publicId: true,
                name: true,
                recordStatus: {
                    select: {
                        name: true
                    }
                },
                parentId: true,
                path: true,
                level: true,
                _count: {
                    select: {
                        categoryAttributes: true
                    }
                }
            },
            orderBy: {
                level: "asc"
            }
        });

        const tree = buildCategoryTrees<CategoryTreeResponse>(categories);

        return ApiResponse.success(
            "Consulta exitosa.",
            tree
        );

    });

};