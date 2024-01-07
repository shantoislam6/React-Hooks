import { useState, useMemo, ReactNode} from 'react';
import { useModal } from '../../libs/Modals'
import FibCodes from '../../Components/FibCodes';

function fib(n: number): number {
   if (n <= 1) {
      return n;
   }
   return fib(n - 1) + fib(n - 2);
}

export default function FibonacciComponent(): ReactNode {
   const [fibonacciIndex, setFibonacciIndex] = useState<number>(30);

   const { openModal } = useModal();

   const fibNum = useMemo(() => fib(fibonacciIndex), [fibonacciIndex])

   const handleCalculateFibonacci = () => {
      setFibonacciIndex(fibonacciIndex + 1);
   };

   const openModalHandler = () => {
      openModal({
         title: <span>Fibannocci Solution</span>,
         body: <FibCodes />
      })
   }

   return (
      <div>
         <h2>Fibonacci Calculator Component</h2>
         <p>Fibonacci Index: {fibonacciIndex}</p>
         <p>Fibonacci Number: {fibNum}</p>
         <button onClick={handleCalculateFibonacci}>Calculate Next Fibonacci</button>

         <div>
            <h6 className='mt-2'> The Fibonacci numbers may be defined by the recurrence relation</h6>
            <hr />
            <div className='row'>
               <div className='col-4'>
                  <button onClick={openModalHandler}>Fibannocci Solutions</button>
               </div>
            </div>

         </div>
      </div>
   );
}
