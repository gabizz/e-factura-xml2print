import { makeStyles } from '@mui/styles'
import React, { Fragment } from 'react'
import TableStyle from './TableStyle'


const useStyles = makeStyles(theme => ({
    table: {
        '&& thead>tr>th, tfoot>tr>td': {
            border: "1px solid lightgrey",
            background: "rgba(63,81,181,0.04)", lineHeight: 1, padding: theme.spacing(0.3),
            fontSize: "0.7rem", paddingLeft: theme.spacing(1)
        },
        '&& tbody>tr>td, tfoot>tr>td': {
            border: "1px solid lightgrey",
            fontSize: "0.8rem", fontWeight: 500,
            padding: theme.spacing(0.3)
        },
        // '&& tbody>tr:hover': {
        //     background: theme.palette.grey[300],
        //     cursor: "zoom-in",
        //     border: "2px solid navy",
        // },
    }
}))



export default function InvoiceItems({ data, items }) {

    const classes = useStyles()
    items = items || []





    return (
        <Fragment>
            {data && items && (
                <TableStyle>
                    <thead>
                        <tr>
                            <th align='center'>Nr.<br />crt.</th>
                            <th align='center'>Denumirea produselor sau a serviciilor</th>
                            <th align='center'>U.M.</th>
                            <th align='center'>Cant.</th>
                            <th align='center'>Pret unitar<br />(fara TVA)</th>
                            <th align='center'>Valoare</th>
                            <th align='center'>Valoare<br />TVA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((e, i) => (
                            <tr key={i}>
                                <td align="center">{i + 1}</td>
                                <td>{e.name}</td>
                                <td align='center'>{e.um}</td>
                                <td align="center">{e.cantit}</td>
                                <td align="center">{e.pu}</td>
                                <td align="center">{(+e.pu * +e.cantit).toFixed(2)}</td>
                                <td align="center">{(e.tva_procent / 100 * (e.cantit * e.pu)).toFixed(2)}</td>
                            </tr>
                        ))}

                        <tr>
                            <td colSpan="4" rowspan="3">Intocmit de: -<br />CNP: -<br />Numele delegatului: -<br />B.I./C.I: -<br />Mijloc transport: -<br />Expedierea s-a efectuat in prezenta noastra la data de ............ ora ......<br />Semnaturile</td>
                            <td align="center"><strong>TOTAL</strong></td>
                            <td align="center">
                                {/* total fara tva */}
                                {data["Invoice"]["cac:TaxTotal"]["cac:TaxSubtotal"]["cbc:TaxableAmount"]["#"]}
                            </td>
                            <td align="center">
                                {/* tva total */}
                                {data["Invoice"]["cac:TaxTotal"]["cbc:TaxAmount"]["#"]}
                            </td>
                        </tr>
                        <tr>
                            <td align='center'><strong>TOTAL DE PLATĂ</strong></td>
                            <td colSpan="2" align="center"><strong>
                                {/* total general */}
                                {data["Invoice"]["cac:LegalMonetaryTotal"]["cbc:TaxInclusiveAmount"]["#"]}
                            </strong></td>
                        </tr>
                        <tr>
                            <td colSpan="3" align="center">Semnatura de primire</td>
                        </tr>
                    </tbody>
                </TableStyle>

            )}


        </Fragment>

    )
}
