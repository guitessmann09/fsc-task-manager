import {
  GlassWaterIcon,
  ProgressIcon,
  Tasks2Icon,
  TasksIcon,
} from '../assets/icons'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import DashboardCard from './DashboardCard'

const DashboardCards = () => {
  const { data: tasks } = useGetTasks()
  const completedTasks = tasks?.filter(
    (tasks) => tasks.status === 'done'
  ).length
  const workingTasks = tasks?.filter(
    (tasks) => tasks.status === 'in_progress'
  ).length
  return (
    <div className="grid grid-cols-4 gap-9">
      <DashboardCard
        icon={<Tasks2Icon />}
        mainText={tasks?.length}
        secondaryText="Avaliable Tasks"
      />
      <DashboardCard
        icon={<TasksIcon />}
        mainText={completedTasks}
        secondaryText="Completed Tasks"
      />
      <DashboardCard
        icon={<ProgressIcon />}
        mainText={workingTasks}
        secondaryText="Working Tasks"
      />
      <DashboardCard
        icon={<GlassWaterIcon />}
        mainText="40%"
        secondaryText="Water"
      />
    </div>
  )
}

export default DashboardCards
