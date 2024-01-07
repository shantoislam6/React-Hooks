import { ReactNode, useState } from "react";
import { useModal } from "../../libs/Modals";
import FormModalComponent from "../../Components/FormModalComponent";

interface User {
   id: number;
   firstName: string;
   lastName: string;
   email: string;
   agree: boolean;
}

const initialUsers = [
   { id: 1, firstName: "Shanto", lastName: "Islam", email: "ishanto412@gmail", agree: true },
   { id: 2, firstName: "Abu", lastName: "Talha", email: "abutTalha44@yahoo.com", agree: false },
];

function UseContext(): ReactNode {
   const { openModal } = useModal();
   const [users, setUsers] = useState<User[]>(initialUsers);

   const openModalDialog = () => {
      openModal({
         template: <FormModalComponent />,
         closeCallBack: (newUserData) => {
            setUsers((prevUsers) => [...prevUsers, newUserData as User]);
         },
      });
   };

   return (
      <div className="use__context">
         <div className="row centered">
            <div className="col-5 my-2">
               <button onClick={openModalDialog}>Create User 😎</button>
            </div>
         </div>
         <div className="user-list">
            <h2 className="mb-1">Users</h2>
            <hr />
            <ul className="mt-1">
               {users.map((user) => (
                  <li key={user.id}>{user.firstName} {user.lastName}  <a href={'mailto:' + user.email}>{user.email}</a> </li>
               ))}
            </ul>
         </div>
      </div>
   );
}

export default UseContext;
