import { useState, useEffect } from "react";
import "../App.css"
import checkImg from '../assets/img/marca-verifica.avif'

function TaskModal({task, onUpdateTask, onClose, modalType, sendModalType}){
    const [editText, setEditText] = useState(task ? task.text : '');
    const [priority, setPriority] = useState(task ? task.priority : 'media');

    useEffect(() => {
        if (task) {
            setEditText(task.text);
            setPriority(task.priority || 'media');
        }
    }, [task]);

    const handSubmit = (e) => {
        e.preventDefault();
        onUpdateTask(task.id, editText, priority);
        sendModalType('edited');
    }

    useEffect( () => {
        let timer;
        if(modalType === 'edited' || modalType === 'success' 
            || modalType === 'eliminated' || modalType === 'deleteAll'
        ){
            timer = setTimeout(() =>{
                onClose()
            }, 2000)

            return () => clearTimeout(timer);
        }
    }, [modalType, onClose]
    );
    
    if(modalType === 'editing'){
        return(
            <form onSubmit={handSubmit}>
                <h2>EDITAR TAREA</h2>
                <label>Título:</label>
                <input 
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                />

                <label>Prioridad: </label>
                <select  value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="alta">Alta</option>
                    <option value="media">Media</option>
                    <option value="baja">Baja</option>
                </select>

                <button className="guardarTarea aprobado" title="Botón para guardar tarea" type="submit" >Guardar</button>
                <button className="cancelarTarea" title="Botón para cancelar edicion" type="button" onClick={onClose}>Cancelar</button>
                </form>
        )
    }
    if(modalType === 'edited'){
        return(
            <div className="RealizedStates">
                <p>!La tarea se edito correctamente!</p>
                <img src={checkImg} alt="confirm" />
            </div>
        )
    }
    if(modalType === 'success'){
        return(
            <div className="RealizedStates">
                <p>!La tarea se agregó correctamente!</p>
                <img src={checkImg} alt="confirm" />
            </div>
        )
    }
    if(modalType === 'eliminated'){
        return(
            <div className="RealizedStates">
                <p>!La tarea se elimino correctamente!</p>
                <img src={checkImg} alt="confirm" />
            </div>
        )
    }if(modalType === 'deleteAll'){
        return(
            <div className="RealizedStates">
                <p>!Todas las tareas se han eliminado correctamente!</p>
                <img src={checkImg} alt="confirm" />
            </div>
        )
    }

    return null;
}

export default TaskModal;