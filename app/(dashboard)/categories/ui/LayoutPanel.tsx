"use client";

import { Group, Panel, Separator } from "react-resizable-panels";


interface Props {
    main_categories: React.ReactNode;
    children: React.ReactNode;
}

export const LayoutPanel = ({ main_categories, children }: Props) => {


    return (
        <>
            <Group orientation="vertical" autoSave="SubCategory" className='h-full w-full'>
                <Panel defaultSize={"75"} maxSize={"80"} minSize={"15"} >
                    <Group autoSave='Category' orientation="horizontal" className=' h-full' >
                        <Panel defaultSize={"45%"} maxSize={"75%"} minSize={"20%"} >
                            {main_categories}
                        </Panel>
                        <Separator className="w-1.5 border-l border-border select-none hover:bg-primary-light/50  " />
                        <Panel >
                            {children}
                        </Panel>
                    </Group>
                </Panel>

                {/* <Separator className="h-1.5 border-t border-border hover:bg-primary-light/50 " />
                <Panel  >
                    <div className="w-full h-full overflow-auto scrollbar-thin">
                        {children}
                    </div>
                </Panel> */}
            </Group>

            {/* <Group autoSave='Category' orientation="horizontal" className=' h-full' >
                <Panel defaultSize={"45%"} maxSize={"75%"} minSize={"20%"} >
                    {main_categories}
                </Panel>
                <Separator className="w-1.5 hover:bg-primary-light/50 bg-primary/10 dark:bg-surface-overlay " />
                <Panel >
                    {sub_categories}
                </Panel>
                <Panel >
                <div className="w-full h-full flex flex-col items-start">
                <Group orientation="vertical" autoSave="SubCategory" className='h-full w-full'>
                <Panel defaultSize={"75"} maxSize={"80"} minSize={"15"} >
                <div className="w-full h-full  overflow-auto scrollbar-thin">
                {sub_categories}
                </div>
                </Panel>
                <Separator className="h-1.5 hover:bg-primary-light/50 bg-primary/10 dark:bg-surface-overlay " />
                <Panel  >
                <div className="w-full h-full overflow-auto scrollbar-thin">
                {children}
                </div>
                </Panel>
                </Group>
                </div>
                </Panel>
            </Group> */}
        </>
    )
}
