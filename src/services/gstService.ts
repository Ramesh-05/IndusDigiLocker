import axios from "axios";

const apiUrl = `${process.env.REACT_APP_API_BACKEND_URL}/admin/gst`;

const createGst = async (formData: FormData) => {
  try {
    const response = await axios.post(`${apiUrl}/save`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating gst", error);
    throw error;
  }
};

const fetchGstById = async (id: any) => {
  try {
    const response = await axios.get(`${apiUrl}/fetchbyid/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching gst by ID", error);
    throw error;
  }
};

const fetchGstByCompanyId = async (companyId: any) => {
  try {
    const response = await axios.get(`${apiUrl}/company/${companyId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching gst by company ID", error);
    throw error;
  }
};

const updateGst = async (id: any, formData: any) => {
  try {
    const response = await axios.put(`${apiUrl}/update/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating gst", error);
    throw error;
  }
};

const deleteGst = async (id: any) => {
  try {
    const response = await axios.delete(`${apiUrl}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting gst", error);
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
        console.error("Error decrypting gst", error);
        throw error;
    }
};

export default {
  createGst,
  fetchGstById,
  fetchGstByCompanyId,
  updateGst,
  deleteGst,
  decrypt,
};