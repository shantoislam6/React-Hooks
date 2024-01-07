/* eslint-disable react-refresh/only-export-components */
import { ReactNode, useState, createContext, useContext, KeyboardEvent, MouseEvent } from 'react';

interface modalDataInterface {
   template?: ReactNode;
   title?: ReactNode;
   body?: ReactNode;
   closeCallBack?: (data: object) => void;
}

interface ModelContextProps {
   openModal: (modalData: modalDataInterface) => void;
   closeModal: (data: object) => void;
}

const ModelContext = createContext<ModelContextProps>({
   openModal: () => { },
   closeModal: () => { },
});

interface ModalsProps {
   children?: ReactNode;
}

export function ModalProvider({ children }: ModalsProps): ReactNode {
   const [open, setOpen] = useState(false);
   const [modalData, setModalData] = useState<modalDataInterface | null>(null);

   const closeModalHandler = (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setOpen(false);
      modalData?.closeCallBack?.({
         closeType: 'default/mouseClick',
         default: true,
      });
   };

   const escapeKeyHandler = (e: KeyboardEvent<HTMLDialogElement>) => {
      if (e.key === 'Escape') {
         setOpen(false);
         modalData?.closeCallBack?.({
            closeType: 'Key/Escape',
            default: true,
         });
      }
   };

   const openModal = (openModelData: modalDataInterface) => {
      setOpen(true);
      setModalData(openModelData);
   };

   const closeModal = (data: object = {}) => {
      setOpen(false);
      modalData?.closeCallBack?.(data);
   };

   return (
      <ModelContext.Provider value={{ openModal, closeModal }}>
         <dialog onKeyUp={escapeKeyHandler} open={open}>
            <article>
               {modalData?.template ? (
                  modalData.template
               ) : (
                  <>
                     <header>
                        <a href="#close" onClick={closeModalHandler} aria-label="Close" className="close">
                        </a>
                        {modalData?.title}
                     </header>
                     <div>{modalData?.body}</div>
                  </>
               )}
            </article>
         </dialog>
         {children}
      </ModelContext.Provider>
   );
}

export function useModal() {
   return useContext(ModelContext);
}
