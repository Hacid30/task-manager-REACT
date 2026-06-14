
function DarkModeBtn({OnTogglesDark, isDarkMode}){
    
    return(
        <div className="darklightMode">
            <button onClick={OnTogglesDark} title="Botón modo oscuro">
                { isDarkMode ?  "☀️" : "🌙"}
            </button>
        </div>
    )
}

export default DarkModeBtn;