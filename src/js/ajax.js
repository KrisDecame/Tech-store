export const xhrFunction = async (link) => {
    const data = await (await fetch(link)).json();
    return data;
}
