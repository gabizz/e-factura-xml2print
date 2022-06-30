import { Grid } from '@mui/material'
import React, { Fragment } from 'react'
const CounterPart = ({data}) => {

  
  return (<div>
        {data ? (
            <Grid container alignItems="center" spacing = {0.5}>
                <Grid item sm ={12} xs ={6}>
                    Denumire: <strong>{data.denumire||"- - - - - - -"}</strong>
                </Grid>
                <Grid item sm ={12} xs ={6}>
                    Adresa: <strong>{data.adresa||"- - - - - - -"}</strong>
                </Grid>
                <Grid item sm = {12}>
                    CIF: {data.scpTVA ? "RO" : null} <strong>{data.cui}</strong>
                    &nbsp; &nbsp; &nbsp;  &nbsp;
                    Reg.Com.: <strong>{data.nrRegCom||"- - - - - - -"}</strong>
                </Grid>
            </Grid>
        ) : (
            <div>&nbsp;</div>
        )}
    </div>)
}


export default CounterPart