import axios from "axios";

const apiUrl = `${process.env.REACT_APP_API_BACKEND_URL}/admin/pt`;

const createPt = async (formData: FormData) => {
    try {
        const response = await axios.post(`${apiUrl}/save`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating pt", error);
        throw error;
    }
};

const fetchPtById = async (id: any) => {
    try {
        const response = await axios.get(`${apiUrl}/fetchbyid/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching pt by ID", error);
        throw error;
    }
}

const fetchPtByCompanyId = async (companyId: any) => {
    try {
        const response = await axios.get(`${apiUrl}/company/${companyId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching pt by company ID", error);
        throw error;
    }
};

const updatePt = async (id: any, formData: any) => {
    try {
        const response = await axios.put(`${apiUrl}/update/${id}`, formData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating pt", error);
        throw error;
    }
}

const deletePt = async (id: number) => {
    try {
        const response = await axios.delete(`${apiUrl}/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting pt", error);
        throw error;
    }
}

const decrypt = async (id: number) => {
    try {
        const response = await axios.get(`${apiUrl}/decrypt/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error decrypting password", error);
        throw error;
    }
}

export default {
    createPt,
    fetchPtById,
    fetchPtByCompanyId,
    updatePt,
    deletePt,
    decrypt,
};