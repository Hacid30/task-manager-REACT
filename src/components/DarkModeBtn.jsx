
function DarkModeBtn({OnTogglesDark, isDarkMode}){
    
    return(
        <div className="darklightMode">
            <button 
                onClick={OnTogglesDark} 
                title="Botón modo oscuro"
                aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
                { isDarkMode ?  "☀️" : "🌙"}
            </button>
        </div>
    )
}

export default DarkModeBtn;