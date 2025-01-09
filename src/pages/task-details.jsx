import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  TrashIcon,
} from '../assets/icons/index.js'
import Button from '../components/Button'
import Input from '../components/Input.jsx'
import Sidebar from '../components/Sidebar'
import TimeSelect from '../components/TimeSelect.jsx'

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const navigate = useNavigate()
  const handleBackClick = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      })

      const data = await response.json()
      setTask(data)
    }

    fetchTasks()
  }, [taskId])

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex w-full justify-between">
          {/* parte da esquerda */}
          <div>
            <button
              onClick={handleBackClick}
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <span
                onClick={handleBackClick}
                className="cursor-pointer text-brand-text-gray"
              >
                My Tasks
              </span>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>
          {/* parte da direita */}
          <Button className="h-fit self-end" color="danger">
            <TrashIcon />
            Delete Task
          </Button>
        </div>

        {/* Dados da tarefa */}
        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input id="title" label="Title" value={task?.title} />
          </div>

          <div>
            <TimeSelect value={task?.time} />
          </div>

          <div>
            <Input
              id="description"
              label="Desceription"
              value={task?.description}
            />
          </div>
        </div>
        <div className="flex w-full justify-end gap-3">
          <Button size="large" color="secondary">
            Cancel
          </Button>
          <Button size="large" color="primary">
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
export default TaskDetailsPage
