/**
 * pag = pagination
 * fil = filters
 */
export const QUERY_KEYS = {
    suppliers:{
        all:["suppliers"] as const,
        list:(pag:Object,fil:Object)=>[...QUERY_KEYS.suppliers.all,'list',pag,fil] as const
    },
    attributes:{
        all:['attributes'] as const,
        listCatgBase:['attributes','listCatg'] as const,
        list:(pag:Object,fil:Object)=> [...QUERY_KEYS.attributes.all,'list',pag,fil] as const,
        listCatg:(pag?:Object,fil?:Object)=> [...QUERY_KEYS.attributes.listCatgBase,pag,fil] as const,
    },
    categories: {
        all: ['categories'] as const,
        list: (pag:Object, fil: Object) => [...QUERY_KEYS.categories.all, 'list',pag, fil] as const,
        listTree: (path?: string) => [...QUERY_KEYS.categories.all, 'tree', path] as const,
        detail: (id: number) => [...QUERY_KEYS.categories.all, 'detail', id] as const,
        edit:(id?:number)=>[...QUERY_KEYS.categories.all,'edit',id] as const
    },
    products: {
        all: ['products'] as const,
        list:(pag:Object,fil:Object)=>[...QUERY_KEYS.products.all,'list',pag,fil] as const,
        detail: (id: string) => [...QUERY_KEYS.products.all, 'detail', id] as const,
    }
} as const;
