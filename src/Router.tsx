import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from './Pages/Home';
import UseState from './Pages/Hooks/UseState';
import UseContext from "./Pages/Hooks/UseContext";
import { ReactNode } from "react";
import UseEffect from "./Pages/Hooks/UseEffect";
import UseMemo from "./Pages/Hooks/UseMemo";
import UseLayoutEffect from "./Pages/Hooks/UseLayoutEffect";
import UseReducer from "./Pages/Hooks/UseReducer";
import NavBar from "./Components/NavBar";


export default function Router(): ReactNode {

   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<NavBar />}>
               <Route index element={<Home />} />
               <Route path='/index' element={<Navigate to="/" replace={true}/>} />
               <Route path='/reacthooks' element={<Navigate to="/" replace={true}/>} />
               <Route path='/useState' element={<UseState />} />
               <Route path='/useContext' element={<UseContext />} />
               <Route path='/useEffect/*' element={<UseEffect />} />
               <Route path='/useLayoutEffect' element={<UseLayoutEffect />} />
               <Route path='/useMemo' element={<UseMemo />} />
               <Route path='/useReducer' element={<UseReducer />} />
               <Route path="*" element={<div className="p-3"><h4>(404) - Page Not </h4></div>} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
}


