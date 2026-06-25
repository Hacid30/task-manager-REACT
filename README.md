# React Task Manager

A high-performance React Task Manager featuring persistent storage, advanced filtering, and a polished user interface. Built with a focus on component architecture, this project includes features like cascaded filtering, native drag-and-drop, date management with date-fns, and custom CSS animations for task lifecycle events.

This project was developed to practice React fundamentals, business logic, and clean code organization.

## Features

- Smart Empty States: Displays a message ("No registered tasks") when the list or filter result is empty.
- Task Management: Add new tasks and edit existing ones easily.
- Form Validation: Prevents users from submitting empty or blank tasks.
- Relative Time Tracking: Dynamic task creation dates showing relative time (e.g., "5 minutes ago") using the date-fns library.
- Task Completion: Mark tasks as completed  with visual feedback.
- Advanced Cascaded Filtering: Organize tasks using tab filters (All, Pending, Completed) combined with live search.
- Sorting Options: Sort tasks by entry date (Newest first, Oldest first).
- Priority Levels: Set specific priorities (High, Medium, Low) and filter the list by them.
- Color Coding: Visual color coding based on task priority.
- Deletion Controls: Delete individual tasks or clear all tasks at once.
- Fluid Animations: Custom CSS animations for task creation and smooth transition effects when deleting.
- Real-Time Summary: A dynamic status bar that updates total, pending, and completed tasks based on the active filter.
- Live Search Bar: Instantly find tasks by typing their title or description.
- Dark Mode: Toggleable dark/light theme for better user experience.
- Drag and Drop: Native functionality to intuitively reorder tasks by dragging them.
- Smart Modal Management: Modals with conditional rendering to confirm actions (add, edit, delete).
- Scroll-to-Top: A home button to quickly return to the input form when the list grows too long.
- Intuitive UI/UX: Close modals by clicking outside of them.

## Technologies used

- [HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
- [CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- [REACT]

## Project structure

/task-manager-react
├── /src
    ├── App.jsx
    ├── App.css
    ├── /components
        ├── Browse.jsx
        ├── DarkModeBtn.jsx
        ├── TaskModal.jsx
        ├── Summary.jsx
        ├── TaskForm.jsx
        ├──TaskList.jsx
    ├── /assets
        ├── /img
        ├── react.svg 

## Applied concepts

- React Hooks (useState, useEffect, useRef, useMemo).
- Prop drilling and component communication.
- Conditional rendering.
- Data persistence using the browser's localStorage.

## How to use the app

1. Enter the title of your task in the input field.
2. Select the task's priority level (High, Medium, Low).
3. Click "Agregar" (Add Task).
4. Use the filter buttons to toggle between "All", "Pending", and "Completed" tasks.
5. Click the edit button to modify a task's title or priority.
6. Use the delete button to remove an individual task, or "Eliminar todo" to clear the list.
7. Click the checkmark button (✔) to mark a task as completed.
8. Data is automatically saved in your browser; it won't be lost upon refreshing.
9. Type in the search bar to find a specific task in real-time.
10. Use the "Date" or "Priority" dropdowns to sort and filter your view.
11. Drag any task and drop it in a new position to reorder your list.
12. Use the "Inicio" (Home) button in the summary to jump back to the form.

## Author
**Héctor Hacid Julio Meza**  
Junior frontend web development

## License
This project is for educational and personal use.