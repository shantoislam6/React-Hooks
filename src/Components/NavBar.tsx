
import { Link, NavLink, Outlet } from 'react-router-dom';
import ThemeToggleBtn from './ThemeToggleBtn';
import reactIcon from '../assets/react.svg';
import { ModalProvider } from '../libs/Modals';

export default function NavBar() {
   return (
      <>
      <div className='container'>
         <nav className='navbar'>
            <ul>
               <li className='brand'>
                  <Link to="/"><img src={reactIcon} alt="brand-logo" className='brand-logo' />
                     <strong>REACT HOOKS</strong></Link>
               </li>
               <li >
                  <ThemeToggleBtn />
               </li>
            </ul>
            <ul>
               <li>
                  <NavLink to="/useEffect" >useEffect</NavLink>
               </li>

               <li>
                  <NavLink to="/useMemo">useMemo</NavLink>
               </li>

               <li>
                  <NavLink to="/useState">useState</NavLink>
               </li>
               <li>
                  <NavLink to="/useContext">useContext</NavLink>
               </li>
               <li>
                  <NavLink to="/useReducer">useReducer</NavLink>
               </li>
            </ul>
         </nav>
      </div>
      <hr />
      
      <div className="container">
         <ModalProvider>
            <Outlet />
         </ModalProvider>
      </div>
      </>
   );
}
