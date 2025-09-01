import axios from "axios";

const apiUrl = `${process.env.REACT_APP_API_BACKEND_URL}/admin/mca`;

// ✅ Fetch all mcas
const getAllMcas = async () => {
  try {
    const response = await axios.get(`${apiUrl}/fetchall`,
      {
        headers: { 
          Authorization:`Bearer ${localStorage.getItem("token")}`   },
        }
    );
    return response.data;
    } catch (error) {
    console.error("Error fetching all mcas", error);
    throw error;    }
};

// ✅ Create a new mca
const createMca = async (formData: FormData) => {
  try {
    const response = await axios.post(`${apiUrl}/save`, formData, {
      headers: { 
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating mca", error);
    throw error;
  }
};

// ✅ Fetch mca by ID
const fetchMcaById = async (id: any) => {
  try {
    const response = await axios.get(`${apiUrl}/fetchbyid/${id}`,
      {
        headers: { 
          Authorization:`Bearer ${localStorage.getItem("token")}`
   },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching mca by ID", error);
    throw error;
  }
};

// ✅ Fetch mcas by Company ID
const fetchMcaByCompanyId = async (companyId: any) => {
  try {
    const response = await axios.get(`${apiUrl}/company/${companyId}`,
      {
        headers: { 
          Authorization:`Bearer ${localStorage.getItem("token")}`
   },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching mca by Company ID", error);
    throw error;
  }
};

// ✅ Update mca by ID
const updateMca = async (id: any, formData: any) => {
  try {
    const response = await axios.put(`${apiUrl}/update/${id}`, formData, {
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating mca", error);
    throw error;
  }
};

// ✅ Delete mca by ID
const deleteMca = async (id: any) => {
  try {
    const response = await axios.delete(`${apiUrl}/delete/${id}`, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;   
    } catch (error) {
    console.error("Error deleting mca", error);
    throw error;
    }
}

// ✅ Decrypt v2 password
const decrypt = async (id: any) => {
  try {
    const response = await axios.get(`${apiUrl}/decrypt/V2Password/${id}`, { 
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
    } catch (error) {
    console.error("Error decrypting v2 password", error);
    throw error;
    }
}

// ✅ Decrypt v3 password
const decryptTP = async (id: any) => {
  try {
    const response = await axios.get(`${apiUrl}/decrypt/V3Password/${id}`, { 
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
    } catch (error) {
    console.error("Error decrypting v3 password", error);
    throw error;
    }
}

export default {
  getAllMcas,
  createMca,
  fetchMcaById,
  fetchMcaByCompanyId,
  updateMca,
  deleteMca,
  decrypt,
  decryptTP,
};