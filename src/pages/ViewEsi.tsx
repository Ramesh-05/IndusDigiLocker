import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import esiService from '../services/esiService';
import ViewDetails from '../components/ViewDetails';

const ViewEsi = () => {
    const { id } = useParams<{ id: string }>();
    const [esi, setEsi] = useState<Record<string, any>>({});

    useEffect(() => {
        if (id) {
            esiService.fetchEsiById(id).then((data) => {
                setEsi(data.data);
            });
        }
    }, [id]);
    
  return (
    <ViewDetails
        title="View ESI Details"
        fields={[
            { label: "Employer's Code", key: "employerCodeNo" },
            { label: "User ID", key: "userid" },
            { label: "Labour Identification Number(LIN)", key: "lin" },
            { label: "Mobile Number", key: "mobileNo" },
            { label: "Employer's Name", key: "employerName" },
            { label: "Email", key: "emailId" },
            { label: "State/RO", key: "ro" },
            { label: "Signatory", key: "signatory" },
        ]}
        data={esi}
        backLink="/esilist"
        />
  )
}

export default ViewEsi;
