import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['deleteTaks', taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error()
      }

      const deletedTask = await response.json()
      return deletedTask
    },
    onSuccess: (deletedTask) => {
      queryClient.setQueryData('tasks', (oldTasks) => {
        return oldTasks.filter((oldTask) => oldTask.id !== deletedTask.id)
      })
    },
  })
}
