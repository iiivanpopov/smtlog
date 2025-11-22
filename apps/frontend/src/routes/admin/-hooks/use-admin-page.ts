import { zodResolver } from '@hookform/resolvers/zod'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { getUsersQueryOptions, useDeleteUserMutation, useRegisterMutation } from '@/api'
import { useOffsetPagination } from '@/hooks'
import { queryClient, useI18n } from '@/providers'
import { registerUserFormDefaultValues, RegisterUserFormSchema } from '../-schemas/register-user-schema'

export function useAdminPage() {
  const { t } = useI18n()

  const search = useSearch({ from: '/admin' })

  const registerForm = useForm({
    defaultValues: registerUserFormDefaultValues,
    resolver: zodResolver(RegisterUserFormSchema),
  })

  const getUsersQuery = useSuspenseQuery(getUsersQueryOptions({ limit: 10, page: search.page }))

  const pagination = useOffsetPagination({
    total: getUsersQuery.data.data.meta.total,
    initialPageSize: 10,
    initialPage: search.page,
  })

  const registerMutation = useRegisterMutation()
  const deleteUserMutation = useDeleteUserMutation()

  const onRegisterFormSubmit = registerForm.handleSubmit(async (data) => {
    await registerMutation.mutateAsync({ params: data })

    queryClient.invalidateQueries(getUsersQueryOptions({ limit: 10, page: search.page }))
    registerForm.reset()

    toast.success(t('toast.registered-user'))
  })

  const onDeleteUser = async (id: number) => {
    await deleteUserMutation.mutateAsync({ params: { id } })

    queryClient.invalidateQueries(getUsersQueryOptions({ limit: 10, page: search.page }))

    toast.success(t('toast.deleted-user'))
  }

  return {
    state: { registerForm },
    handlers: { onRegisterFormSubmit, onDeleteUser },
    queries: { getUsers: getUsersQuery },
    mutations: { register: registerMutation, deleteUser: deleteUserMutation },
    pagination,
  }
}
