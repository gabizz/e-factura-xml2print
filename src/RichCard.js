import React from "react"
import {  Card, Grid, Typography, Toolbar, useTheme, useMediaQuery, CardActions } from "@mui/material"
import { makeStyles, propsToClassKey } from "@mui/styles"

const useStyles = makeStyles(theme => ({
    card: { margin: theme.spacing(0),padding: 0, height: '100%', border: `1px solid ${theme.palette.grey[200]}`, boxShadow: '1px 1px 2px lightgrey',
    backgroundColor: "rgba(0,0,0,0)" },
    cardToolbar: { 
        background: theme.palette.grey[300], color: "black", margin: 0, minHeight: theme.spacing(4),
        marginRight: 0, paddingRight: 0, paddingLeft: theme.spacing(1)
    },
    cardContent: { paddingTop: "10px", paddingLeft: theme.spacing(1),paddingRight: theme.spacing(1),  overflow: "auto", backgroundColor: "rgba(0,0,0,0)" }
}))


const RichCard = props => {
    const width = useMediaQuery(useTheme().breakpoints.up('sm'))
    const classes = useStyles()
    return (
        <Card className={classes.card} 
        // style = {props.style}
        >
            {Boolean(props.title) && (
                <Toolbar variant="dense" className={classes.cardToolbar}>
                    <Grid container justifyContent = "space-between" alignItems = "center">
                        <Grid item xs = {8}>
                        <Typography variant="caption" style = {props.titleStyle}><strong>{props.title}</strong></Typography>
                    </Grid>
                    <Grid item xs = {4}>
                        <div align = "right">{props.action  && <div align = "right">{props.action}&nbsp;&nbsp;</div>}</div>
                    </Grid>
                    </Grid>
                </Toolbar>
            )}
            <div className={classes.cardContent} style = {(props.containerStyle||props.contentStyle) ?? {maxHeight: "90vh", overflow: "auto"}}>
                {props.children}
            </div>
            <CardActions><div style = {{width: "100%"}}>{props.footer}</div></CardActions>
        </Card>
    )
}

export default RichCard