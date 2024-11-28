import { Document } from "../common/types";

export const postDocument = async (document: Document) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/documents`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(document),
    });

    return await response.json();
}

export const putDocument = async (documentUid: string, document: Document) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/documents/${documentUid}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(document),
    });

    return await response.json();
}