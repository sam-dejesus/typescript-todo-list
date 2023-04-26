/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

// import confetti from 'canvas-confetti';

// confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
//   resize: true,
//   useWorker: true,
// })({ particleCount: 200, spread: 200 });
import {v4 as uuidv4 } from 'uuid'
type task = {
  id: string, 
  title: string, 
  completed: boolean, 
  createdAt: Date }

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector<HTMLFormElement>("#new-task-form")
const input= document.querySelector<HTMLInputElement>("#new-task-title")
const task:task[] = loadTask()
task.forEach( addListItem)

form?.addEventListener("submit", e=>{
  e.preventDefault()

  if (input?.value == "" || input?.value == null) return

  const newTask = {
    id: uuidv4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
task.push(newTask)

   addListItem(newTask)
   input.value = ""
})

function addListItem(task: task){
 const item = document.createElement("li")
 const label = document.createElement("label")
 const checkbox = document.createElement("input")
 checkbox.addEventListener("change", ()=> {
  task.completed = checkbox.checked
  saveTask();
 })
 checkbox.type = "checkbox"
 checkbox.checked = task.completed
 label.append(checkbox, task.title)
 item.append(label)
 list?.append(item)


}

function saveTask(){
  localStorage.setItem("TASKS", JSON.stringify(task))
}

function loadTask(): task[]{
  const taskJSON = localStorage.getItem("TASKS")
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}