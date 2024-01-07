import { useState, useEffect, ReactNode, useRef } from 'react';
import { Link, Route, Routes} from 'react-router-dom';
import PostDetail from '../../Components/PostDetail';

interface Post {
   id: number;
   title: string;
}

export default function UseEffect(): ReactNode {
   const [data, setData] = useState<Post[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const timeoutIdRef = useRef<number | null>(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const result: Post[] = await response.json();
            setData(result);
         } catch (error) {
            console.error('Error fetching data:', error);
         } finally {
            timeoutIdRef.current = setTimeout(() => {
               setLoading(false);
            }, 1000);
         }
      };

      fetchData();

      // return () => {
      //    if (timeoutIdRef.current) {
      //       clearTimeout(timeoutIdRef.current);
      //    }
      // };
   }, [loading]);

   return (
      <div>
         <h2 className='mb-1'>UseEffect</h2>

         <p>The empty dependency array means this effect runs once, similar to componentDidMount</p>

         <div className='row'>
            <div className='col-4'>
               <button onClick={() => setLoading(!loading)}>Refresh The page</button>
            </div>
         </div>

         <div className='mb-2'>
            <Link to="/useLayoutEffect" >Also check the useLayoutEffect</Link>
         </div>

         <hr />
         {loading ? (
            <p>Loading...</p>
         ) : (
            <Routes>
               <Route index element={<ul className='mt-1'>
                  {data.map((post) => (
                     <li key={post.id}>
                        <Link to={`/useEffect/${post.id}`} state={{ post }}>{post.title}</Link>
                     </li>
                  ))}
               </ul>} />
               <Route path="/:id" element={<PostDetail />} />
            </Routes>
         )}
      </div>
   );
}
