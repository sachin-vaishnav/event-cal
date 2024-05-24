import { TextField } from '@mui/material'
import React from 'react'
import '@mui/material/styles';

const AppM = () => {
  return (
    <div className='' style={{ padding:'50px'}}>
<TextField id="outlined-basic" label="Outlined" variant="outlined" 
 sx={{ width: '350px' }}
/>
<button>Submit</button>

    </div>
  )
}

export default AppM