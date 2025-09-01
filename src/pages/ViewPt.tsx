import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ptService from '../services/ptService';
import ViewDetails from '../components/ViewDetails';

const ViewPt = () => {
    const { id } = useParams<{ id: string }>();
    const [pt, setPt] = useState<Record<string, any>>({});

    useEffect(() => {
        if (id) {
            ptService.fetchPtById(id).then((data) => {
                setPt(data.data);
            });
        }
    }, [id]);
    
  return (
    <ViewDetails
        title="View PT Details"
        fields={[
            { label: "PTIN Salary", key: "ptinSal" },
            { label: "Signatory", key: "signatory" },
            { label: "PTIN Company", key: "ptinCom" },
            { label: "Email", key: "email" },
            { label: "Tax Division", key: "taxDivision" },
            { label: "Mobile Number", key: "mobileNo" },
            { label: "Tax Circle", key: "taxCircle" },
            { label: "Date of Enrollment", key: "dateOfEnrollment" },
            { label: "User ID", key: "userid" },
        ]}
        data={pt}
        backLink="/ptlist"
        />
  )
}

export default ViewPt
