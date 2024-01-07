import { ReactNode, useId, useState } from 'react';
import { useModal } from '../libs/Modals';

interface SignupFormInterface {
   id: string
   firstName: string;
   lastName: string;
   email: string;
   agree: boolean;
}

const intialFormData: SignupFormInterface = {
   id: '',
   firstName: '',
   lastName: '',
   email: '',
   agree: false,
}

export default function FormModalComponent(): ReactNode {
   const { closeModal } = useModal();
   const [formData, setFormData] = useState<SignupFormInterface>(intialFormData);

   // useid 
   const uid = useId();

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;

      setFormData((prevData) => ({
         ...prevData,
         [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
   };

   const sendSignUpForm = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      formData['id'] = uid;
      closeModal(formData);
      setFormData(intialFormData)
   };

   return (

      <form onSubmit={sendSignUpForm}>
         <div className="grid">
            <label htmlFor="firstname">
               First name
               <input
                  type="text"
                  id="firstname"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
               />
            </label>

            <label htmlFor="lastname">
               Last name
               <input
                  type="text"
                  id="lastname"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
               />
            </label>
         </div>

         <label htmlFor="email">
            Email address
            <input
               type="email"
               id="email"
               name="email"
               placeholder="Email address"
               value={formData.email}
               onChange={handleInputChange}
               required
            />
            <small>We'll never share your email with anyone else.</small>
         </label>

         <label htmlFor="terms">
            <input
               type="checkbox"
               required
               id="terms"
               name="agree"
               checked={formData.agree}
               onChange={handleInputChange}
            />
            I agree to the Terms and Conditions
         </label>
         <br />
         <button type="submit">Create User</button>
      </form>
   );
}
