import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import kmpService from '../services/kmpService';
import ViewDetails from '../components/ViewDetails';

const ViewKmp = () => {
  const {id} = useParams<{ id: string }>();
  const [kmp, setKmp] = useState<Record<string, any>>({});
  const [imageUrl, setImageUrl] = useState<string>("");
  const [resumeUrl, setResumeUrl] = useState<string>("");

  useEffect(() => {
    if (id) {
      kmpService.fetchKmpById(id).then((data) => {
        setKmp(data.data);
        console.log(data.data);
        setImageUrl(`${process.env.REACT_APP_RESOURCE_IMAGE_URL}${data.data.image}`);
        setResumeUrl(`${process.env.REACT_APP_RESOURCE_IMAGE_URL}${data.data.resume}`);
      })
      .catch((error) => {
        console.error("Error fetching KMP:", error.response?.data || error.message);
      });
    }
  }, [id]);

  return (
    <ViewDetails
        title="View KMP Details"
        fields={[
            { label: "KMP Name", key: "name" },
            { label: "Designation", key: "designation" },
            { label: "Email ID", key: "email" },
            { label: "Phone Number", key: "mobileNo" },
            { label: "Address", key: "address" },
            { label: "Aadhar Number", key: "aadharNo" },
            { label: "PAN Number", key: "panNo" },
            { label: "Passport Number", key: "passportNo" },
            { label: "State", key: "state" },
        ]}
        data={kmp}
        imageUrl={imageUrl}
        resumeUrl={resumeUrl}
        backLink="/kmplist"
    />
  )
}

export default ViewKmp;
