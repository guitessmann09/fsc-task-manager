import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import {
  CheckIcon,
  DetailsIcon,
  ProgressIcon,
  TrashIcon,
} from '../assets/icons/index.js'
import { useDeleteTask } from '../hooks/data/use-delete-task.js'
import { useUpdateTask } from '../hooks/data/use-update-task.js'
import Button from './Button'

const TaksItem = ({ task }) => {
  const { mutate: deleteTask, isPending } = useDeleteTask(task.id)
  const { mutate } = useUpdateTask(task.id)

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success('Task deleted successfully.')
      },
      onError: () => {
        toast.error('Error deleting task!')
      },
    })
  }

  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-brand-primary text-brand-primary'
    }

    if (task.status === 'in_progress') {
      return 'bg-brand-process text-brand-process'
    }

    if (task.status === 'not_started') {
      return 'bg-brand-dark-blue bg-opacity-5 text-brand-dark-blue'
    }
  }

  const getNewStatus = () => {
    if (task.status === 'not_started') {
      return 'in_progress'
    }

    if (task.status === 'in_progress') {
      return 'done'
    }
    return 'not_started'
  }

  const handleCheckboxClick = () => {
    mutate(
      {
        status: getNewStatus(),
      },
      {
        onSuccess: () => toast.success('Task status updated successfully.'),
        onError: () => toast.error('Error updating task status!'),
      }
    )
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === 'done'}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={handleCheckboxClick}
          />
          {task.status === 'done' && <CheckIcon />}
          {task.status === 'in_progress' && (
            <ProgressIcon className="animate-spin text-brand-white" />
          )}
        </label>
        {task.title}
      </div>
      <div className="flex items-center gap-2">
        <Button
          color="ghost"
          onClick={() => handleDeleteClick(task.id)}
          disabled={isPending}
        >
          {isPending ? (
            <ProgressIcon className="animate-spin text-brand-text-gray" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>
        <Link
          to={`/task/${task.id}`}
          className="transition-all hover:opacity-75"
        >
          <DetailsIcon />
        </Link>
      </div>
    </div>
  )
}

export default TaksItem
