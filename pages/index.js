import { Button, Card, Grid, Link } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React, { Fragment, useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdPictureAsPdf, MdPrint, MdRefresh } from "react-icons/md";
import { useReactToPrint } from 'react-to-print';
import { create } from "xmlbuilder2";
import Copyright from '../components/Copyright';
import InvoiceTpl from '../components/InvoiceTpl';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


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


  const handleDownloadPdf = async (filename) => {
    console.log("itme:", item)
    const element = printRef.current;
    const padding = 10
    const pdf = new jsPDF({orientation: 'p', unit:'mm', size: [297, 210]})
    const  canvas = await html2canvas(element)
    const imgData = canvas.toDataURL("image/png");
    // console.log("imgData: \n",imgData)
    const imgProps= pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth()-padding;
    const pdfHeight = (imgProps.height * pdfWidth) / (imgProps.width);

    pdf.addImage(imgData, 'PNG', padding, padding, pdfWidth-padding, pdfHeight-padding, undefined, "FAST");
    pdf.save(filename+'.pdf');    
  };

const preparePdfName = elem => {
  let result = "factura_"
  const {Invoice} = elem || {}
  if ( item.Invoice['cbc:ID'] && item.Invoice['cbc:IssueDate']) {
      result += typeof item.Invoice['cbc:ID'] === "object" ? item.Invoice['cbc:ID']["#"] : item.Invoice['cbc:ID']
      result += "__"
      result += typeof item.Invoice['cbc:IssueDate'] === "object" ? item.Invoice['cbc:IssueDate']["#"] : item.Invoice['cbc:IssueDate']
  } else {
    result +=moment().format("YYYY-MM-DD")
  }
      return result      
                  
}


const { getRootProps, getInputProps } = useDropzone({ onDrop })


return (
  <React.Fragment>
    <Container maxWidth="lg">
      {/* <Box sx={{ my: 4 }}> */}
        <Grid container>
          <Grid item xs = {12} align="center">
            <br/>
          <Typography variant="h5" component="h3" gutterBottom style = {{fontWeight: 800, color: "navy"}}>
            CONVERSIE XML E-FACTURA (RO) ??N FORMAT TIP??RIBIL
          </Typography>
          </Grid>
          {!item
            ? (
              <Grid item xs = {12}>
                <Card style = {{padding: "10px", border: "2px dashed lightgrey", boxShadow:"none"}}>
                  <Typography variant = "caption" align="center">
                      Acest utilitar este destinat institu??iilor publice din Rom??nia, ??i se dore??te a fi o alternativ?? mai facil?? la solu??ia pus?? la dispozi??ie de ANAF (utilitarul JAVA).{' '}
                      Serviciul de fa???? este un proiect open-source, oferit "a??a-cum-este" sub licen???? MIT, dezvoltat ??i sus??inut de {' '}
                      <a href = "https://gmaftei.ro" target = "_blank">Maftei Gabriel-Claudiu P.F.A. Arad</a>,{' '}
                       codul surs?? fiind disponibil aici{' '}{' '}
                      <a href ="https://github.com/gabizz/e-factura-xml2print" target = "_blank">https://github.com/gabizz/e-factura-xml2print</a>
                      <hr style = {{border: "1px dashed lightgrey"}} />
                      <div style={{color: "red", align:"center", fontWeight: "700"}}>
                      Pe m??sura feed-back-ului pe care ??l primim, ??ncerc??m s?? facem acest?? solu??ie compatibil?? cu facturile emise din c??t mai multe aplica??ii de facturare.
                      </div>
                  </Typography>
                  
                </Card>
                <br/>
              <div {...getRootProps()} style={{ border: "3px solid navy", height: "45vh" }}>
                <input {...getInputProps()} />
                <p align="center" style = {{fontSize: "2rem", fontWeight:800, color: "lightgrey"}}>
                  Trage??i fi??ierul XML e-factura aici, <br/>sau face??i click pentru a-l ??nc??rca manual
                </p>
              </div>
                <br/>
                <Card style = {{padding: "10px", border: "2px dashed lightgrey", boxShadow:"none", background: "aliceblue"}}>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item xs = {10}>
                <strong style={{color: "red"}}>OPERA??IUNE INVERS??  </strong> &nbsp; <i>- formular web pentru generare XML e-Factura pus la dispozi??ie de ANAF</i>
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
                    onClick={() => setItem(null)}>coverte??te o alt?? factur??</Button>
                 </Grid>
                 <Grid item xs = {6} align="right">
                  <Button 
                    variant = "outlined" color ="secondary"
                    startIcon = {<MdPictureAsPdf/>}
                    onClick = {()=>handleDownloadPdf(preparePdfName(item))
                  } >Salveaz?? PDF</Button>
                  &nbsp;
                 <Button 
                    color="primary" variant = "outlined" 
                    startIcon = {<MdPrint/>}
                    onClick={printHandler}>tip??re??te factura</Button>
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


