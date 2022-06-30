import React, { Fragment, useState, useCallback, useRef } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Copyright from '../src/Copyright';
import {  Button, Card, Grid } from '@mui/material';
import { useDropzone } from 'react-dropzone'
import { create } from "xmlbuilder2"
import InvoiceTpl from '../src/InvoiceTpl';
import { useReactToPrint } from 'react-to-print';
import { MdPrint, MdRefresh } from "react-icons/md"


const converter = (bs) => {
  let result 
  try {
    result = create(bs)
  } catch (error) {
    result = error.toString()
  }
  return result
}


export default function Index() {

  const [item, setItem] = useState(null)
  const printRef = useRef()

  const printHandler = useReactToPrint({
    content: () => printRef.current,
  });

  const onDrop = useCallback((acceptedFiles) => {
    let result
    try {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader()
  
        reader.onabort = () => result = {err:true, msg:"Actiune anulata"}
        reader.onerror = () =>result = {err:true, msg: "Eroare la citirea fisierului"}
        reader.onload = () => {
        // Do whatever you want with the file contents
          const binaryStr = reader.result
          result = converter(binaryStr) 
          result = typeof result === "object" ? result.end({ format: 'object' }) : result
         
          setItem({...result})
        }
        reader.readAsText(file)
      })
    } catch (error) {
        result = {err:true, msg: "EROARE:" + error.toString()}
    } finally {
        setItem(result)
    }

  }, [])





const { getRootProps, getInputProps } = useDropzone({ onDrop })


return (
  <React.Fragment>
    <Container maxWidth="lg">
      {console.log("item:", item)}
      {/* <Box sx={{ my: 4 }}> */}
        <Grid container>
          <Grid item xs = {12} align="center">
            <br/>
          <Typography variant="h5" component="h3" gutterBottom style = {{fontWeight: 800, color: "navy"}}>
            CONVERSIE XML E-FACTURA (RO) ÎN FORMAT TIPĂRIBIL
          </Typography>
          </Grid>
          {!item
            ? (
              <Grid item xs = {12}>
                <Card style = {{padding: "10px", border: "2px dashed lightgrey", boxShadow:"none"}}>
                  <Typography variant = "body2" align="center">
                      Acest utilitar este destinat instituțiilor publice din România, și se dorește a fi o alternativă mai facilă la soluția pusă la dispoziție de ANAF (utilitarul JAVA).<br/>
                      Serviciul de față este un proiect open-source, oferit "așa-cum-este" sub licență MIT, dezvoltat și susținut de {' '}
                      <a href = "gmaftei.ro" target = "_blank">Maftei Gabriel-Claudiu P.F.A. Arad</a>,{' '}
                      <br/> Sursele aplicației sunt publicate la adresa {' '}
                      <a href ="https://github.com/gabizz/e-factura-xml2print" target = "_blank">https://github.com/gabizz/e-factura-xml2print</a>
                      <br/>
                      <strong style = {{color:"darkred"}}>NOTĂ GDPR:</strong>{' '}
                       <i>Această aplicație web nu colecteză date de nici un fel
                        (toate procesările sunt realizate pe calculatorul Dvs., în browser-ul web) </i>

                  </Typography>
                  
                </Card>
                <br/>
              <div {...getRootProps()} style={{ border: "3px solid navy", height: "45vh" }}>
                <input {...getInputProps()} />
                <p align="center" style = {{fontSize: "2rem", fontWeight:800, color: "lightgrey"}}>
                  Trageți fișierul XML e-factura aici, <br/>sau faceți click pentru a-l încărca manual
                </p>
              </div>
              </Grid>
            )
            :(<Fragment>
                  <Grid item xs = {6}>
                 <Button 
                    color="primary" 
                    startIcon = {<MdRefresh/>}
                    onClick={() => setItem(null)}>covertește o altă factură</Button>
                 </Grid>
                 <Grid item xs = {6} align="right">
                 <Button 
                    color="primary" 
                    startIcon = {<MdPrint/>}
                    onClick={printHandler}>tipărește factura</Button>
                 </Grid>
                 <Grid item xs = {12}><hr/></Grid>
                 </Fragment>
              )

          }
          
          {item 
            && 
                <Grid item xs = {12} ref = {printRef} >
                    <InvoiceTpl data={item} />
                </Grid>
          }

          </Grid>



      {/* </Box> */}
      <Copyright />
    </Container>
   
  </React.Fragment>
);
}


