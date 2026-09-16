import { FiEdit2 } from 'react-icons/fi';
import { BiMove, BiStar, BiTrash } from 'react-icons/bi';
import { SortableCard } from '@/src/shared/sortable';
import { useSortable } from '@dnd-kit/react/sortable';
import { IMAGE_STYLE } from '@/src/shared/theme/image';
import { ChangeEvent } from 'react';
import { ImageFileBtn } from '@/src/shared/form';

interface Props {
    index: number;
    id: number | string;
    order: number;
    isMain: boolean;
    filePath: string;
    fileName: string;

    onPrimary: (i: number) => void;
    onUpdate: (e: ChangeEvent<HTMLInputElement>, i: number) => void;
    onDelete: (i: number) => void;
}
export const SortableImageCard = ({
    index, id, order, isMain, fileName, filePath,
    onDelete, onPrimary, onUpdate,
}: Props) => {

    const { ref, handleRef, isDragging } = useSortable({ id, index })

    return (

        <SortableCard className={`border border-border-input`}
            ref={ref} isDragging={isDragging}  >

            <img
                src={filePath}
                className={`${IMAGE_STYLE.img} transition duration-300 group-hover:scale-105`}
                alt={fileName}
            />


            {/* Overlay */}
            <div className="absolute inset-0 w-full pb-4 flex items-end justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">

                <ImageFileBtn onChange={(e) => onUpdate(e, index)}
                    className='p-2 hover:bg-black/50 rounded-full transition hover:scale-110'
                >
                    <FiEdit2 size={18} className="text-white" />
                </ImageFileBtn>

                <button onClick={() => onPrimary(index)}
                    className='p-2 hover:bg-black/50 rounded-full transition hover:scale-110'
                >
                    <BiStar size={18} className="text-white" />
                </button>

                <button onClick={() => onDelete(index)}
                    className='p-2 hover:bg-black/50 rounded-full transition hover:scale-110'
                >
                    <BiTrash size={18} className="text-white" />
                </button>
            </div>
            {/* Order, Main*/}
            <span className="absolute top-2 flex h-7 items-center justify-center ">

                <div className={`pr-4 py-1 text-xs ${isMain && "rounded-r-full bg-primary-light  font-semibold text-text-inverse shadow-card"}`}>
                    <span className="bg-surface text-text px-2 py-1 mx-1 rounded-full" >{order}</span>
                    {isMain && "Principal"}
                </div>
            </span>
            {/* Drag */}
            <button className="absolute right-2 top-2 rounded-lg hover:bg-black/40 p-1 text-white opacity-0 backdrop-blur transition group-hover:opacity-100 cursor-grab active:cursor-grabbing"
                type='button'
                ref={handleRef}
            >

                <BiMove size={28} />

            </button>
        </SortableCard>

    )
}
