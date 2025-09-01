import React, { useEffect, useState } from "react";
import { useParams, data } from 'react-router-dom';
import companyService from "../services/companyService";
import ViewDetails from "../components/ViewDetails";

const ViewCompany: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Record<string, any>>({});
  const [imageUrl, setImageUrl] = useState<string>("");

    
  useEffect(() => {
    if (id) {
      companyService.fetchOrganizationById(id).then((data) => {
        setCompany(data.data);
        console.log(data.data);
        setImageUrl(`${process.env.REACT_APP_RESOURCE_IMAGE_URL}${data.data.image}`);
      })
      .catch((error) => {
        console.error("Error fetching company:", error.response?.data || error.message);
      });
    }
  }, [id]);

  return (
    <ViewDetails
      title="View Company Details"
      fields={[
        { label: "Company Code", key: "companyCode" },
        { label: "Corporate Identification Number", key: "cin" },
        { label: "Company Name", key: "companyname" },
        { label: "Registration Number", key: "registerNo" },
        { label: "Date of Incorporation", key: "dateOfIncorporation" },
        { label: "Email ID", key: "email" },
        { label: "Telephone Number", key: "telephoneNo" },
        { label: "Phone Number", key: "phoneNo" },
        { label: "Address", key: "address" },
        { label: "City", key: "city" },
        { label: "State", key: "state" },
        { label: "Pincode", key: "pincode" },
        { label: "Fax Number", key: "faxNo" },
        { label: "Website", key: "website" },
      ]}
      data={company}
      imageUrl={imageUrl}
      backLink="/orglist"
    />
  );
};

export default ViewCompany;
