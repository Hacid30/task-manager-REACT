import { useState, useEffect } from "react";

export function useTasks() {
    // -- states --
    const [ tasks, setTasks ] = useState(() => {
        const savedTasks = localStorage.getItem('my_tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    }); 

    //Use localstorage to save tasks in the browser
    useEffect(() =>{
        localStorage.setItem('my_tasks', JSON.stringify(tasks));
    },[tasks]);

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

    const updateTask = (id, newText, newPriority) => {
    const updatedTasks = tasks.map((task) => 
        task.id === id ? {...task, text: newText, priority: newPriority } : task
    );
    setTasks(updatedTasks);
    }

    const deleteTasks = () => {
        setTimeout(() => {
            setTasks([]);
        }, 400);
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

    return {
        tasks,
        addTask,
        deleteTask,
        toggleTask,
        updateTask,
        deleteTasks,
        reorderTasks
    }
}