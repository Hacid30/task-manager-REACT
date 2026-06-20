# Task Manager

Simple web application to record, view and manage personal tasks through states, with data persistence using LocalStorage.  This project was developed as a REACT practice, business logic and good code organization practices.

## Features

- When there are no tasks, it is displayed in the list with the text "There are no registered tasks".
- Add tasks.
- Prevent tasks from going blank.
- View added tasks.
- Add date on which the task was added dynamically using date-fns library.
- Give approval of task completed.
- Organizing tasks using filter lists such as "All, Pending and Done".
- Organize tasks by date (Newest first, Oldest first).
- Add a priority to each task (High, Medium, Low).
- Organize tasks by priority.
- Colorimetry to tasks according to their priority.
- Delete task.
- Delete all tasks.
- Animation when the task is deleted.
- Confirmation to know if you want to delete the task.
- Summary of task statuses.
- Edit task.
- Search bar by title or description of the task.
- Filter for the summary, every time this is changed (All, Pending or Done), the summary is modified.
- Dark mode.
- Drag tasks to change their position.
- Modals to see if the task performed the action correctly (add, edit, delete or delete all).
- Home button to return to the form, when the list is very long.
- Close manners by clicking outside of it.

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
        ├── Manners.jsx
        ├── Summary.jsx
        ├── TaskForm.jsx
        ├──TaskList.jsx
    ├── /assets
        ├── /img
        ├── react.svg 

## Applied concepts

- Hooks.
- Props.
- Components.
- Data persistence in the browser.

## How to use the app

1. Write the title of the task.
2. Choose the priority of the task.
3. Click **"Add Task"**.
4. Use buttons to classify the filter list, between "All", "Pending" and "Done".
5. Use the edit button to modify a task.
6. Use the Delete button to delete an individual task or all at once.
7. Use the Done button to cross out the individual task that is already done.
8. The data is automatically saved in the browser.
9. Type in the search bar by the title of the task to find it.
10. Use the "Oldest" or "Newest" date selector to organize by entry date.
11. Use the priority selector to only show tasks with the chosen priority.
12. Use the home button to return to the form.

## Author
**Héctor Hacid Julio Meza**  
Junior frontend web development

## License
This project is for educational and personal use.