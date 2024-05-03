import { BrowserRouter , Route, Router, Routes, useParams } from 'react-router-dom';
import Data from './Data';



// /get-all-visits


function App() {
  

  // console.log("events", events)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={ <Data />} />
         
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;



