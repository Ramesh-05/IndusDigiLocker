import axios from "axios";

const apiUrl = `${process.env.REACT_APP_API_BACKEND_URL}/admin/incometax`;

const getAllIncomeTax = async () => {
  try {
    const response = await axios.get(`${apiUrl}/fetchall`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all income tax", error);
    throw error;
  }
};

const createIncomeTax = async (formData: FormData) => {
  console.log("FormData in createIncomeTax:", formData);
  
  try {
    const response = await axios.post(`${apiUrl}/save`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating income tax", error);
    throw error;
  }
};

const fetchIncomeTaxById = async (id : any) => {
  try {
    const response = await axios.get(`${apiUrl}/fetchbyid/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching income tax by ID", error);
    throw error;
  }
}

const fetchIncomeTaxByCompanyId = async (companyId : any) => {
  try {
    const response = await axios.get(`${apiUrl}/company/${companyId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching income tax by company ID", error);
    throw error;
  }
}

const deleteIncomeTax = async (id : any) => {
  try {
    const response = await axios.delete(`${apiUrl}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting income tax", error);
    throw error;
  }
}

const updateIncomeTax = async ( id : any, formData: any) => {
  try {
    const response = await axios.put(`${apiUrl}/update/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating income tax", error);
    throw error;
  }
}

const decrypt = async (id : any) => {
  try {
    const response = await axios.get(`${apiUrl}/decrypt/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error decrypting income tax", error);
    throw error;
  }
}


export default {
  getAllIncomeTax,
  createIncomeTax,
  fetchIncomeTaxById,
  fetchIncomeTaxByCompanyId,
  deleteIncomeTax,
  updateIncomeTax,
    decrypt
};