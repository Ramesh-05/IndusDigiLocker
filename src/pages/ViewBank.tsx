import React, { use, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import bankService from '../services/bankService';
import ViewDetails from '../components/ViewDetails';

const ViewBank = () => {
    const { id } = useParams<{ id: string }>();
    const [bank, setBank] = useState<Record<string, any>>({});

    useEffect(() => {
        if (id) {
            bankService.fetchBankById(id).then((data) => {
                setBank(data.data);
            });
        }
    }, [id]);

  return (
    <ViewDetails
        title="View Bank Details"
        fields={[
            { label: "Bank Name", key: "bankName" },
            { label: "Branch Name", key: "branch" },
            { label: "Account Number", key: "bankAccountNumber" },
            { label: "Account Holder Name", key: "accountHolderName" },
            { label: "IFSC Code", key: "ifccode" },
            { label: "Account Type", key: "accountType" },
            { label: "MCIR Code", key: "mcircode" },
            { label: "Mobile Number", key: "mobileNo" },
            { label: "Email ID", key: "email" },
            { label: "Login Id", key: "loginid" },
            { label: "Primary Signatory", key: "primarysignatory" },
            { label: "Secondary Signatory", key: "secondarysignatory" },
        ]}
        data={bank}
        backLink="/banklist"
        />
  );
}

export default ViewBank;
