import { Alert, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import moment from "moment"
import { useEffect, useState } from 'react'
import styled from "styled-components"
import TableStyle from "./TableStyle"
import RichCard from "./RichCard"
import ISO_UNIT_CODES from "../src/codes.json"

const Party = ({ data }) => (
    <div style = {{fontSize:"0.8rem", paddingLeft:"10px"}}>
    <Grid container spacing={0.5}>
        <Grid item xs={12}>
            Denumire <br />
            <strong>{data["cac:Party"]["cac:PartyLegalEntity"]["cbc:RegistrationName"]}</strong>
        </Grid>
        <Grid item xs={6}>
            CIF/CUI: {' '}
            <strong>{
                data["cac:Party"]["cac:PartyLegalEntity"]["cbc:CompanyID"]
                || data["cac:Party"]["cac:PartyTaxScheme"]["cbc:CompanyID"]
            }
            </strong>
        </Grid>

        <Grid item xs={12}>
            Adresa: {' '}
            <strong>
                {data["cac:Party"]["cac:PostalAddress"]["cbc:StreetName"]}
            </strong>
        </Grid>
        <Grid item >
            Localitatea: {' '}
            <strong>
                {data["cac:Party"]["cac:PostalAddress"]["cbc:CityName"]}
            </strong>
            &nbsp;
            Județul:{' '}
            <strong>
                {data["cac:Party"]["cac:PostalAddress"]["cbc:CountrySubentity"]}
            </strong>
            &nbsp;&nbsp;
            Țara: {' '}
            <strong>
                {data["cac:Party"]["cac:PostalAddress"]["cac:Country"]["cbc:IdentificationCode"]}
            </strong>
            &nbsp;
            {/* capital social */}
            {/* <>
                {data["cac:Party"]["cac:PartyLegalEntity"]["cbc:CompanyLegalForm"]}
            </> */}
            <br/>
            E-mail: <strong>{ data["cac:Party"]["cac:Contact"] 
            ? data["cac:Party"]["cac:Contact"]["cbc:ElectronicMail"] 
            
            :"---"
         }</strong>
        </Grid>


    </Grid>
    </div>
)

const useStyles = makeStyles(theme => ({
    card: {
        border: "1px solid red"
    }
}))

const translateUnit = (codes, name) => {
    let res = codes.find(el => el.key === name)
    if ( typeof res !== "undefined" ) {
        res = res.ro || res.value
    } else {
        res = "N/A"
    }
    return res
}

export default function InvoiceTpl({ data }) {

    const classes = useStyles()
    const [item, setItem] = useState(null)
    const [invoiceItems, setInvoiceItems] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {

        if (data && data.Invoice && data.Invoice["cac:InvoiceLine"]) {
            let elems = []
            if (Array.isArray(data.Invoice["cac:InvoiceLine"])) {
                elems = data.Invoice["cac:InvoiceLine"]
            } else { elems.push(data.Invoice["cac:InvoiceLine"]) }
            elems = elems.map(e => ({
                pu: e["cac:Price"]["cbc:PriceAmount"]["#"],
                um: translateUnit(ISO_UNIT_CODES, e["cbc:InvoicedQuantity"]["@unitCode"]),
                cantit: e["cbc:InvoicedQuantity"]["#"],
                name: e["cac:Item"]["cbc:Name"],
                tva_procent: e["cac:Item"]["cac:ClassifiedTaxCategory"]["cbc:Percent"] || 0
            }))
            console.log("data::::", data, "\nelems:", elems)
            setInvoiceItems(elems)


        }
        setItem(data)
    }, [data])

    const { Invoice } = item || {}
    return (
        <Styled>
            {console.log("error: ", error)}
            {error && <Alert severity="error">{error.msg}</Alert>}

            {item && (
                <Styled>
                    <Grid container align="left" spacing={2}>
                        <Grid item xs={12} align="center">
                            <Typography variant = "h4" component = "div" style = {{lineHeight:1}}>
                                <strong>
                                    e-FACTURA
                                </strong>
                            </Typography>
                            <Typography variant = "h6" component="div" style = {{lineHeight:1.2, fontWeight: 300}}>
                            nr. <strong>{Invoice["cbc:ID"]}</strong> din data <strong>{moment(Invoice["cbc:IssueDate"]).format("DD.MM.YYYY")}</strong>
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <RichCard title="FURNIZOR">
                                <Party data={Invoice["cac:AccountingSupplierParty"]} />
                            </RichCard>
                        </Grid>
                        <Grid item xs={6}>
                            <RichCard title={<div style={{ color: "black" }}>BENEFICIAR</div>} >
                                <Party data={Invoice["cac:AccountingCustomerParty"]} />
                            </RichCard>
                        </Grid>
                        <Grid item xs={12}>
                            <TableStyle>
                                <thead>
                                    <tr>
                                        <th align='center'>Nr.<br />crt.</th>
                                        <th align='center'>Denumirea produselor sau a serviciilor</th>
                                        <th align='center'>U.M.</th>
                                        <th align='center'>Cant.</th>
                                        <th align='center'>Pret unitar<br />(fara TVA)<br />-Lei-</th>
                                        <th align='center'>Valoare<br />-Lei-</th>
                                        <th align='center'>Valoare<br />TVA<br />-Lei-</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoiceItems.map((e, i) => (
                                        <tr key={i}>
                                            <td align="center">{i + 1}</td>
                                            <td>{e.name}</td>
                                            <td align='center'>{e.um}</td>
                                            <td align="center">{e.cantit}</td>
                                            <td align="center">{e.pu}</td>
                                            <td align="center">{(+e.pu * +e.cantit).toFixed(2)}</td>
                                            <td align="center">{(e.tva_procent/100 * (e.cantit * e.pu)).toFixed(2)}</td>
                                        </tr>
                                    ))}

                                    <tr>
                                        <td colspan="4" rowspan="3">Intocmit de: Gabriel-Claudiu Maftei<br/>CNP: -<br/>Numele delegatului: -<br/>B.I./C.I: -<br/>Mijloc transport: -<br/>Expedierea s-a efectuat in prezenta noastra la data de ............ ora ......<br/>Semnaturile</td>
                                        <td align="center"><strong>TOTAL</strong></td>
                                        <td align="center">
                                            {/* total fara tva */}
                                            {item["Invoice"]["cac:TaxTotal"]["cac:TaxSubtotal"]["cbc:TaxableAmount"]["#"]}
                                        </td>
                                        <td align="center">
                                            {/* tva total */}
                                            {item["Invoice"]["cac:TaxTotal"]["cbc:TaxAmount"]["#"]}    
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align='center'><strong>TOTAL DE PLATĂ</strong></td>
                                        <td colspan="2"  align="center"><strong>
                                            {/* total general */}
                                            {item["Invoice"]["cac:LegalMonetaryTotal"]["cbc:TaxInclusiveAmount"]["#"]}
                                        </strong></td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" align="center">Semnatura de primire</td>
                                    </tr>
                                </tbody>
                            </TableStyle>
                        </Grid>
                        <Grid item xs={6}>Scadență: <strong>{moment(Invoice["cbc:DueDate"]).format("DD.MM.YYYY")}</strong></Grid>
                        <Grid item xs={6} align="right">Moneda: <strong>{Invoice["cbc:DocumentCurrencyCode"]}</strong></Grid>
                    </Grid>
                    <Grid item xs = {12} align="right">
                    <div className = "printable">
                        <hr style = {{margin:0}}/>
                        <Typography variant="caption" style={{color: "grey", fontWeight:800}}>aplicații smart pentru administrația publică - gmaftei.ro</Typography>
                        </div>
                    </Grid>
                    {/* <pre align="left">{JSON.stringify(item, null, 3)}</pre> */}
                </Styled>
            )}


        </Styled>
    )
}


const Styled = styled.div`
@media all {

  @page {
    size: A4 portrait;
    } 
 
  
}
@media screen: {
    .printable { display: none;}
}
@media print: {
  @page {
    size: A4 portrait;
    margin: 1cm 1cm 1cm 2cm;
  }
  
  html, body {
    height: initial !important;
    overflow: initial !important;
    -webkit-print-color-adjust: exact;
  }

  
}

`