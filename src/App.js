import { BrowserRouter , Route, Router, Routes, useParams } from 'react-router-dom';
import Data from './Data';
import AppM from './AppM';

import '@mui/material/styles';

// /get-all-visits


function App() {
  

  // console.log("events", events)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={ <Data />} />
         <Route path='/mui' element={<AppM />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;



