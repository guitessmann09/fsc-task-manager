import './AddTaskDialog.css'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'sonner'
import { v4 } from 'uuid'

import { ProgressIcon } from '../assets/icons'
import Button from './Button'
import Input from './Input'
import TimeSelect from './TimeSelect'

const AddTaskDialog = ({ isOpen, handleClose, onSubmitSuccess }) => {
  const [time, setTime] = useState('morning')
  const [errors, setErrors] = useState([])
  const [isLoadig, setIsLoading] = useState(false)

  const nodeRef = useRef()
  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()

  useEffect(() => {
    if (!isOpen) {
      setTime('morning')
    }
  }, [isOpen])

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

    const task = {
      id: v4(),
      title,
      time,
      description,
      status: 'not_started',
    }
    setIsLoading(true)
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    })
    if (!response.ok) {
      setIsLoading(false)
      return toast.error('Failed to add task')
    }

    onSubmitSuccess(task)
    setIsLoading(false)
    handleClose()
  }

  const titleError = errors.find((error) => error.inputName === 'title')
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  )

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
              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Title"
                  placeholder="Enter task title"
                  errorMessage={titleError?.message}
                  ref={titleRef}
                  disabled={isLoadig}
                />

                <TimeSelect
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  ref={timeRef}
                  disabled={isLoadig}
                />

                <Input
                  id="description"
                  label="Desceription"
                  placeholder="Describe the task"
                  errorMessage={descriptionError?.message}
                  ref={descriptionRef}
                  disabled={isLoadig}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    color="secondary"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    onClick={handeSaveClick}
                    disabled={isLoadig}
                  >
                    {isLoadig && (
                      <ProgressIcon className="h-6 w-6 animate-spin" />
                    )}
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

export default AddTaskDialog
