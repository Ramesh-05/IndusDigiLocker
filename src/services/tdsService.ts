import axios from "axios";

const apiUrl = `${process.env.REACT_APP_API_BACKEND_URL}/admin/tds`;

// ✅ Fetch all tds
const getAllTds = async () => {
  try {
    const response = await axios.get(`${apiUrl}/fetchall`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all tds", error);
    throw error;
  }
};

// ✅ Create a new tds
const createTds = async (formData: FormData) => {
  try {
    const response = await axios.post(`${apiUrl}/save`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating tds", error);
    throw error;
  }
};

// ✅ Fetch tds by ID
const fetchTdsById = async (id: any) => {
  try {
    const response = await axios.get(`${apiUrl}/fetchbyid/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tds by ID", error);
    throw error;
  }
};

// ✅ Fetch tds by Company ID
const fetchTdsByCompanyId = async (companyId: any) => {
  try {
    const response = await axios.get(`${apiUrl}/company/${companyId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tds by company ID", error);
    throw error;
  }
};

// ✅ Delete tds by ID
const deleteTds = async (id: any) => {
  try {
    const response = await axios.delete(`${apiUrl}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting tds", error);
    throw error;
  }
};

const updateTds = async (id: any, formData: any) => {
  try {
    const response = await axios.put(`${apiUrl}/update/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating tds", error);
    throw error;
  }
};

const decrypt = async (id: any) => {
  try {
    const response = await axios.get(`${apiUrl}/decrypt/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error decrypting data", error);
    throw error;
  }
};

export default{
  getAllTds,
  createTds,
  fetchTdsById,
  fetchTdsByCompanyId,
  deleteTds,
  updateTds,
    decrypt,
};