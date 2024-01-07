
export default function FibCodes() {
   return (
      <div>
         <div >
            <h6 className="my-1">1. Recursive Solutions:</h6>
            <pre className='p-2' style={{
               whiteSpace: 'pre-line'
            }}>
               {`function fibonacci(n: number): number {
                        if (n <= 1) {
                           return n;
                        }
                        return fibonacci(n - 1) + fibonacci(n - 2);
                  }`}
            </pre>
         </div>

         <div className='my-2'>
            <h6 className="my-1">2. Memoized Recursive Solution:</h6>
            <pre className='p-2' style={{
               whiteSpace: 'pre-line'
            }}>
               {`function fibonacciMemoized(n, memo = {}) {
                           if (n <= 1) {
                              return n;
                           }
                           if (memo[n]) {
                              return memo[n];
                           }
                           memo[n] = fibonacciMemoized(n - 1, memo) + fibonacciMemoized(n - 2, memo);
                           return memo[n];
                           }`}
            </pre>
         </div>

         <div className='my-2'>
            <h6 className="my-1">3. Iterative Solution::</h6>
            <pre className='p-2' style={{
               whiteSpace: 'pre-line'
            }}>
               {`function fibonacciIterative(n) {
                        let a = 0;
                        let b = 1;
                        for (let i = 2; i <= n; i++) {
                           let temp = a + b;
                           a = b;
                           b = temp;
                        }
                        return b;
                        }`}
            </pre>
         </div>


         <div className='my-2'>
            <h6 className="my-1">4. Dynamic Programming Solution:
            </h6>
            <pre className='p-2' style={{
               whiteSpace: 'pre-line'
            }}>
               {`function fibonacciDynamicProgramming(n) {
                     let fib = [0, 1];
                     for (let i = 2; i <= n; i++) {
                        fib[i] = fib[i - 1] + fib[i - 2];
                     }
                     return fib[n];
                     }`}
            </pre>
         </div>


      </div>
   )
}
