import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import tdsService from '../services/tdsService';
import ViewDetails from '../components/ViewDetails';

const ViewTDS = () => {
    const { id } = useParams<{ id: string }>();
    const [tds, setTds] = useState<Record<string, any>>({});

    useEffect(() => {
        if (id) {
            tdsService.fetchTdsById(id).then((data) => {
                setTds(data.data);
            });
        }
    }, [id]);

  return (
    <ViewDetails
        title="View TDS Details"
        fields={[
            { label: "TAN Number", key: "tanNo" },
            { label: "User ID", key: "userid" },
            { label: "Surendered", key: "surrendered" },
            { label: "Mobile Number", key: "phoneNumber" },
            { label: "Email", key: "email" },
            { label: "Signatory", key: "signatory" },
        ]}
        data={tds}
        backLink="/tdslist"
        />
  )
}

export default ViewTDS
