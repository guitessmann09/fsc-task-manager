import SidebarButton from './SidebarButton'

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-bold text-[#00ADB5]">Task Manager</h1>
        <p>
          A simple <span className="text-[#00ADB5]">task manager</span>.
        </p>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <SidebarButton variant="default">Home</SidebarButton>
        <SidebarButton variant="selected">My Tasks</SidebarButton>
      </div>
    </div>
  )
}

export default Sidebar
