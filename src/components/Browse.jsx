import "../App.css";

function Browse({
    tasks,
    onDeleteTasks,
    onChangeFilter,
    currentFilter,
    OnSearch,
    dateSort,
    priorityFilter,
    setIsModalOpen,
    modalType,
    isDeletingAll
    }){

    return(
        <div>
            {tasks >= 1 &&(
                <h2>Lista de tareas</h2>)
            }
            
            {tasks >= 2 &&(
                <input 
                type="text" 
                placeholder="Buscar tarea por título o descripción"
                style={{width: '100%'}}
                onChange={(e) => OnSearch(e.target.value)}
                />
            )}
            
            {tasks >= 1 &&(
                <nav> 
                    <button className={`buttonAll ${currentFilter === 'all'? 'btnActivo' : ''}`} 
                        onClick={() => onChangeFilter('all')} >Todas</button> 
                    <button className={`buttonEarrings ${currentFilter === 'pending' ? 'btnActivo' : ''}`} 
                        onClick={() => onChangeFilter('pending')} >Pendientes</button> 
                    <button className={`doneButton ${currentFilter === 'completed' ? 'btnActivo' : ''}`} 
                        onClick={() => onChangeFilter('completed')} >Realizadas</button> 
                </nav>
            )}

            {tasks >= 2 &&(
                <button 
                onClick={ () => {
                    onDeleteTasks(),
                    setIsModalOpen(true),
                    modalType('deleteAll'),
                    isDeletingAll(true)
                }}
                className= 'eliminate btnDeleteAll'
                > Eliminar todo </button>)
            }
            
            {tasks >= 3 && (
                <div>
                    <p className="showParagraph" >Ordenar tareas por...</p>
                    <div className="order">
                        <div>
                            <label> Fecha: </label>
                            <select onChange={(e) => dateSort(e.target.value)} >
                                <option value="">Ninguna</option>
                                <option value="recent">Más reciente</option>
                                <option value="oldest">Más antigua</option>
                            </select>
                        </div>
                        <div>
                            <label> Prioridad: </label>
                            <select  onChange={(e) => priorityFilter(e.target.value)}>
                                <option value="">Ninguna</option>
                                <option value="high">Alta</option>
                                <option value="medium">Media</option>
                                <option value="low">Baja</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Browse;