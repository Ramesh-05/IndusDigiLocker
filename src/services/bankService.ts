import axios from "axios";

const apiUrl = `${process.env.REACT_APP_API_BACKEND_URL}/admin/banks`;

// ✅ Fetch all banks
const getAllBanks = async () => {
  try {
    const response = await axios.get(`${apiUrl}/fetchall`,
      {
        headers: { 
          Authorization:`Bearer ${localStorage.getItem("token")}`
   },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all banks", error);
    throw error;
  }
};

// ✅ Create a new bank
const createBank = async (formData: FormData) => {
  try {
    const response = await axios.post(`${apiUrl}/save`, formData, {
      headers: { 
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating bank", error);
    throw error;
  }
};

// ✅ Fetch bank by ID
const fetchBankById = async (id: any) => {
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
    console.error("Error fetching bank by ID", error);
    throw error;
  }
};

// ✅ Fetch banks by Company ID
const fetchBankByCompanyId = async (companyId: any) => {
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
    console.error("Error fetching banks by company ID", error);
    throw error;
  }
};

// ✅ Update bank details
const updateBank = async (id: any, bank: any) => {
  try {
    const response = await axios.put(`${apiUrl}/update/${id}`, bank, {
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating bank", error);
    throw error;
  }
};

// ✅ Delete a bank
const deleteBank = async (id: number) => {
  try {
    const response = await axios.delete(`${apiUrl}/delete/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting bank", error);
    throw error;
  }
};

// ✅ Decrypt Login Password
const decrypt = async (id: number) => {
  try {
    const response = await axios.get(`${apiUrl}/decrypt/LoginPassword/${id}`, { responseType: "text",
        headers: { 
          Authorization:`Bearer ${localStorage.getItem("token")}`,
      }
     },
      
    );
    return response.data;
  } catch (error) {
    console.error("Error decrypting login password", error);
    throw error;
  }
};

// ✅ Decrypt Transaction Password
const decryptTP = async (id: number) => {
  try {
    const response = await axios.get(`${apiUrl}/decrypt/TransactionPassword/${id}`, { responseType: "text",
      headers: { 
        Authorization:`Bearer ${localStorage.getItem("token")}`,
    }
     });
    return response.data;
  } catch (error) {
    console.error("Error decrypting transaction password", error);
    throw error;
  }
};

export default {
  getAllBanks,
  createBank,
  fetchBankById,
  fetchBankByCompanyId,
  updateBank,
  deleteBank,
  decrypt,
  decryptTP,
};
