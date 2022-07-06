import { Grid } from '@mui/material'
import React from 'react'

const getCui = data => {
    let res = (data["cac:Party"]["cac:PartyLegalEntity"]["cbc:CompanyID"]) || data["cac:Party"]["cac:PartyTaxScheme"]["cbc:CompanyID"]
    if (typeof res === "object") {
        res = res["#"]
    }
    return res
}

export default function Party({ data, type }) {

    data = data || {}

    let partyData = type ==="beneficiar"
        ? data["cac:AccountingCustomerParty"]
        : data["cac:AccountingSupplierParty"]

    const item = {
        denumire: partyData["cac:Party"]["cac:PartyLegalEntity"]["cbc:RegistrationName"],
        cui: getCui(partyData),
        adresa: partyData["cac:Party"]["cac:PostalAddress"]["cbc:StreetName"],
        loc: partyData["cac:Party"]["cac:PostalAddress"]["cbc:CityName"],
        jud: partyData["cac:Party"]["cac:PostalAddress"]["cbc:CountrySubentity"],
        tara: partyData["cac:Party"]["cac:PostalAddress"]["cac:Country"]["cbc:IdentificationCode"],
        email: partyData["cac:Party"]["cac:Contact"] ? partyData["cac:Party"]["cac:Contact"]["cbc:ElectronicMail"] : null,
        iban: type==="beneficiar" 
            ? (data["cac:PaymentMeans"] && data["cac:PaymentMeans"]["cac:PayeeFinancialAccount"]["cbc:ID"]) 
            : null



    }


    return (
        <div style={{ fontSize: "0.8rem", paddingLeft: "10px" }}>
            <Grid container spacing={0.5}>
                <Grid item xs={12}>
                    Denumire <br />
                    <strong>{item.denumire}</strong>
                </Grid>
                <Grid item xs={6}>
                    CIF/CUI: {' '}
                    <strong>{item.cui}
                    </strong>
                </Grid>

                <Grid item xs={12}>
                    Adresa: {' '}
                    <strong>
                        {item.adresa}
                    </strong>
                </Grid>
                <Grid item >
                    Localitatea: {' '}
                    <strong>
                        {item.loc}
                    </strong>
                    &nbsp;
                    Județul:{' '}
                    <strong>
                        {item.jud}
                    </strong>
                    &nbsp;&nbsp;
                    Țara: {' '}
                    <strong>
                        {item.tara}
                    </strong>
                    &nbsp;
                    {/* capital social */}
                    {/* <>
                 {data["cac:Party"]["cac:PartyLegalEntity"]["cbc:CompanyLegalForm"]}
             </> */}
                    
                    {item.email && 
                        <>
                            <br />
                            E-mail: <strong>{item.email}</strong>
                        </>
                    }
                    
                    {item.iban && (
                        <>
                            <br />
                            IBAN:{' '}
                            <strong>{item.iban}</strong>
                        </>
                    )}
                </Grid>






            </Grid>
        </div>
    )
}