import axios from "axios";

const apiUrl = `${process.env.REACT_APP_API_BACKEND_URL}/admin/directors`;

const createDirector = async (formData: FormData) => {
    try {
        const response = await axios.post(`${apiUrl}/save`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating director", error);
        throw error;
    }
};

const fetchDirectorById = async (id: any) => {
    try {
        const response = await axios.get(`${apiUrl}/fetchbyid/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching director by ID", error);
        throw error;
    }
}

const fetchDirectorsByCompanyId = async (companyId: any) => {
    try {
        const response = await axios.get(`${apiUrl}/company/${companyId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching directors by company ID", error);
        throw error;
    }
};

const updateDirector = async (id: any, formData: FormData) => {
    try {
        const response = await axios.put(`${apiUrl}/update/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating director", error);
        throw error;
    }
};
 
const deleteDirector = async (id: number) => {
    try {
        const response = await axios.delete(`${apiUrl}/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting director", error);
        throw error;
    }
};

export default {
    createDirector,
    fetchDirectorById,
    fetchDirectorsByCompanyId,
    updateDirector,
    deleteDirector,
};