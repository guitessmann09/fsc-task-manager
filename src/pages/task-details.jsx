import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
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
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm()

  const navigate = useNavigate()
  const handleBackClick = () => {
    navigate(-1)
  }

  const handeSaveClick = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: data.title.trim(),
        description: data.description.trim(),
      }),
    })
    if (!response.ok) {
      return toast.error('An error occurred while saving the task.')
    }

    const newTask = await response.json()
    setTask(newTask)
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

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      })

      const data = await response.json()
      setTask(data)
      reset(data)
    }

    fetchTasks()
  }, [taskId, reset])

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
        <form onSubmit={handleSubmit(handeSaveClick)}>
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Title"
                {...register('title', {
                  required: 'Title is required.',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'Title cannot be empty.'
                    }
                    return true
                  },
                })}
                errorMessage={errors?.title?.message}
              />
            </div>

            <div>
              <TimeSelect
                {...register('time', { required: 'Time is required.' })}
                errorMessage={errors?.time?.message}
              />
            </div>

            <div>
              <Input
                id="description"
                label="Desceription"
                {...register('description', {
                  required: 'Description is required.',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'Description cannot be empty.'
                    }
                    return true
                  },
                })}
                errorMessage={errors?.description?.message}
              />
            </div>
          </div>
          <div className="flex w-full justify-end gap-3">
            <Button
              size="large"
              color="primary"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting && (
                <ProgressIcon className="h-6 w-6 animate-spin" />
              )}
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default TaskDetailsPage
