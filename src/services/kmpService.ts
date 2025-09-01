import axios from "axios";

const apiUrl = `${process.env.REACT_APP_API_BACKEND_URL}/admin/kmp`;

const createKmp = async (formData: FormData) => {
    try {
        const response = await axios.post(`${apiUrl}/save`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating KMP", error);
        throw error;
    }
};

const fetchKmpById = async (id: any) => {
    try {
        const response = await axios.get(`${apiUrl}/fetchbyid/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching KMP by ID", error);
        throw error;
    }
}

const fetchKmpByCompanyId = async (companyId: any) => {
    try {
        const response = await axios.get(`${apiUrl}/company/${companyId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching KMP by company ID", error);
        throw error;
    }
};

const updateKmp = async (id: any, formData: FormData) => {
    try {
        const response = await axios.put(`${apiUrl}/update/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating KMP", error);
        throw error;
    }
};

const deleteKmp = async (id: number) => {
    try {
        const response = await axios.delete(`${apiUrl}/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting KMP", error);
        throw error;
    }
};

export default{
    createKmp,
    fetchKmpById,
    fetchKmpByCompanyId,
    updateKmp,
    deleteKmp
}