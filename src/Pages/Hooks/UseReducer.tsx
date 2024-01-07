import { ReactNode, createContext, useContext, useState } from 'react';


// Implement React useReducer
function useReducer<ST, AT>(reducer: (state: ST, action: AT) => ST, initialState: ST) {
   const [state, setState] = useState<ST>(initialState);

   const dispatch = (action: AT) => {
      setState((prevState) => reducer(prevState, action));
   };

   return [state, dispatch] as const;
}


interface task {
   id: number,
   text: string,
   done: boolean
}


// Actions
const TASK_ADD = 'TASK_ADD';
const TASK_CHANGED = 'TASK_CHANGED';
const TASK_DELETED = 'TASK_DELETED'
const TASK_CLEARED = 'TASK_CLEARED';

// Actions type interface
type TaskAction = {
   type: typeof TASK_ADD;
   text: string;
   id: number;
} | {
   type: typeof TASK_CHANGED;
   task: task,
} | {
   type: typeof TASK_DELETED;
   id: number;
} | {
   type: typeof TASK_CLEARED;
}


const TaskContext = createContext<{ tasks: task[], dispatch: (action: TaskAction) => void }>({
   tasks: [],
   dispatch: () => { },
});



function AddTask(): ReactNode {
   const [text, setText] = useState('');

   const { dispatch } = useContext(TaskContext);

   return (
      <>
         <input
            placeholder="Add task"
            value={text}
            onChange={e => setText(e.target.value)}
         />
         <button onClick={() => {
            setText('');
            dispatch({
               type: TASK_ADD,
               id: nextId++,
               text: text,
            });

         }}>Add</button>
      </>
   )
}



function Task({ task }: { task: task }): ReactNode {

   const [isEditing, setIsEditing] = useState<boolean>(false);
   const { dispatch } = useContext(TaskContext)


   let taskContent;
   let taskBtn;

   if (isEditing) {
      taskContent = (<input className='no-styled-input'
         value={task.text}
         onChange={e => {
            dispatch({
               type: TASK_CHANGED,
               task: {
                  ...task,
                  text: e.target.value
               }
            })
         }} />);
      taskBtn = <a className='col-1' onClick={() => setIsEditing(false)}>Save</a>;
   } else {
      taskContent = <span> {task.text}</span>;
      taskBtn = <a className='col-1' onClick={() => setIsEditing(true)}>Edit</a>;
   }

   return (
      <div className='my-2'>
         <div >
            <input
               type="checkbox"
               checked={task.done}
               onChange={e => {
                  dispatch({
                     type: TASK_CHANGED,
                     task: {
                        ...task,
                        done: e.target.checked
                     }
                  })
               }}
            />
            {taskContent}
         </div>
         <div className='row '>
            {taskBtn}
            <a className='col-1' onClick={() => {
               dispatch({
                  type: TASK_DELETED,
                  id: task.id
               })
            }}>
               Delete
            </a>
         </div>

      </div>
   );
}



function TaskList(): ReactNode {
   const { tasks } = useContext(TaskContext);
   return (
      <div>
         {tasks.map(task => (
            <div key={task.id}>
               <Task task={task} />
            </div>
         ))}
      </div>
   );
}



function tasksReducer(tasks: task[], action: TaskAction): task[] {

   switch (action.type) {
      case TASK_ADD: {
         return [...tasks, {
            id: action.id,
            text: action.text,
            done: false
         }];
      }
      case TASK_CHANGED: {
         return tasks.map(t => {
            if (t.id === action.task.id) {
               return action.task;
            } else {
               return t;
            }
         });
      }
      case TASK_DELETED: {
         return tasks.filter(t => t.id !== action.id);
      }
      case TASK_CLEARED: {
         return [];
      }

   }
}

let nextId = 3;
const initialTasks: task[] = [
   { id: 0, text: 'Philosopher\'s Path', done: true },
   { id: 1, text: 'Visit the temple', done: false },
   { id: 2, text: 'Drink matcha', done: false }
];


export default function UseReducer(): ReactNode {
   const [tasks, dispatch] = useReducer<task[], TaskAction>(
      tasksReducer,
      initialTasks
   );

   return (
      <div>
         <h1 className='my-1'>Task</h1>
         <TaskContext.Provider value={{ dispatch, tasks }}>
            <AddTask />
            <TaskList />
         </TaskContext.Provider>

      </div>

   );
}

