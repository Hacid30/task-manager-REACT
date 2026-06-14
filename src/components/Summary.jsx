import "../App.css"

function Summary({tasks, onTasksGlobal, onScroll}){
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(task => task.completed === false).length;
    const completedTasks = tasks.filter(task => task.completed === true).length;
    return(
        <div>
            <h2>Resumen</h2>
            <div className="resumen">
                <label> {`Total: ${onTasksGlobal.length} 
                | Tareas en pantalla: ${totalTasks}
                | Pendientes: ${pendingTasks} 
                | Realizadas: ${completedTasks}`} </label>
                
                {tasks.length >= 5 &&(
                    <button onClick={onScroll} > Inicio </button>
                )}
            </div>
        </div>
    )
}

export default Summary;