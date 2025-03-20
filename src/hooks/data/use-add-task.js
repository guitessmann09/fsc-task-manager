import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskMutationKeys } from '../../keys/mutations'
import { taskQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.addTask(),
    mutationFn: async (task) => {
      const { data: createdTask } = await api.post(`/tasks`, task)
      return createdTask
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) => {
        return [...oldTasks, createdTask]
      })
    },
  })
}
