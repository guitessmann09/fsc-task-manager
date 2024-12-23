const TasksSeparator = ({ icon, title }) => {
  return (
    <div className="flex gap-2 border-b border-solid border-brand-border pb-1">
      {icon}
      <p className="text-sm font-semibold text-brand-text-gray">{title}</p>
    </div>
  )
}
export default TasksSeparator
