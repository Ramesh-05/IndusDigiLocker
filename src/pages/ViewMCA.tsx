import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import McaService from '../services/McaService';
import ViewDetails from '../components/ViewDetails';

const ViewMCA = () => {
    const { id } = useParams<{ id: string }>();
    const [mca, setMca] = useState<Record<string, any>>({});

    useEffect(() => {
        if (id) {
            McaService.fetchMcaById(id).then((data) => {
                setMca(data.data);
            });
        }
    }
    , [id]);

  return (
    <ViewDetails
        title="View MCA Details"
        fields={[
            { label: "Company Identification Number", key: "cin" },
            { label: "Registrar Of Company Name", key: "rocName" },
            { label: "Registration Number", key: "registrationNo" },
            { label: "Date Of Incorporation", key: "dateOfIncorporation" },
            { label: "Registered Address", key: "registeredAddress" },
            { label: "Stock Exchanges", key: "stockExchanges" },
            { label: "Class Of Company", key: "classOfCompany" },
            { label: "Authorised Capital", key: "authorisedCapital" },
            { label: "Paid Up Capital", key: "paidUpCapital" },
            { label: "Email", key: "email" },
            { label: "Mobile Number", key: "mobileNo" },
            { label: "Tele Phone Number", key: "telephone" },
            { label: "V2 Login ID", key: "v2loginid" },
            { label: "V3 Login ID", key: "v3loginid" },
            { label: "V2 Email Id", key: "v2emailId" },
            { label: "V3 Email Id", key: "v3emailId" },
        ]}
        data={mca}
        backLink="/mcalist"
        />
  )
}

export default ViewMCA
