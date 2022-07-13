import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { Grid } from '@mui/material';

export default function Copyright() {
  return (
    <div style={{
      position: "fixed", left: 0, bottom: 0, height: "30px", background: "lightgrey",
      width: "100%", padding: "4px 10px 4px 10px"
    }}>
      <Grid container justifyContent = "space-between">
        <Grid item sm ="true">
          <small>
            {'Copyright © '}  {new Date().getFullYear()} {' - '}
            <MuiLink color="inherit" href="https://gmaftei.ro">
              MAFTEI GABRIEL CLAUDIU PFA ARAD
            </MuiLink>{' '}
          </small>
        </Grid>
        <Grid item sm="true">
          <small>
        <strong style = {{color:"darkred"}}>NOTĂ GDPR:</strong>{' '}
                       <i>Această aplicație web nu colecteză date de nici un fel
                        (toate procesările sunt realizate pe calculatorul Dvs., în browser-ul web) </i>
                        </small>

        </Grid>
      </Grid>



    </div>
  );
}
