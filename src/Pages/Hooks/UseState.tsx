import { useState } from "react";



function UseState() {
   const [columnCount, setColumnCount] = useState(1);

   const addItem = () => {
      setColumnCount(columnCount + 1);
   };

   const removeItem = () => {
      if (columnCount > 1) {
         setColumnCount(columnCount - 1);
      }
   };

   const generateColumns = () => {
      return Array.from({ length: columnCount }, (_, index) => (
         <div key={index}>Column {index + 1}</div>
      ));
   };

   return (
      <div className='use__state'>
         <div className="row centered mt-1">
            <div className="col-10">
               <button className="secondary add" onClick={addItem}>
                  Add column &#10010;
               </button>
               <button className="secondary add" onClick={removeItem}>
                  Remove column &#9866;
               </button>
            </div>
         </div>
         <div className="my-1">
            <b>Total Column : ( {columnCount} )</b>
         </div>
         <div className="box">
            {generateColumns()}
         </div>
      </div>
   );
}

export default UseState;
