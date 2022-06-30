import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export default function Copyright() {
  return (
    <div style = {{position: "relative", textAlign:"center"}}>
      {'Copyright © '}  {new Date().getFullYear()} {' - '}
      <MuiLink color="inherit" href="https://gmaftei.ro">
        MAFTEI GABRIEL CLAUDIU PFA ARAD
      </MuiLink>{' '}
     
    
    </div>
  );
}
