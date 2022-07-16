import { Button, Card, Grid, Link } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React, { Fragment, useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdPrint, MdRefresh } from "react-icons/md";
import { useReactToPrint } from 'react-to-print';
import { create } from "xmlbuilder2";
import Copyright from '../components/Copyright';
import InvoiceTpl from '../components/InvoiceTpl';


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
                  <Typography variant = "caption" align="center">
                      Acest utilitar este destinat instituțiilor publice din România, și se dorește a fi o alternativă mai facilă la soluția pusă la dispoziție de ANAF (utilitarul JAVA).{' '}
                      Serviciul de față este un proiect open-source, oferit "așa-cum-este" sub licență MIT, dezvoltat și susținut de {' '}
                      <a href = "https://gmaftei.ro" target = "_blank">Maftei Gabriel-Claudiu P.F.A. Arad</a>,{' '}
                       codul sursă fiind disponibil aici{' '}{' '}
                      <a href ="https://github.com/gabizz/e-factura-xml2print" target = "_blank">https://github.com/gabizz/e-factura-xml2print</a>
                      <hr style = {{border: "1px dashed lightgrey"}} />
                      <div style={{color: "red", align:"center", fontWeight: "700"}}>
                      Pe măsura feed-back-ului pe care îl primim, încercăm să facem acestă soluție compatibilă cu facturile emise din cât mai multe aplicații de facturare.
                      </div>
                  </Typography>
                  
                </Card>
                <br/>
              <div {...getRootProps()} style={{ border: "3px solid navy", height: "45vh" }}>
                <input {...getInputProps()} />
                <p align="center" style = {{fontSize: "2rem", fontWeight:800, color: "lightgrey"}}>
                  Trageți fișierul XML e-factura aici, <br/>sau faceți click pentru a-l încărca manual
                </p>
              </div>
                <br/>
                <Card style = {{padding: "10px", border: "2px dashed lightgrey", boxShadow:"none", background: "aliceblue"}}>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item xs = {10}>
                <strong style={{color: "red"}}>OPERAȚIUNE INVERSĂ  </strong> &nbsp; <i>- formular web pentru generare XML e-Factura pus la dispoziție de ANAF</i>
                </Grid>
                <Grid item><Link href = "https://www.anaf.ro/CompletareFactura/faces/factura/informatiigenerale.xhtml" target="_blank"><Button size="medium" color="primary">LINK AICI </Button></Link></Grid>
                </Grid>
                </Card>
                <br/>
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


