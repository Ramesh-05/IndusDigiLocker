import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import gstService from '../services/gstService';
import { title } from 'process';
import ViewDetails from '../components/ViewDetails';

const ViewGst = () => {

    const { id } = useParams<{ id: string }>();
    const [gst, setGst] = useState<Record<string, any>>({});

    useEffect(() => {
        if (id) {
            gstService.fetchGstById(id).then((data) => {
                setGst(data.data);
            });
        }
    }, [id]);

  return (
    <ViewDetails
        title="View GST Details"
        fields={[
            { label: "GST Number", key: "gstNumber" },
            { label: "User ID", key: "userid" },
            { label: "Address", key: "address" },
            { label: "Mobile Number", key: "mobileno" },
            { label: "Email", key: "email" },
            { label: "Signatory", key: "signatory" },
            { label: "State", key: "state" },
        ]}
        data={gst}
        backLink="/gstlist"
        />
  )
}

export default ViewGst
