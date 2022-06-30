import { Table } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles(theme => ({
    table: {
        '&& thead>tr>th, tfoot>tr>td': {
            border: "1px solid lightgrey", fontSize: "0.8rem",
            background: "rgba(63,81,181,0.04)", lineHeight: 1, padding: theme.spacing(0.3)
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

export default function TableStyle(props) {
    const classes = useStyles()
  return (
    <Table className = {classes.table}>{props.children}</Table>
  )
}
