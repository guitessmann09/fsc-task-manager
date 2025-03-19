import { HomeIcon, TasksIcon } from '../assets/icons/index.js'
import SidebarButton from './SidebarButton'
const Sidebar = () => {
  return (
    <div className="h-screen w-72 min-w-72 bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-bold text-brand-primary">Task Manager</h1>
        <p>
          A simple <span className="text-brand-primary">task manager</span>.
        </p>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <SidebarButton href="/" color="default">
          <HomeIcon />
          Home
        </SidebarButton>
        <SidebarButton href="/tasks" color="selected">
          <TasksIcon />
          My Tasks
        </SidebarButton>
      </div>
    </div>
  )
}

export default Sidebar
