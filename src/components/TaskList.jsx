import { useState } from "react";

function TaskList({
    tasks, 
    allTasksCount,
    onDeleteTask,
    onToggleTask, 
    onOpenEdit,  
    onReorderTasks,
    modalType,
    setIsModalOpen,
    isDeletingAll,
    filter,
    tick
    }){

    if(allTasksCount.length === 0){
        return <p className="no-tasks-message">No tienes tareas registradas</p>;
    }

    if(tasks.length === 0){
        if(filter === 'pending'){
            return <p className="no-tasks-message">No tienes tareas pendientes.</p>
        }
        if(filter === 'completed'){
            return <p className="no-tasks-message">No tienes tareas realizadas.</p>
        }

        return <p className="no-tasks-message">No se encontraron tareas que coincidan con la búsqueda.</p>
    }

    const handleDragStar = (e, id) => {
        e.dataTransfer.setData('text/plain', id);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetId) => {
        e.preventDefault();
        const draggedId = Number(e.dataTransfer.getData('text/plain'));
        if(draggedId !== targetId){
            onReorderTasks(draggedId, targetId);
        }
    };

    const formatDistanceToNow = window.dateFns?.formatDistanceToNow;

    return(
        <div>
            <ul className={`${isDeletingAll ? 'eliminating' : ''} list`}>                
                {tasks.map((task) => {
                    let timeAgo = 'Hace un momento';

                    //If the task was created less than 5 seconds ago, it is considered "new"
                    const now = Date.now();
                    const dateCreation = task.date ? new Date(task.date).getTime() : task.id;
                    let isNew = (now - dateCreation) < 3000;

                    if(window.dateFns && formatDistanceToNow) {
                        try {
                            const dateToParse = task.date ? new Date(task.date) : new Date(task.id);

                            if(!isNaN(dateToParse.getTime())){
                                const spanishLocale = window.dateFns.locale?.es;;

                                timeAgo = window.dateFns.formatDistanceToNow(dateToParse, {
                                    addSuffix: true,
                                    locale: spanishLocale
                                })
                            }
                        } catch (error) {
                            console.error("Error al formatear fecha:", error);
                        }
                    }

                    return (
                        <li key={task.id} 
                            className={`${task.priority} 
                                ${isNew ? 'new' : ''}
                                ${task.isDeleting ? 'eliminating' : ''}`}
                            draggable={true}
                            onDragStart={(e) => handleDragStar(e, task.id)}
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
                                onClick={() => onToggleTask(task.id)} 
                            > &#10004; </button>

                            <button 
                                onClick={() => onOpenEdit(task)}
                                className="edit"
                            > Editar </button>

                            <button 
                                onClick={() => {onDeleteTask(task.id);
                                    modalType('eliminated');
                                    setIsModalOpen(true)
                                }}
                                className="eliminate" 
                            > Eliminar </button> 
                            </div>
                        </li>
                    )})}
            </ul>
        </div>
    )
}

export default TaskList;