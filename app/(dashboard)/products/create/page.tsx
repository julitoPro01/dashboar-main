import { CreateProduct } from '@/src/features/products/create';
import { BackTo } from '@/src/shared/components/btn';
import { APP_ROUTES } from '@/src/shared/routes';

export default async function ProductPage() {

    return (
        <div className='pt-6 pb-20 relative'>
            <div className="pb-10 relative">

                <BackTo fallbackTo={APP_ROUTES.PRODUCTS.INDEX} label='Volver a productos' />

                <div className=' flex flex-col md:flex-row md:items-end justify-between gap-4'>

                    <div>
                        <h1 className="text-3xl text-text font-black tracking-tight">
                            Nuevo producto
                        </h1>
                        <p className="mt-2 text-text-muted">Agregue información detallada, categorías y medios para su nuevo artículo del catálogo.</p>
                    </div>
                    <div className='flex whitespace-nowrap'>
                        <div className={`flex items-center gap-2 border border-amber-500/50 text-amber-500 px-3 py-1.5 rounded-full text-xs font-bold uppercase`}>
                            <span className="size-2 rounded-full bg-amber-600"></span>
                            Estado: Borrador
                        </div>
                        
                    </div>
                </div>
 
            </div>
            
            <CreateProduct/>

        </div>
    );
}