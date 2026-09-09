interface DarkModeBtnProps {
    OnTogglesDark: () => void;
    isDarkMode: boolean
}

function DarkModeBtn({OnTogglesDark, isDarkMode} : DarkModeBtnProps){
    
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