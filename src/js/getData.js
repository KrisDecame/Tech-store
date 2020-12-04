import { xhrFunction } from "./ajax.js";

export const getData = async () => {
    const data = await xhrFunction('/src/assets/items.json');
    return data;
}
