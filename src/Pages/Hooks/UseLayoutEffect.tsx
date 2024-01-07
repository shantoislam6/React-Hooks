import { useState, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

export default function UseLayoutEffect() {
   const [messageCount, setMessageCount] = useState(30);
   const chatContainerRef = useRef<HTMLDivElement | null>(null);

   useLayoutEffect(() => {
      chatContainerRef.current!.scrollTop = chatContainerRef.current!.scrollHeight;
   }, [messageCount]);

   const addMessage = () => {
      setMessageCount((prevCount) => prevCount + 1);
   };

   const removeMessage = () => {
      if (messageCount > 1) {
         setMessageCount((prevCount) => prevCount - 1);
      }
   };

   const generateMessages = () => {
      return Array.from({ length: messageCount }, (_, index) => `Message ${index + 1}`);
   };

   return (
      <div>
         <div className='mt-3 px-3'>
            <Link to="/useEffect" >Go back to useEffect</Link>
         </div>

         <div className='row'>
            <div className='col-12 p-2'>
               <h2 className='my-1'>Chat Component</h2>
               <div
                  ref={chatContainerRef}
                  className='bg-black'
                  style={{
                     height: '500px',
                     overflowY: 'auto',
                     padding: '20px'
                  }}
               >
                  {generateMessages().map((message, index) => (
                     <div key={index}>{message}</div>
                  ))}
               </div>
               <button onClick={addMessage}>Add Message</button>
               <button onClick={removeMessage}>Remove Message</button>
            </div>

         </div>
      </div>

   );
}

