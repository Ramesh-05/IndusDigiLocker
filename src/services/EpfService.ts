import axios from 'axios';

const apiUrl = `${process.env.REACT_APP_API_BACKEND_URL}/admin/epf`;

const createEpf = async (formData: FormData) => {
    try {
        const response = await axios.post(`${apiUrl}/save`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating epf', error);
        throw error;
    }
}

const fetchEpfById = async (id: any) => {
    try {
        const response = await axios.get(`${apiUrl}/fetchbyid/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching epf by ID', error);
        throw error;
    }
}

const fetchEpfByCompanyId = async (companyId: any) => {
    try {
        const response = await axios.get(`${apiUrl}/company/${companyId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching epf by company ID', error);
        throw error;
    }
}

const updateEpf = async (id: any, formData: any) => {
    try {
        const response = await axios.put(`${apiUrl}/update/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating epf', error);
        throw error;
    }
}

const deleteEpf = async (id: any) => {
    try {
        const response = await axios.delete(`${apiUrl}/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting epf', error);
        throw error;
    }
}

const decrypt = async (id: any) => {
    try {
        const response = await axios.get(`${apiUrl}/decrypt/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error decrypting epf', error);
        throw error;
    }
}

export default{
    createEpf,
  fetchEpfById,
  fetchEpfByCompanyId,
  updateEpf,
  deleteEpf,
  decrypt,
}