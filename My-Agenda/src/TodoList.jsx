import { useState, useEffect } from 'react';
import { useTasks } from './hooks.js';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const TodoList = () => {
    const {tasks, setTasks} = useTasks([]);
    const [newTask, setNewTask] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newTaskDate, setNewTaskDate] = useState('');
    const [newTaskHour, setNewTaskHour] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [taskStatus, setTaskStatus] = useState({});
    const [selectedTaskDescription, setSelectedTaskDescription] = useState('');
    const [showDescription, setShowDescription] = useState(false); // Estado para controlar la visibilidad de la ventana emergente


    const handleLogin = () => {
        if (username === 'johnfredycorrea75@gmail.com' && password === '1512021931') {
            setIsLoggedIn(true);
        } else {
            alert('Credenciales incorrectas');
        }
    };

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        async function getTasks() {
            try {
                const response = await axios.get('http://localhost:3001/tasks');
                const tasksWithId = response.data.map(task => task._id ? task : { ...task, _id: generateUniqueId() });
                setTasks(tasksWithId);
                console.log("Datos de la API:", tasksWithId);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener las tareas:', error);
                setLoading(false);
            }
        }
      
        getTasks();
    }, []);

    const generateUniqueId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    async function addTaskBackend(newTask) {
        try {
            const response = await axios.post('http://localhost:3001/tasks', {
                ...newTask,
                iscompleted: taskStatus[newTask._id],
            });
            console.log("Tarea agregada exitosamente");
            return response;
        } catch (error) {
            console.error('Error al agregar la tarea al backend:', error);
            throw error;
        }
    }
    

    async function addTask() {
        if (newTask.trim()) {
            const newId = uuidv4();

            const newTaskObj = {
                _id: newId,
                title: newTask.trim(),
                description: newTaskDescription.trim(),
                iscompleted: false, 
                date: newTaskDate,
                hour:newTaskHour,
            };

            try {
                await addTaskBackend(newTaskObj);
                const updatedTasks = [newTaskObj, ...tasks];
                setTasks(updatedTasks);
                setNewTask('');
                setNewTaskDescription('');
                setNewTaskDate('');
                setNewTaskHour('');
            } catch (error) {
                console.error('Error al agregar la tarea en el backend:', error);
                throw error;
            }
        }
    }

    function deleteTask(_id) {
        const updatedTasks = tasks.filter(task => task._id !== _id);
        setTasks(updatedTasks);
    }

    function editTask(_id, newText) {
        const taskIndex = tasks.findIndex(task => task._id === _id);

        if(taskIndex !== -1) {
            const updatedTasks = [...tasks];
            updatedTasks[taskIndex] = {
                ...updatedTasks[taskIndex],
                title: newText,
            };
            setTasks(updatedTasks);
        }
    }

    const toggleTaskCompletion = async (_id) => {
      try {
          // Cambiar el estado de la tarea en el frontend
          const updatedTaskStatus = {
              ...taskStatus,
              [_id]: !taskStatus[_id],
          };
          setTaskStatus(updatedTaskStatus);
  
          // Enviar solicitud PUT al backend para actualizar el estado de la tarea
          await axios.put(`http://localhost:3001/tasks/${_id}/completed`, {
              iscompleted: updatedTaskStatus[_id],
          });
      } catch (error) {
          console.error('Error al marcar la tarea como completada:', error);
          // Si ocurre un error, revertir el cambio de estado en el frontend
          setTaskStatus((prevStatus) => ({
              ...prevStatus,
              [_id]: !prevStatus[_id],
          }));
      }
  };
    

    const showTaskDescription = (description) => {
      setSelectedTaskDescription(description);
      setShowDescription(true); // Mostrar la ventana emergente al hacer clic en el botón
};

    const hideTaskDescription = () => {
      setSelectedTaskDescription('');
      setShowDescription(false); // Ocultar la ventana emergente
};
  


    

    if (!isLoggedIn) {
        return (
            <div className='container'>
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'
                />
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        );
    }

    return (
        <div className='container'>
            <input
                type='text'
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder='Enter a new task'
            />
            <input
                type='text'
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder='Enter your description'
                />
            <input
                type='date'
                value={newTaskDate}
                onChange={(e) => setNewTaskDate(e.target.value)}
                />
            <input
                type='time'
                value={newTaskHour}
                onChange={(e) => setNewTaskHour(e.target.value)}
                />        
            <button onClick={addTask}>Add Task</button>
            <div className='tasklist'>
                {tasks.map((task) => (
                    <li className={`task-item ${taskStatus[task._id] ? 'completed' : ''}`} key={task._id}>
                        {task.title}
                        <div className='task-item-button-edit'>
                            <button onClick={() => editTask(task._id, prompt('Enter the edited task'))}>Edit</button>
                        </div>
                        <div className='task-item-button-delete'>
                            <button onClick={() => deleteTask(task._id)}>Delete</button>
                        </div>
                        <div className='task-item-button-complete'>
                            <button onClick={() => toggleTaskCompletion(task._id)}>
                                {taskStatus[task._id] ? 'Undo' : 'Complete'}
                            </button>
                        </div>
                        {/* Agregar botón para mostrar la descripción */}
                        <div className='task-item-button-show-description'>
                            <button onClick={() => showTaskDescription(task.description)}>Description</button>
                        </div>
                    </li>
                ))}
            </div>
            {/* Ventana emergente para mostrar la descripción de la tarea */}
            {showDescription && (
                <div className="task-description-popup">
                    <div className="popup-content">
                        <span className="close" onClick={hideTaskDescription}>&times;</span>
                        <p>{selectedTaskDescription}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoList;
