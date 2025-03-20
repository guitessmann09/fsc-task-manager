export const taskMutationKeys = {
  addTask: () => ['add-task'],
  deleteTask: (taskId) => ['delete-task', taskId],
  updateTask: (taskId) => ['update-task', taskId],
}
