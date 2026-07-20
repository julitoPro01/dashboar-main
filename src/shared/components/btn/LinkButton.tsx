"use client";
import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "./Button"

type Props =
    | ({ routerType: "back" } & ButtonProps)
    | ({ routerType: "push"; href: string } & ButtonProps)
    | ({ routerType: "replace"; href: string } & ButtonProps);

export const LinkButton = ({
    children,
    routerType,
    ...rest
}: Props) => {
    const router = useRouter();

    const handleClick = () => {
        if (routerType === "back") {
            router.back();
            return;
        }

        router[routerType](rest.href!);
    };

    return (
        <Button  {...rest}
            onClick={handleClick}
        >
            {children}
        </Button>
    );
};