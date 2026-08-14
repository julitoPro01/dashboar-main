export type CatgTreeSelectorPath = { id: number, name: string };

export type CatgTreeSelectorSelect = { id: number, path:string, isParent: boolean, name: string };

export type CatgTreeSelectorSelected = {
    id: number;
    name: string;
    isParent: boolean;
    paths: CatgTreeSelectorPath[];
    path:string;
}