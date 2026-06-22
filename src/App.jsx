import { useState, useEffect, useRef, useMemo } from "react";
import { useTasks } from "./hooks/useTasks";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import DarkModeBtn from "./components/DarkModeBtn";
import TaskModal from "./components/TaskModal";
import Summary from "./components/Summary";
import Browse from "./components/Browse";
import "./App.css";

function App() {
  // -- states --
  const { tasks, addTask, deleteTask, toggleTask, updateTask, deleteTasks, reorderTasks } = useTasks();
  
  const handleAddTask = (text, priority) => {
    addTask(text, priority);
    setIsModalOpen(true);
    setModalType('success');
  };

  const handleDeleteAll = () => {
    deleteTasks();
    setTimeout(() => {
      setIsDeletingAll(false);
    }, 400);
  };

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

  // boton de scroll
  const scrollToForm = () => {
    if(formRef.current) {
      formRef.current.scrollIntoView( { behavior: 'smooth'} );
    }
  }

  // Function handler
  const taskActions = {
    delete: deleteTask,
    toggle: toggleTask,
    reorder: reorderTasks,
    update: updateTask,
    deleteAll: handleDeleteAll
  }

  return (
    <div>
      <h1>ADMINISTRADOR DE TAREAS</h1>

      <DarkModeBtn   
        OnTogglesDark={togglesDarkMode}
        isDarkMode={isDarkMode}
      />
      <div ref={formRef}>
      <TaskForm onAddTask={handleAddTask} />
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
