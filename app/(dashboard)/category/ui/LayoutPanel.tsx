"use client";

import { LoadingBar } from '@/src/components';
import { sleep } from '@/src/utils';
import { useEffect, useState } from 'react';

import {
    Group,
    Panel,
    Separator
} from "react-resizable-panels";


interface Props {
    main_categories: React.ReactNode;
    sub_categories: React.ReactNode;
    children: React.ReactNode;
}

export const LayoutPanel = ({ main_categories, sub_categories, children }: Props) => {

    const [loading, setLoaded] = useState(true);

    const Loading = async () => {
        await sleep(1000)
        setLoaded(false);
    }

    useEffect(() => {

        Loading()

    }, [])


    if (loading) return <LoadingBar loading={loading} />

    return (
        <Group autoSave='Category' orientation="horizontal" className=' h-full' >
            <Panel defaultSize={"25%"} maxSize={"75%"} minSize={"15%"} >
                {main_categories}
            </Panel>
            <Separator className="w-2  hover:bg-gray-400 bg-gray-200  " />
            <Panel >
                <div className="w-full h-full flex flex-col items-start">
                    <Group orientation="vertical" autoSave="SubCategory" className='h-full w-full'>
                        <Panel defaultSize={"50"} maxSize={"75"} minSize={"15"} >
                            <div className="w-full h-full  overflow-auto scrollbar-thin">
                                {sub_categories}
                            </div>
                        </Panel>
                        <Separator className="h-2 hover:bg-gray-400 bg-gray-200 "
                        />
                        <Panel >
                            <div className="w-full h-full overflow-auto scrollbar-thin bg-white">
                                {children}
                            </div>
                        </Panel>
                    </Group>
                </div>
            </Panel>
        </Group>)
}
