import { Task } from "../types";
import React, { useState } from "react";

interface TaskFormProps {
    onAddTask: (inputValue: string, priority: Task['priority']) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {
    const [ inputValue, setInputValue ] = useState('');
    const [ priority, setPriority ] = useState < Task['priority']>('medium');
    const [ hasError, setHasError] = useState(false);

    const handSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(inputValue.trim() === '') {
            setHasError(true);
            return
        };

        onAddTask(inputValue, priority);
        setInputValue('');
        setPriority('medium');
        setHasError(false);
    }

    return(
    <form onSubmit={handSubmit}>
        <label htmlFor="task-title" >Título: </label>
        <input 
            id="task-title"
            type="text"
            placeholder="Escribe una tarea..."
            value={inputValue}
            className={hasError ? `input-error` : ''}
            onChange={(e) =>setInputValue(e.target.value)}
        />

        {hasError && <p className="error" >¡Ey! No puedes dejar el título vacío</p>}

        <label htmlFor="task-priority">Prioridad: </label>
        <select 
            id="task-priority"
            value={priority}  onChange={(e) => setPriority(e.target.value as Task['priority'])}
        >
            <option value='high'>Alta</option>
            <option value='medium'>Media</option>
            <option value='low'>Baja</option>
        </select>

        <button type="submit" className="approved">Agregar</button>
    </form>
    )
}

export default TaskForm;