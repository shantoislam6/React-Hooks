import { MouseEvent, useState } from "react";


export default function ThemeToggleBtn() {

   const [themeToggle, setThemeToggle] = useState(false);

   const changeThemeHandler = (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const theme: string = !themeToggle ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      setThemeToggle(prevThemeToggle => !prevThemeToggle);
   };

   return (
      <a className="theme__btn"
         href="#"
         onClick={changeThemeHandler}>
            {!themeToggle ? '\u263C' : '\u263D'}
         </a>
   );
}