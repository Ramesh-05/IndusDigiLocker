import axios from 'axios';

const apiUrl = `${process.env.REACT_APP_API_BACKEND_URL}/admin/esi`;

const createEsi = async (formData: FormData) => {
    try {
        const response = await axios.post(`${apiUrl}/save`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating esi', error);
        throw error;
    }
}

const fetchEsiById = async (id: any) => {
    try {
        const response = await axios.get(`${apiUrl}/fetchbyid/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching esi by ID', error);
        throw error;
    }
}

const fetchEsiByCompanyId = async (companyId: any) => {
    try {
        const response = await axios.get(`${apiUrl}/company/${companyId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching esi by company ID', error);
        throw error;
    }
}

const updateEsi = async (id: any, formData: any) => {
    try {
        const response = await axios.put(`${apiUrl}/update/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating esi', error);
        throw error;
    }
}

const deleteEsi = async (id: any) => {
    try {
        const response = await axios.delete(`${apiUrl}/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting esi', error);
        throw error;
    }
}

const decryptEsi = async (id: any) => {
    try {
        const response = await axios.get(`${apiUrl}/decrypt/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error decrypting esi', error);
        throw error;
    }
}

export default {
    createEsi,
    fetchEsiById,
    fetchEsiByCompanyId,
    updateEsi,
    deleteEsi,
    decryptEsi,
};