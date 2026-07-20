"use client";
import { PAGINATION_STORAGE_KEYS } from "../table";


//TODO: Para usar, se debe de inicializar el localStorage con la version.
//TODO: agregar mas tipo de llaves
type Init =
    | { type: "PAGINATION", key: keyof typeof PAGINATION_STORAGE_KEYS, value: number }
    | { type: "ANY_KEY", key: string, value: any }

export const setInitWithVersionStorage = ({ type, key, value }: Init) => {

    let versionKey = `${key + type}_VS`;
    localStorage.setItem(versionKey, JSON.stringify(value));

}
type Set =
    | { type: "PAGINATION", key: keyof typeof PAGINATION_STORAGE_KEYS, value: object }
    | { type: "ANY_KEY", key: string, value: any }
//TODO: 2 - Agregar con version al setStorage.
export const setWithVersionStorage = ({ type, key, value }: Set) => {

    let versionKey = `${key + type}_VS`;

    const vertionStorage = localStorage.getItem(versionKey);
    if (vertionStorage) {

        const version = JSON.parse(vertionStorage);
        // value
        localStorage.setItem(key + type, JSON.stringify({ value, version: version + 1 }));
        // version
        localStorage.setItem(versionKey, JSON.stringify(version + 1));

    }
}

//TODO: 3 - consultas con la version.
type PropsGet =
    | { type: "PAGINATION", key: keyof typeof PAGINATION_STORAGE_KEYS }
    | { type: "ANY_KEY", key: string }

export const getWithVersionStorage = ({ type, key }: PropsGet) => {

    let versionKey = `${key + type}_VS`;

    const vertionStorage = localStorage.getItem(versionKey);
    const dataStorage = localStorage.getItem(key + type);

    if (vertionStorage && dataStorage) {

        const version = JSON.parse(vertionStorage);
        const data = JSON.parse(dataStorage);

        if (data?.version === version && data?.value && typeof data.value === "object") {
            return data.value;
        } else return null;

    } else return null;

}

