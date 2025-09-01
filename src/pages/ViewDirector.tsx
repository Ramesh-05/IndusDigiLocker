import React, { useEffect, useState } from 'react'
import directorService from '../services/directorService';
import { useParams } from 'react-router-dom';
import ViewDetails from '../components/ViewDetails';

const ViewDirector = () => {
    const {id} = useParams<{ id: string }>();
    const [director, setDirector] = useState<Record<string, any>>({});
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        if (id) {
            directorService.fetchDirectorById(id).then((data) => {
                setDirector(data.data);
                console.log(data.data);
                setImageUrl(`${process.env.REACT_APP_RESOURCE_IMAGE_URL}${data.data.image}`);
            })
            .catch((error) => {
                console.error("Error fetching director:", error.response?.data || error.message);
            });
        }
}, [id]);

  return (
    <ViewDetails
        title="View Director Details"
        fields={[
            { label: "Director Name", key: "name" },
            { label: "Designation", key: "designation" },
            { label: "DIN Number", key: "dinNo" },
            { label: "Email ID", key: "email" },
            { label: "Phone Number", key: "mobileNo" },
            { label: "Address", key: "address" },
            { label: "Aadhar Number", key: "aadharNo" },
            { label: "PAN Number", key: "panNo" },
            { label: "Passport Number", key: "passportNo" },
            { label: "Date of Appointment", key: "dateOfAppointment" },
            { label: "Date of Resignation", key: "dateOfExit" },
        ]}
        data={director}
        imageUrl={imageUrl}
        backLink="/directorlist"
    />
  )
}

export default ViewDirector
