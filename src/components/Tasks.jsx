import Button from '../components/Button.jsx'
import AddIcon from '../assets/icons/add.svg?react'
import TrashIcon from '../assets/icons/trash.svg?react'
import SunIcon from '../assets/icons/sun.svg?react'
import CloudSunIcon from '../assets/icons/cloud-sun.svg?react'
import MoonIcon from '../assets/icons/moon.svg?react'

const Tasks = () => {
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
          <div className="flex gap-2 border-b border-solid border-[#F4F4F5] pb-1">
            <SunIcon />
            <p className="text-sm font-semibold text-[#9A9C9F]">Morning</p>
          </div>
        </div>

        <div className="my-6 space-y-3">
          <div className="flex gap-2 border-b border-solid border-[#F4F4F5] pb-1">
            <CloudSunIcon />
            <p className="text-sm font-semibold text-[#9A9C9F]">Afternoon</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex gap-2 border-b border-solid border-[#F4F4F5] pb-1">
            <MoonIcon />
            <p className="text-sm font-semibold text-[#9A9C9F]">Night</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tasks
