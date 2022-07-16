import { Grid } from '@mui/material'
import React from 'react'
import COUNTIES from "../src/counties.json"

const getCui = data => {
    let res = (data["cac:Party"]["cac:PartyLegalEntity"]["cbc:CompanyID"]) || data["cac:Party"]["cac:PartyTaxScheme"]["cbc:CompanyID"]
    if (typeof res === "object") {
        res = res["#"]
    }
    return res
}

const translateCodes = (codes, name) => {
    let res = codes.find(el => el.key === name)
    if ( typeof res !== "undefined" ) {
        res = res.ro || res.value
    } else {
        res = "N/A"
    }
    return res
}

export default function Party({ data, type }) {

    data = data || {}

    let partyData = type ==="beneficiar"
        ? data["cac:AccountingCustomerParty"]
        : data["cac:AccountingSupplierParty"]

    let item = {
        denumire: partyData["cac:Party"]
                && partyData["cac:Party"]["cac:PartyLegalEntity"]
                && partyData["cac:Party"]["cac:PartyLegalEntity"]["cbc:RegistrationName"],
        cui: getCui(partyData),
        adresa: partyData["cac:Party"]
            && partyData["cac:Party"]["cac:PostalAddress"]
            && partyData["cac:Party"]["cac:PostalAddress"]["cbc:StreetName"],

        loc: partyData["cac:Party"]
            && partyData["cac:Party"]["cac:PostalAddress"]
            && partyData["cac:Party"]["cac:PostalAddress"]["cbc:CityName"],

        jud: partyData["cac:Party"]
            && partyData["cac:Party"]["cac:PostalAddress"]
            && partyData["cac:Party"]["cac:PostalAddress"]["cbc:CountrySubentity"]
            && translateCodes(COUNTIES, partyData["cac:Party"]["cac:PostalAddress"]["cbc:CountrySubentity"]),

        tara: (partyData["cac:Party"]
                && partyData["cac:Party"]["cac:PostalAddress"]
                && partyData["cac:Party"]["cac:PostalAddress"]["cac:Country"]
                && partyData["cac:Party"]["cac:PostalAddress"]["cac:Country"]["cbc:IdentificationCode"]) 
                || "N/A",

        email: partyData["cac:Party"]
            && partyData["cac:Party"]["cac:Contact"]
            && partyData["cac:Party"]["cac:Contact"]["cbc:ElectronicMail"],
        
        iban: type==="beneficiar" 
            ? ( data["cac:PaymentMeans"] 
                && data["cac:PaymentMeans"]["cac:PayeeFinancialAccount"]
                && data["cac:PaymentMeans"]["cac:PayeeFinancialAccount"]["cbc:ID"]
            ) : null



    }
    //Dedeman fix ---> all specs are with #

    item = Object.keys(item).reduce( (acc,key) => {
        let r = item[key]
        if (typeof item[key] === "object") {
            r = (item[key] && item[key].hasOwnProperty(["#"]))  ? item[key]["#"] : item[key]
        } 
        acc = {...acc, [key]: r}
        
        return acc
    }, {})


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