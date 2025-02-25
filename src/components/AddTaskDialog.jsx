import './AddTaskDialog.css'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'sonner'
import { v4 } from 'uuid'

import { ProgressIcon } from '../assets/icons'
import Button from './Button'
import Input from './Input'
import TimeSelect from './TimeSelect'

const AddTaskDialog = ({ isOpen, handleClose, onSubmitSuccess }) => {
  const [time, setTime] = useState('morning')
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      time: 'morning',
      description: '',
    },
  })

  const nodeRef = useRef()

  useEffect(() => {
    if (!isOpen) {
      setTime('morning')
    }
  }, [isOpen])

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      time: data.time,
      description: data.description.trim(),
      status: 'not_started',
    }
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    })
    if (!response.ok) {
      return toast.error('Failed to add task')
    }
    onSubmitSuccess(task)
    handleClose()
    reset({
      title: '',
      time: 'morning',
      description: '',
    })
  }

  const handleCancelClick = () => {
    reset({
      title: '',
      time: 'morning',
      description: '',
    })
    handleClose()
  }

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                New Task
              </h2>
              <p className="mb-4 mt-1 text-sm text-brand-text-gray">
                Enter the information below
              </p>
              <form
                onSubmit={handleSubmit(handleSaveClick)}
                className="flex w-[336px] flex-col space-y-4"
              >
                <Input
                  id="title"
                  label="Title"
                  placeholder="Enter task title"
                  errorMessage={errors?.title?.message}
                  disabled={isSubmitting}
                  {...register('title', {
                    required: 'Title is required',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'Title cannot be empty:'
                      }
                      return true
                    },
                  })}
                />

                <TimeSelect
                  value={time}
                  errorMessage={errors?.time?.message}
                  onChange={(event) => setTime(event.target.value)}
                  disabled={isSubmitting}
                  {...register('time', {
                    required: true,
                  })}
                />

                <Input
                  id="description"
                  label="Description"
                  placeholder="Describe the task"
                  disabled={isSubmitting}
                  errorMessage={errors?.description?.message}
                  {...register('description', {
                    required: 'Description is required',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'Description cannot be empty:'
                      }
                      return true
                    },
                  })}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    color="secondary"
                    onClick={handleCancelClick}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <ProgressIcon className="h-6 w-6 animate-spin" />
                    )}
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

export default AddTaskDialog
