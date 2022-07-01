import { TextField} from '@mui/material'
import {makeStyles} from "@mui/styles"
import React from 'react'

const useStyles = makeStyles(theme=>({
    textField: { background: "white", borderRadius:8, 
    "&& :hover": {background: theme.palette.grey[100]},

    
    "&& input" : {
        margin: "2px",
        fontSize: "1em",
        fontWeight:900,
        border: "none"
    },

    "&& input[type=number]":{
        textAlign: "center",
        width: "100%",
        paddingRight: 0, paddingLeft:0, marginRight: 0, marginLeft: 0  
    },
    "&& input[type=text]":{
        textAlign: "left",
        width: "100%",
        fontWeight:900,
        paddingRight: 0, paddingLeft:"1`em", marginRight: 0, marginLeft: 0  
    },
    "&& input[type=date]":{
        textAlign: "center",
        width: "100%",
        paddingRight: 0, paddingLeft:0, marginRight: 0, marginLeft: 0  
    },
    "&& input[type=select]":{
        textAlign: "center",
        width: "100%",
        paddingRight: 0, paddingLeft:0, marginRight: 0, marginLeft: 0  
    },
    ".MuiAutocomplete-inputRoot[class*=\"MuiOutlinedInput-root\"][class*=\"MuiOutlinedInput-marginDense\"] .MuiAutocomplete-input": {
        fontSize: "10px",
    },
    "&& textarea": {padding: "10px"},
},
    input: { fontWeight: 800, fontSize: '0.8em', color: "navy", borderRadius:8, padding:0, border: "none" , },
    inputLabel: { fontSize: '0.9em'}
}))

export default function MyInput({value, onChange, ...rest}) {
    const classes = useStyles()
    return (
        <TextField 
            style = {{height: "auto"}}
            variant = "outlined" 
            fullWidth={rest.fullWidth || true} 
            size = "small" 
            className = {classes.textField}
            InputProps = {{className: classes.input}} 
            InputLabelProps = {{className: classes.inputLabel}}
            value = {value||""}
            onChange = {onChange}
            {...rest} />
    )
}

