import "../App.css";

function Browse({
    tasks,
    filters,
    onFilterChange,
    taskActions,
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
                onChange={(e) => onFilterChange('search', e.target.value)}
                />
            )}
            
            {tasks >= 1 &&(
                <nav> 
                    <button className={`buttonAll ${filters.status === 'all'? 'btnActivo' : ''}`} 
                        onClick={() => onFilterChange('status', 'all')} >Todas</button> 
                    <button className={`buttonEarrings ${filters.status === 'pending' ? 'btnActivo' : ''}`} 
                        onClick={() => onFilterChange('status', 'pending')} >Pendientes</button> 
                    <button className={`doneButton ${filters.status === 'completed' ? 'btnActivo' : ''}`} 
                        onClick={() => onFilterChange('status', 'completed')} >Realizadas</button> 
                </nav>
            )}

            {tasks >= 2 &&(
                <button 
                onClick={ () => {
                    taskActions.deleteAll();
                    setIsModalOpen(true);
                    modalType('deleteAll');
                    isDeletingAll(true);
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
                            <select value={filters.dateSort}  onChange={(e) => onFilterChange( 'dateSort', e.target.value)} >
                                <option value="">Ninguna</option>
                                <option value="recent">Más reciente</option>
                                <option value="oldest">Más antigua</option>
                            </select>
                        </div>
                        <div>
                            <label> Prioridad: </label>
                            <select value={filters.priority}  onChange={(e) => onFilterChange('priority', e.target.value)}>
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