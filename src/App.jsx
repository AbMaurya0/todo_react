
import { useState } from 'react'
import { BiChevronDownCircle, BiCircle, BiSolidTrash } from 'react-icons/bi'

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  // Add a new task
  const addTask = (e) => {
    e.preventDefault();
    if (!taskInput || taskInput === '') {
      window.alert("You must enter something.")
    }
    if (taskInput.trim()) {
      const newTask = {
        id: Date.now(),
        text: taskInput,
        done: false,
      };

      setTasks([...tasks, newTask]);
      setTaskInput("");
      console.info(newTask)
    }
  };
  //Delete a single task
  const removeTask = (taskId) => {
    if (window.confirm("Are you sure")) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  // Clear all tasks function
  const clearTasks = () => {
    if (window.confirm("Are you sure you want to clear all")) {
      setTasks([]);
    }
  };

  const toggleDone = (taskId) => {
    setTasks(tasks.map((task) => task.id === taskId ? { ...task, done: !task.done } : task));
  }


  return (
    <>
      <div>
        <div className="container">
          <div className="task-header">
            <h1>Todo App</h1>
            <span>Stay organized, achieve more</span>
          </div>
          <form className="task-form" onSubmit={addTask}>
            <input type="text" id="task-input" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} placeholder='Write your task ...' />
            <button type="submit" >Add</button>
          </form>
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id}>
                <span className={task.done ? "done" : ''}>{task.text}</span>
                <div className="task-buttons">
                  <button className="delete-button" onClick={() => removeTask(task.id)}><BiSolidTrash /></button>
                  <button className='done-btn' onClick={() => toggleDone(task.id)}>
                    {task.done ? <BiChevronDownCircle /> : <BiCircle />}</button>
                </div>

              </li>
            ))}


          </ul>
          {tasks.length > 0 && (<div className='clear-all-container'>
            <button id="clear-all" onClick={clearTasks}>Clear All Tasks</button>
          </div>)}

        </div>
      </div>
    </>
  )
}

export default App
