import { useState, useEffect, useRef, useMemo } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import DarkModeBtn from "./components/DarkModeBtn";
import TaskModal from "./components/TaskModal";
import Summary from "./components/Summary";
import Browse from "./components/Browse";
import "./App.css";

function App() {
  // -- states --
  const [ tasks, setTasks ] = useState(() => {
    const savedTasks = localStorage.getItem('my_tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  }); 
  
  const [ filters, setFilters ] = useState({
    status: 'all',
    search: '',
    dateSort: '',
    priority: ''
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }

  const [ isDarkMode, setIsDarkMode ] = useState(false);
  const [ taskToEdit, setTaskToEdit ] = useState(null);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ modalType, setModalType ] = useState('');
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  const formRef = useRef(null);

  //Use localstorage to save tasks in the browser
  useEffect(() =>{
    localStorage.setItem('my_tasks', JSON.stringify(tasks));
  },[tasks]);

  //Filter

  const tasksToRender = useMemo(() => {
    let filtered = [...tasks];
    
    if(filters.status === 'pending'){
      filtered = filtered.filter(task => !task.completed);
    } else if(filters.status  === 'completed'){
      filtered = filtered.filter(task => task.completed);
    }

    if(filters.search.trim() !== ''){
      filtered = filtered.filter(task => 
        task.text.toLowerCase().includes(filters.search.toLocaleLowerCase()));
    }

    if(filters.dateSort === 'recent'){
      filtered = filtered.toSorted((a,b) => b.date - a.date);
    }else if(filters.dateSort === 'oldest'){
      filtered = filtered.toSorted((a,b) => a.date - b.date);
    }

    if(filters.priority !== ''){
      filtered =  filtered.filter(task => task.priority === filters.priority)
    }

    return filtered;
  }, [tasks, filters]);

  const togglesDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  }

  const updateTask = (id, newText, newPriority) => {
    const updatedTasks = tasks.map((task) => 
      task.id === id ? {...task, text: newText, priority: newPriority } : task
    );

    setTasks(updatedTasks);
  }

  useEffect(() => {
    if(isDarkMode){
      document.body.classList.add("dark");
    }else{
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  //Effect to automatically activate dark mode between 8:00 pm and 6:00 am
  useEffect(() =>{
    const currentHour = new Date().getHours();
    if(currentHour>=20 || currentHour<=6){
      setIsDarkMode(true);
    }
  },[]);

  //Add tasks
  const addTask = (text, priority) => {
    if(text.trim() === '') return;
    
    const newTask = {
      id : Date.now(),
      text : text,
      priority: priority,
      date : Date.now(),
      completed: false
    };
    setTasks([...tasks, newTask]);

    setIsModalOpen(true);
    setModalType('success');
  };

  const deleteTask = (id) => {
    setTasks(prevTask =>
      prevTask.map(task =>
        task.id === id ? {...task, isDeleting: true } : task
      )
    );

    setTimeout(() =>{
      setTasks(prevTask => prevTask.filter( (task) => task.id !== id ));
    }, 400);
  };

  const toggleTask = (id) => {
    const updateTasks = tasks.map( (task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    setTasks(updateTasks);
  };

  const reorderTasks = (draggedId, targetId) => {
    const draggedIndex = tasks.findIndex(task => task.id === draggedId);
    const targetIndex = tasks.findIndex(task => task.id === targetId);

    if(draggedIndex === -1 || targetIndex === -1) return;

    const newTasks = [...tasks];
    const [draggedTask] = newTasks.splice(draggedIndex, 1);
    newTasks.splice(targetIndex, 0, draggedTask);

    setTasks(newTasks);
  };

  // boton de scroll
  const scrollToForm = () => {
    if(formRef.current) {
      formRef.current.scrollIntoView( { behavior: 'smooth'} );
    }
  }

  const deleteTasks = () => {
    setTimeout( () => {
      setTasks([]);
      setIsDeletingAll(false)
    }, 400 )
  }

  const taskActions = {
    delete: deleteTask,
    toggle: toggleTask,
    reorder: reorderTasks,
    update: updateTask,
    deleteAll: deleteTasks
  }

  return (
    <div>
      <h1>ADMINISTRADOR DE TAREAS</h1>

      <DarkModeBtn   
        OnTogglesDark={togglesDarkMode}
        isDarkMode={isDarkMode}
      />
      <div ref={formRef}>
      <TaskForm onAddTask={addTask} />
      </div>

      <Browse
        tasks={tasks.length} 
        filters={filters}
        onFilterChange={handleFilterChange}
        taskActions={taskActions}
        setIsModalOpen={setIsModalOpen}
        modalType={setModalType}
        isDeletingAll={setIsDeletingAll}
      />

      <TaskList 
        tasks={tasksToRender} 
        allTasksCount={tasks}
        filters={filters}
        taskActions={taskActions}
        onOpenEdit={(task) => { 
          setTaskToEdit(task); 
          setIsModalOpen(true);
          setModalType('editing');
        }} 
        setIsModalOpen={setIsModalOpen}
        modalType={setModalType}
        isDeletingAll={isDeletingAll}
      />

      {isModalOpen && (
        <div className={`modal active`}> 
          <div className="modal-content">
          <TaskModal
            onUpdateTask={updateTask}
            task={taskToEdit}
            onClose={() => {setIsModalOpen(false);
              setModalType('');
            }}
            sendModalType={setModalType}
            modalType={modalType}
          />
          </div>
        </div>
      )}

      <Summary
        tasks={tasksToRender}
        onTasksGlobal={tasks}
        onScroll={scrollToForm}
      />
    </div>
  )
}

export default App;
