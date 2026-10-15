import { VariantListItemResponse } from "../types";
import { ListVariant } from "./ListVariant";

interface Props {
    variants: VariantListItemResponse[];
}

export const ListVariants = ({ variants }: Props) => <ListVariant variants={variants} />;
