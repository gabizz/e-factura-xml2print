import { Button, Card, Container, Grid, IconButton, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import CounterPart from "../../components/CounterPart"

import React, { Fragment, useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { useRouter } from 'next/router'

const getCompanyDataFromAnaf = async cui => {
    let result
    try {
        result = await fetch("/api/anaf/" + parseInt(cui), { method: "GET" })
        result = await result.json()
    } catch (error) {
        result = { err: true, msg: error.toString() }
    } finally {
        return result
    }
}


const Factura = ({ params }) => {

    const router = useRouter()
    const [item, setItem] = useState({
        furnizor: {
            cui: ""
        },
        beneficiar: {
            cui: ""
        },
        products: []
    })



    useEffect(() => {
        console.log("params:", params)
        if (params.furnizor) {
            setItem(decodeURIComponent(params))
        }

    }, [params])

    const inputHandler2 = (l1, l2) => ev => setItem({
        ...item,
        [l1]: {
            ...item[l1],
            [l2]: ev.target.value
        }
    })

    const getData = counterpart => async () => {
        console.log("iii:", item[counterpart].cui)
        setItem({ ...item, [counterpart]: await getCompanyDataFromAnaf(item[counterpart].cui) })
    }

    const addProductHandler = () => {
        setItem({
            ...item, 
            products: [
                ...item.products,
                item.furnizor.scpTVA
                    ? { name:"produs cu tva", amount:1, unit:"MON", price:1, val: 1, taxPercent:19, taxValue: 0.19, total: 1.19 }
                    : { name:"produs fara tva", amount:1, unit:"MON", price:1, val: 1, taxPercent:null, taxValue: null, total: 1 }
            ]})
    }

    const xmlHandler = () => {}

    return (
        <Container>
            <Box
                sx={{
                    boxShadow: 1, // theme.shadows[1]
                    color: 'primary.main', // theme.palette.primary.main
                    background: '#f1f1f1',
                    m: [2, 10,5], // margin: theme.spacing(1)
                    p: {
                        xs: 1, // [theme.breakpoints.up('xs')]: { padding: theme.spacing(1) }
                    },
                    zIndex: 'tooltip', // theme.zIndex.tooltip
                }}
            >
                <Grid container alignItems="flex-start" spacing={2}>


                    <Grid item xs={6}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="h5"> FURNIZOR</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField value={item.furnizor.cui} fullWidth label="CUI/CIF" type="number" onChange={inputHandler2("furnizor", "cui")} />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Button variant="contained" onClick={getData("furnizor")} fullWidth disabled={!item.furnizor.cui}>
                                    PREIA AUTOMAT DATELE DE LA ANAF</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Card style={{ padding: "20px", height: "25vh" }}>
                                    <CounterPart data={item.furnizor} />
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="h5"> BENEFICIAR</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={item.beneficiar.cui} fullWidth label="CUI/CIF" type="number"
                                    onChange={inputHandler2("beneficiar", "cui")} />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Button variant="contained" onClick={getData("beneficiar")} fullWidth disabled={!item.beneficiar.cui}>
                                    PREIA AUTOMAT DATELE DE LA ANAF
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Card style={{ padding: "20px", height: "25vh" }}>
                                    <CounterPart data={item.beneficiar} />
                                </Card>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>

                <Card style={{ marginTop: "10px", padding: "10px" }}>
                    <Grid container spacing = {1} alignItems="center" justifyContent="space-between">
                        <Typography  variant='subtitle1' color="primary">&nbsp;&nbsp;&nbsp;Produse/servicii</Typography>
                        <Grid item>
                        <IconButton color="secondary" onClick = {addProductHandler}>
                            <MdAdd/>
                        </IconButton>
                        </Grid>
                        <Grid item xs ={12}>
                            <table border={1} width="100%" cellSpacing={0}>
                                <thead>
                                    <tr>
                                    <th>Nr.crt</th>
                                    <th>Denumire produs/serviciu</th>
                                    <th>U.M.</th>   
                                    <th>Cantit</th>   
                                    <th>P.U.(lei)</th>   
                                    <th>Valoare(lei)</th>
                                    {item.furnizor.scpTVA
                                        ? ( <>
                                            <th>Cota TVA(%)</th>
                                            <th>Valoare TVA(lei)</th>
                                        </>)
                                        : null
                                    }

                                    </tr>   
                                </thead>
                                <tbody>
                            {item.products.map( (e,i) => (
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{e.name}</td>
                                    <td align="center">{e.unit}</td>
                                    <td align="center">{e.amount}</td>
                                    <td align="center">{e.price}</td>
                                    <td align="center">{e.val=e.price*e.amount}</td>
                                    {item.furnizor.scpTVA
                                        ? ( <>
                                            <td align="center">{e.taxPercent}</td>
                                            <td align="center">{e.price*e.amount + e.price*e.amount*e.taxPercent/100}</td>
                                        </>)
                                        : null
                                    }

                                </tr>
                            ))}
                            </tbody>
                            </table>
                        </Grid>
                        <Grid item xs = {12}>
                            <Button variant="contained" color="primary" fullWidth onClick = {xmlHandler}>
                                EXPORTA XML PENTRU E-FACTURA
                            </Button>
                        </Grid>
                        <Grid item xs = {12}>
                            <Button variant="outlined" color="secondary" fullWidth onClick = {()=>router.push("/")}>
                                MERGI LA CONVERTORUL XML ÎN FORMAT TIPĂRIBIL
                            </Button>
                        </Grid>
                    </Grid>
                    
                </Card>
            </Box>

        </Container>
    )
}

export default Factura


export const getServerSideProps = async (ctx) => {

    return {
        props: {
            params: JSON.stringify(ctx.query)
        }
    }
}
