import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import incomeTaxService from '../services/incomeTaxService';
import ViewDetails from '../components/ViewDetails';

const ViewIncomeTax = () => {
    const { id } = useParams<{ id: string }>();
    const [incomeTax, setIncomeTax] = useState<Record<string, any>>({});

    useEffect(() => {
        if (id) {
            incomeTaxService.fetchIncomeTaxById(id).then((data) => {
                setIncomeTax(data.data);
            });
        }
    }, [id]);


  return (
    <ViewDetails
        title="View Income Tax Details"
        fields={[
            { label: "PAN Number", key: "panNumber" },
            { label: "Name", key: "name" },
            { label: "PAN Issued Date", key: "panIssuedDate" },
            { label: "Incorporation Date", key: "incorporationDate" },
            { label: "TDS (Tax Deduction At Source)", key: "tds" },
            { label: "Primary Mobile Number", key: "primaryMobile" },
            { label: "Secondary Mobile Number", key: "secondaryMobile" },
            { label: "Primary Email", key: "primaryEmail" },
            { label: "Secondary Email", key: "secondaryEmail" },
            { label: "User ID", key: "userid" },
            { label: "Primary Signatory", key: "primarysignatory" },
            { label: "Secondary Signatory", key: "secondarysignatory" },
        ]}
        data={incomeTax}
        backLink="/incometaxlist"
        />
  )
}

export default ViewIncomeTax
