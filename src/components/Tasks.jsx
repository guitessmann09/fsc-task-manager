import Button from '../components/Button.jsx'
import AddIcon from '../assets/icons/add.svg?react'
import TrashIcon from '../assets/icons/trash.svg?react'
import SunIcon from '../assets/icons/sun.svg?react'
import CloudSunIcon from '../assets/icons/cloud-sun.svg?react'
import MoonIcon from '../assets/icons/moon.svg?react'
import TasksSeparator from './TasksSeparator.jsx'
import { useState } from 'react'
import TASKS from '../constants/tasks.js'
import TaksItem from './TaskItem.jsx'

const Tasks = () => {
  const [tasks] = useState(TASKS)

  const morningTasks = tasks.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks.filter((task) => task.time === 'evening')

  return (
    <div className="px-8 py-16">
      <div className="flex w-[77vw] justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">My Tasks</span>
          <h2 className="text-xl font-semibold">My Tasks</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost">
            Clear Tasks
            <TrashIcon />
          </Button>

          <Button>
            New Task
            <AddIcon />
          </Button>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator icon={<SunIcon />} title="Morning" />
          {morningTasks.map((task) => (
            <TaksItem key={task.id} task={task} />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator icon={<CloudSunIcon />} title="Afternoon" />
          {afternoonTasks.map((task) => (
            <TaksItem key={task.id} task={task} />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator icon={<MoonIcon />} title="Night" />
          {eveningTasks.map((task) => (
            <TaksItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
