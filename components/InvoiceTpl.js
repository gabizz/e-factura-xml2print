import { Alert, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import moment from "moment"
import { useEffect, useState } from 'react'
import styled from "styled-components"
import TableStyle from "./TableStyle"
import RichCard from "./RichCard"
import ISO_UNIT_CODES from "../src/units.json"
import COUNTIES  from "../src/counties.json"
import Party from './Party'
import InvoiceItems from './InvoiceItems'


const useStyles = makeStyles(theme => ({
    card: {
        border: "1px solid red"
    }
}))

const translateCodes = (codes, name) => {
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
                um: translateCodes(ISO_UNIT_CODES, e["cbc:InvoicedQuantity"]["@unitCode"]),
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
                                <Party data={Invoice} type="furnizor"/>
                            </RichCard>
                        </Grid>
                        <Grid item xs={6}>
                            <RichCard title={<div style={{ color: "black" }}>BENEFICIAR</div>} >
                                <Party data={Invoice} type="beneficiar"/>
                            </RichCard>
                        </Grid>
                        <Grid item xs={12}>
                           <InvoiceItems data = {item} items = {invoiceItems} />
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