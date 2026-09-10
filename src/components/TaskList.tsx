import { Task } from "../types";
import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export interface TaskActions {
    delete: (id: number) => void;
    toggle: (id: number) => void;
    reorder: (draggedId: number, targetId: number) => void;
    update: (id: number, text: string, priority: string) => void;
    deleteAll: () => void;
}

export interface FilterStatus {
    status: 'all' | 'pending' | 'completed';
    search: string;
    dateSort: string;
    priority: string;
}

interface TaskListProps {
    tasks: Task[];
    allTasksCount: Task[];
    filters: FilterStatus;
    taskActions: TaskActions;
    onOpenEdit: (task: Task) => void;
    modalType: (type: string) => void;
    setIsModalOpen: (isOpen: boolean) => void;
    isDeletingAll: boolean;
}

const handleDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData('text/plain', id.toString());
};

const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
};


function TaskList({
    tasks, 
    allTasksCount,
    filters,
    taskActions,
    onOpenEdit, 
    modalType,
    setIsModalOpen,
    isDeletingAll
    } : TaskListProps){

    if(allTasksCount.length === 0){
        return <p className="no-tasks-message">No tienes tareas registradas</p>;
    }

    if(tasks.length === 0){
        if(filters.status === 'pending'){
            return <p className="no-tasks-message">No tienes tareas pendientes.</p>
        }
        if(filters.status === 'completed'){
            return <p className="no-tasks-message">No tienes tareas realizadas.</p>
        }

        return <p className="no-tasks-message">No se encontraron tareas que coincidan con la búsqueda.</p>
    }

    const handleDrop = (e: React.DragEvent, targetId: number) => {
        e.preventDefault();
        const draggedId = Number(e.dataTransfer.getData('text/plain'));
        if(draggedId !== targetId){
            taskActions.reorder(draggedId, targetId);
        }
    };

    return(
        <div>
            <ul className={`${isDeletingAll ? 'eliminating' : ''} list`}>                
                {tasks.map((task) => (
                    <TaskItem
                    key={task.id}
                    task={task}
                    taskActions={taskActions}
                    onOpenEdit={onOpenEdit}
                    handleDragStart={handleDragStart}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                    isDeletingAll={isDeletingAll}
                    modalType={modalType}
                    setIsModalOpen={setIsModalOpen}
                    />
                ))}
            </ul>
        </div>
    );
}

export default TaskList;

interface TaskItemProps {
    task: Task;
    taskActions: TaskActions;
    onOpenEdit: (task: Task) => void;
    handleDragStart: (e: React.DragEvent, id: number) => void;
    handleDragOver:  (e: React.DragEvent) => void;
    handleDrop: (e: React.DragEvent, id: number) => void;
    modalType: (type: string) => void;
    setIsModalOpen: (isOpen: boolean) => void;
    isDeletingAll: boolean;
}

const TaskItem = React.memo(({ 
    task, 
    taskActions,
    onOpenEdit, 
    handleDragStart, 
    handleDragOver, 
    handleDrop, 
    isDeletingAll, 
    modalType, 
    setIsModalOpen 
}: TaskItemProps) => {
    const [minuteTick, setMinuteTick] = useState(0);

    useEffect( () => {
        const interval = setInterval( () => {
        setMinuteTick(prev => prev +1);
    }, 60000);
    
    return () => clearInterval(interval);
    }, []);

    // == Time calculation logic ==
    let timeAgo = 'Hace un momento';
    
    //If the task was created less than 5 seconds ago, it is considered "new"
    const now = Date.now();
    const dateCreation = task.date ? new Date(task.date).getTime() : task.id;
    let isNew = (now - dateCreation) < 3000;

    try {
        const dateToParse = task.date ? new Date(task.date) : new Date(task.id);
        
        if(!isNaN(dateToParse.getTime())){
            timeAgo = formatDistanceToNow(dateToParse, {
                addSuffix: true,
                locale: es
            })
            }
        } catch (error) {
            console.error("Error al formatear fecha:", error);
        }

    return (
        <li key={task.id} 
            className={`${task.priority} 
                ${isNew ? 'new' : ''}
                ${task.isDeleting ? 'eliminating' : ''}`}
                draggable={true}
                onDragStart={(e) => handleDragStart(e, task.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, task.id)}
                style={{ cursor: 'move' }}
        > 
            <span className={task.completed ? 'made' : 'none'}>
                {`${task.text} | ${timeAgo} | ${task.priority}`}
            </span>

            <div className="listButtons">
                <button 
                    className={`${task.completed ? 'accomplished-btn' : 'none'} carriedOut`}
                    onClick={() => taskActions.toggle(task.id)} 
                    aria-label={task.completed ? `Marcar tarea "${task.text}" como pendiente` : `Marcar tarea "${task.text}" como completada`}
                > &#10004; </button>

                <button 
                    onClick={() => onOpenEdit(task)}
                    className="edit"
                    aria-label={`Editar tarea: ${task.text}`}
                > Editar </button>

                <button 
                    onClick={() => {
                        taskActions.delete(task.id);
                        modalType('eliminated');
                        setIsModalOpen(true)
                    }}
                    className="eliminate" 
                    aria-label={`Eliminar tarea: ${task.text}`}
                > Eliminar </button> 
            </div>
        </li>
    );
});

TaskItem.displayName = "TaskItem";
