import { useState } from "react";

function TaskForm({ onAddTask }) {
    const [ inputValue, setInputValue ] = useState('');
    const [ priority, setPriority ] = useState('media');
    const [ hasError, setHasError] = useState(false);

    const handSubmit = (e) => {
        e.preventDefault();
        if(inputValue.trim() === '') {
            setHasError(true);
            return
        };

        onAddTask(inputValue, priority);
        setInputValue('');
        setPriority('media');
        setHasError(false);
    }

    return(
    <form onSubmit={handSubmit}>
        <label>Título: </label>
        <input 
            type="text"
            placeholder="Escribe una tarea..."
            value={inputValue}
            className={hasError ? `input-error` : ''}
            onChange={(e) =>setInputValue(e.target.value)}
        />

        {hasError && <p className="error" >¡Ey! No puedes dejar el título vacío</p>}

        <label>Prioridad: </label>
        <select value={priority}  onChange={(e) => setPriority(e.target.value)}>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
        </select>
        
        <button type="submit" className="approved">Agregar</button>
    </form>
    )
}

export default TaskForm;