import { Document } from "../common/types";
import { IMicroAppsObj } from "../types/microAppObj";

const handleFetchError = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP ${response.status}: ${response.statusText}. Details: ${errorText}`
    );
  }
  return response.json();
};

export const getAllDocuments = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/documents`);
    return await handleFetchError(response);
  } catch (error) {
    console.error("Error fetching all documents:", error);
    throw error; // Re-throw the error for further handling
  }
};

export const getSingleDocument = async (documentUid: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/documents/${documentUid}`
    );
    return await handleFetchError(response);
  } catch (error) {
    console.error(`Error fetching document with UID ${documentUid}:`, error);
    throw error;
  }
};

export const postDocument = async (document: Document) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/documents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(document),
    });
    return await handleFetchError(response);
  } catch (error) {
    console.error("Error posting new document:", error);
    throw error;
  }
};

export const putDocument = async (documentUid: string, document: Document) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/documents/${documentUid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(document),
      }
    );
    return await handleFetchError(response);
  } catch (error) {
    console.error(`Error updating document with UID ${documentUid}:`, error);
    throw error;
  }
};

export const fetchStacks = async (microAppsObj: IMicroAppsObj) => {
  console.log("microAppsObj in fetchStacks", microAppsObj);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_STACK_API_URL}`,
      {
        method: "GET",
        headers: {
          authtoken: microAppsObj.currentUser.authtoken,
          organization_uid: microAppsObj.currentOrganization.uid,
        },
      }
    );
    return await handleFetchError(response);
  } catch (error) {
    console.error("Error fetching stacks:", error);
    throw error;
  }
};
