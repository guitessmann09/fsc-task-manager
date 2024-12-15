import Button from '../components/Button.jsx'
import AddIcon from '../assets/icons/add.svg?react'
import TrashIcon from '../assets/icons/trash.svg?react'

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
    </div>
  )
}

export default Tasks
