import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  ProgressIcon,
  TrashIcon,
} from '../assets/icons/index.js'
import Button from '../components/Button'
import Input from '../components/Input.jsx'
import Sidebar from '../components/Sidebar'
import TimeSelect from '../components/TimeSelect.jsx'

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const [saveIsLoading, setSaveIsLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()
  const handleBackClick = () => {
    navigate(-1)
  }

  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()

  const handeSaveClick = async () => {
    const newErrors = []

    const title = titleRef.current.value
    const description = descriptionRef.current.value
    const time = timeRef.current.value

    if (!title.trim()) {
      newErrors.push({
        inputName: 'title',
        message: 'Title is required',
      })
    }
    if (!description.trim()) {
      newErrors.push({
        inputName: 'description',
        message: 'Description is required',
      })
    }

    setErrors(newErrors)

    if (newErrors.length > 0) {
      return
    }

    setSaveIsLoading(true)
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        time,
        description,
      }),
    })
    if (!response.ok) {
      toast.error('An error occurred while saving the task.')
      return setSaveIsLoading(false)
    }

    const newTask = await response.json()
    setTask(newTask)
    setSaveIsLoading(false)
    toast.success('Task edited successfully')
  }

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      return toast.error('Failed to delete task')
    }

    toast.success('Task deleted successfully')
    navigate(-1)
  }

  const titleError = errors.find((error) => error.inputName === 'title')
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  )

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
              <Link to="/" className="cursor-pointer text-brand-text-gray">
                My Tasks
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>
          {/* parte da direita */}
          <Button
            className="h-fit self-end"
            color="danger"
            onClick={handleDeleteClick}
          >
            <TrashIcon />
            Delete Task
          </Button>
        </div>

        {/* Dados da tarefa */}
        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input
              id="title"
              label="Title"
              defaultValue={task?.title}
              error={titleError}
              ref={titleRef}
            />
          </div>

          <div>
            <TimeSelect defaultValue={task?.time} ref={timeRef} />
          </div>

          <div>
            <Input
              id="description"
              label="Desceription"
              defaultValue={task?.description}
              error={descriptionError}
              ref={descriptionRef}
            />
          </div>
        </div>
        <div className="flex w-full justify-end gap-3">
          <Button
            size="large"
            color="primary"
            onClick={handeSaveClick}
            disabled={saveIsLoading}
          >
            {saveIsLoading && <ProgressIcon className="h-6 w-6 animate-spin" />}
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
export default TaskDetailsPage
