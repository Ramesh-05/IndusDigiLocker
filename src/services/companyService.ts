import axios from "axios";

const apiUrl = process.env.REACT_APP_API_BACKEND_URL+"/admin/companies";

const getAllOrganizations = async () => {
  try {
    const response = await axios.get(`${apiUrl}/fetchall`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all organizations", error);
    throw error;
  }
};

const getCompByAdmin = async (adminId: any) => {
  try {
    const response = await axios.get(`${apiUrl}/admin/${adminId}`,
      {
        headers: { 
          Authorization:`Bearer ${localStorage.getItem("token")}`
   },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching companies by admin", error);
    throw error;
  }
};

const createCompany = async (formData: any) => {
  try {
    const response = await axios.post(`${apiUrl}/save`, formData, {
      headers: { "Content-Type": "multipart/form-data",
              Authorization:`Bearer ${localStorage.getItem("token")}`
       },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating company", error);
    throw error;
  }
};

const fetchOrganizationById = async (companyid: any) => {
  try {
    const response = await axios.get(`${apiUrl}/fetchbyid/${companyid}`,
      {
        headers: { 
          Authorization:`Bearer ${localStorage.getItem("token")}`
   },
  }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching organization by ID", error);
    throw error;
  }
};

const updateOrganization = async (id: any, org: any, logoFile: File | null) => {
  try {
    const formData = new FormData();

    
    if (logoFile) {
      formData.append("logoName", logoFile);
    }

    Object.keys(org).forEach((key) => {
      if (org[key] !== null && org[key] !== undefined) {
        formData.append(key, org[key]);
      }
    });

    formData.forEach((value, key) => console.log(`${key}:`, value));

    const response = await axios.put(`${apiUrl}/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error updating organization:", error);
    throw error;
  }
};




const deleteOrganization = async (companyId: any) => {
  try {
    const response = await axios.delete(`${apiUrl}/delete/${companyId}`,
      {
      headers: {
        Authorization:`Bearer ${localStorage.getItem("token")}`
      },
    }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting organization", error);
    throw error;
  }
};

const getCompaniesLogo = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching companies logo", error);
    throw error;
  }
};

export default {
  getAllOrganizations,
  getCompByAdmin,
  createCompany,
  fetchOrganizationById,
  updateOrganization,
  deleteOrganization,
  getCompaniesLogo,
};
