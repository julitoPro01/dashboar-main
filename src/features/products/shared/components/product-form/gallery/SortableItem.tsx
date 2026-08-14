import { Button } from '@/src/shared/components/btn';
import { FiEdit2 } from 'react-icons/fi';
import { BiMove, BiStar, BiTrash } from 'react-icons/bi';
import { useSortableNode } from '@/src/shared/sortable';

interface Props {
  index:number;
  id: number;
  children: React.ReactElement;
  order: number;
  isMain: boolean
}
export const SortableItem = ({index, id, children, order, isMain }: Props) => {

  const { ref,handleRef,isDragging } = useSortableNode({id, index})



  return (
    <article className={`${isDragging ? " opacity-50":"opacity-100"} group relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface-light`}
      ref={ref}
    >

      {children}

      {/* Overlay */}
      <div className="absolute inset-0 w-full pb-4 flex items-end justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">

        <Button variant="tabLight" select="tabLight" size="xs">
          <FiEdit2 size={18} className="text-white" />
        </Button>

        <Button variant="tabLight" size="xs" >
          <BiStar size={18} className="text-white" />
        </Button>

        <Button variant="tabLight" size="xs">
          <BiTrash size={18} className="text-white" />
        </Button>
      </div>
      {/* Order */}
      <span className="absolute top-2 flex h-7 items-center justify-center ">

        <div className={`pr-4 py-1 text-xs ${isMain && "rounded-r-full bg-primary  font-semibold text-text-inverse shadow-card"}`}>
          <span className="bg-surface text-text px-2 py-1 mx-1 rounded-full" >{order}</span>
          {isMain && "Principal"}
        </div>
      </span>
      {/* Drag */}
      <button className="absolute right-2 top-2 rounded-lg hover:bg-black/40 p-1 text-white opacity-0 backdrop-blur transition group-hover:opacity-100 cursor-pointer"
        type='button'
        ref={handleRef}
      >

        <BiMove size={28} />

      </button>
    </article>
  )
}
