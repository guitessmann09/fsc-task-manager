import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from '../assets/icons/index.js'
import Button from '../components/Button.jsx'
import AddTaskDialog from './AddTaskDialog.jsx'
import TaksItem from './TaskItem.jsx'
import TasksSeparator from './TasksSeparator.jsx'

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      // pega os dados da api
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
      })

      // apos pegar os dados da api, converte para json
      const tasks = await response.json()
      console.log(tasks)

      // atualiza o estado com os dados da api
      setTasks(tasks)
    }

    fetchTasks()
  }, [])

  const morningTasks = tasks.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks.filter((task) => task.time === 'evening')

  const onDeleteTaskSuccess = async (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTasks)
    toast.success('Task deleted successfully')
  }

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task
      }
      if (task.status === 'not_started') {
        toast.success('Task started successfully')
        return { ...task, status: 'in_progress' }
      }
      if (task.status === 'in_progress') {
        toast.success('Task completed successfully')
        return { ...task, status: 'done' }
      }
      if (task.status === 'done') {
        toast.success('Task reset successfully')
        return { ...task, status: 'not_started' }
      }
      return task
    })
    setTasks(newTasks)
  }

  const onTaskSubmitSuccess = (task) => {
    setTasks([...tasks, task])
    toast.success('Task added successfully')
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            My Tasks
          </span>
          <h2 className="text-xl font-semibold">My Tasks</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button color="ghost">
            Clear Tasks
            <TrashIcon />
          </Button>

          <Button onClick={() => setAddTaskDialogIsOpen(true)}>
            New Task
            <AddIcon />
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={() => setAddTaskDialogIsOpen(false)}
            onSubmitSuccess={onTaskSubmitSuccess}
          />
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator icon={<SunIcon />} title="Morning" />
          {morningTasks.length === 0 && (
            <p className="text-sm text-gray-500">
              No tasks registered for the morning period.
            </p>
          )}
          {morningTasks.map((task) => (
            <TaksItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator icon={<CloudSunIcon />} title="Afternoon" />
          {afternoonTasks.length === 0 && (
            <p className="text-sm text-gray-500">
              No tasks registered for the afternoon period.
            </p>
          )}
          {afternoonTasks.map((task) => (
            <TaksItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator icon={<MoonIcon />} title="Night" />
          {eveningTasks.length === 0 && (
            <p className="text-sm text-gray-500">
              No tasks registered for the night period.
            </p>
          )}
          {eveningTasks.map((task) => (
            <TaksItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
