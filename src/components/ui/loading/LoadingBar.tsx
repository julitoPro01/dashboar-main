"use client";

interface Props {
    loading: boolean
}

export const LoadingBar = ({ loading }: Props) => {


    return (
        <>
            {loading && (
                <div className="absolute left-0 top-0 w-full h-[3] overflow-hidden">
                    <div className="h-full w-full bg-blue-500 animate-loading-bar" />
                </div>
            )}
        </>
    );
};
