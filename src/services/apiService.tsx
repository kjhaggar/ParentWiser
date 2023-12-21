import { encode as base64Encode } from "base-64";
const apiUrl = "https://crud-example-api.vercel.app";
const basicAuthToken = base64Encode("demo:demo");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Basic ${basicAuthToken}`,
};

export const fetchData = async () => {
  try {
    const response = await fetch(apiUrl + "/users", { headers });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const updateData = async (newData) => {
  try {
    const response = await fetch(`${apiUrl}/users/${newData.key}`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error("Failed to update data");
    }
    const updatedData = await response.json();
    return updatedData;
  } catch (error) {
    console.error("Error updating data:", error.message);
    throw error;
  }
};

export const addData = async (newData) => {
  try {
    const response = await fetch(`${apiUrl}/users`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error("Failed to update data");
    }
    const updatedData = await response.json();
    return updatedData;
  } catch (error) {
    console.error("Error updating data:", error.message);
    throw error;
  }
};

export const removeData = async (key: string) => {
  try {
    const response = await fetch(`${apiUrl}/users/${key}`, {
      method: "DELETE",
      headers: headers,
    });
    if (!response.ok) {
      throw new Error("Failed to update data");
    }
    const updatedData = await response.json();
    return updatedData;
  } catch (error) {
    console.error("Error updating data:", error.message);
    throw error;
  }
};
