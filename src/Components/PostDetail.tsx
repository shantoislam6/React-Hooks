import { ReactNode } from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';


 export default function PostDetail():ReactNode{
   const {state} = useLocation();
   const navigate = useNavigate();

  return (
    <div className="bg-black p-2 mt-2">
      <br />
      <Link
        to={'..'}
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        Go back
      </Link>
      <hr />
      <h5>{state.post.title}</h5>

      <p>{state.post.body}</p>

    </div>
  );
}

