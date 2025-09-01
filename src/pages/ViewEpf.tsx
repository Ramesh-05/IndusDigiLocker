import React, { useEffect, useState } from 'react'
import EpfService from '../services/EpfService';
import { useParams } from 'react-router-dom';
import ViewDetails from '../components/ViewDetails';

const ViewEpf = () => {
    const { id } = useParams<{ id: string }>();
    const [epf, setEpf] = useState<Record<string, any>>({});

    useEffect(() => {
        if (id) {
            EpfService.fetchEpfById(id).then((data) => {
                setEpf(data.data);
            });
        }
    }, [id]);

  return (
    <ViewDetails
        title="View GST Details"
        fields={[
            { label: "Establishment ID", key: "estid" },
            { label: "User ID", key: "userid" },
            { label: "Labour Identification Number(LIN)", key: "lin" },
            { label: "Mobile Number", key: "mobileNo" },
            { label: "National Industrial Classification Code(NIC)", key: "niccode" },
            { label: "Email", key: "emailId" },
            { label: "PF Office", key: "pfOfficeAddress" },
            { label: "Signatory", key: "signatory" },
        ]}
        data={epf}
        backLink="/epflist"
        />
  )
}

export default ViewEpf;
