import { Alert, Input, MenuItem } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { Fragment } from 'react'
import MyInput from './MyIInput'

const useStyles = makeStyles(theme => ({
    table: {
        '&& thead>tr>th, tfoot>tr>td': {
            border: "1px solid lightgrey",
            background: "rgba(63,81,181,0.04)", lineHeight: 1, padding: theme.spacing(0.3),
            fontSize: "0.7rem", paddingLeft:theme.spacing(1)
        },
        '&& tbody>tr>td, tfoot>tr>td': {
            border: "1px solid lightgrey",
            fontSize: "0.8rem",fontWeight: 500,
            padding: theme.spacing(0.3)
        },
        // '&& tbody>tr:hover': {
        //     background: theme.palette.grey[300],
        //     cursor: "zoom-in",
        //     border: "2px solid navy",
        // },
    }
}))

const ISO_UNITS = [
    {key: "MON", label: "MON - luna"}
]

export default function InvoiceItems({ data, onChange }) {

    const classes = useStyles()
    const item = data || {}

    const inputHandler = (name, index) => ev => {
        console.log(name, index)
        let prods = [...item.products]
        prods[index][name] = ev.target.value
        onChange({...item, products: prods})
    }

    const rmHandler = i => ev => {
        ev.preventDefault()
        let prods = [...item.products]
        prods.splice(i,1)
        onChange({...item, products: prods})
    }


    return (
        <Fragment>
            {data && (
                <table className = {classes.table} width="100%">
                    <thead>
                        <tr>
                            <th align="left" width="5%">Nr.crt</th>
                            <th align="left" width="40%">Denumire produs/serviciu</th>
                            <th align="left"  width="7%">U.M.</th>
                            <th align="left" width="10%">Cantit</th>
                            <th align="left" width="10%">P.U.(lei)</th>
                            <th align="left" width="10%">Valoare(lei)</th>
                            {item && item.furnizor && item.furnizor.scpTVA
                                ? (<>
                                    <th align="left"  width="10%">Cota TVA(%)</th>
                                    <th align="left"  width="10%">Valoare cuTVA(lei)</th>
                                </>)
                                : null
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {item.products.map((e, i) => (
                            <tr key={i} onContextMenu={rmHandler(i)}>
                                <td align="center">{i + 1}</td>
                                <td>
                                    <MyInput value={e.name} onChange={inputHandler("name",i)} />
                                </td>
                                <td align="center">
                                    <MyInput value={e.unit} select onChange={inputHandler("unit",i)}>
                                        {ISO_UNITS.map((e,i) => (
                                            <MenuItem key={e} value = {e.key}>{e.label}</MenuItem>
                                        ))}
                                    </MyInput>
                                    </td>
                                <td align="center">{
                                    <MyInput  type="number" value={e.amount} onChange={inputHandler("amount",i)} />
                                }</td>
                                <td align="center">
                                    <MyInput type="number" value={e.price} onChange={inputHandler("price",i)} />
                                </td>
                                <td align="center">
                                    <MyInput disabled type="number" value={e.val = e.price * e.amount} onChange={inputHandler("value",i)} />
                                    </td>
                                {item && item.furnizor && item.furnizor.scpTVA
                                    ? (<>
                                        <td align="center">
                                            <MyInput select value={e.taxPercent} onChange={inputHandler("taxPercent",i)} >
                                                <MenuItem value="5">5%</MenuItem>
                                                <MenuItem value="9">9%</MenuItem>
                                                <MenuItem value="19">19%</MenuItem>
                                                <MenuItem value="0">SCUTIT</MenuItem>
                                                <MenuItem value="0">FARA</MenuItem>
                                            </MyInput>
                                            </td>
                                        <td align="center">
                                            <MyInput
                                                type="number"
                                                disabled
                                                value={e.price * e.amount + e.price * e.amount * e.taxPercent / 100} 
                                                onChange={inputHandler("taxValue",i)} 
                                            />
                                        </td>
                                    </>)
                                    : null
                                }

                            </tr>
                        ))}
                    </tbody>
                </table>
               
            )}
             <Alert severity="success"><small style={{color: "red"}}>FĂ CLICK DREAPTA PE <strong style={{color:"navy"}}>NR.CRT</strong> PENTRU A ȘTERGE O POZITIE</small></Alert>
        </Fragment>

    )
}
