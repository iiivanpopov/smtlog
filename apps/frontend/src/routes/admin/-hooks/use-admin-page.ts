import { zodResolver } from '@hookform/resolvers/zod'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { getUsersQueryOptions, useDeleteUserMutation, useRegisterMutation, useSetSettingMutation } from '@/api'
import { config } from '@/config'
import { useOffsetPagination } from '@/hooks'
import { queryClient, useI18n } from '@/providers'
import { registerFormDefaultValues, RegisterFormSchema, sourceSettingFormDefaultValues, SourceSettingFormSchema } from '../-schemas'

export function useAdminPage() {
  const { t } = useI18n()

  const search = useSearch({ from: '/admin' })
  const navigate = useNavigate({ from: '/admin' })

  const registerForm = useForm({
    defaultValues: registerFormDefaultValues,
    resolver: zodResolver(RegisterFormSchema),
  })
  const sourceSettingForm = useForm({
    defaultValues: sourceSettingFormDefaultValues,
    resolver: zodResolver(SourceSettingFormSchema),
  })

  const getUsersQuery = useSuspenseQuery(getUsersQueryOptions({ limit: 10, page: search.page }))

  const pagination = useOffsetPagination({
    total: getUsersQuery.data.data.meta.total,
    initialPageSize: 10,
    initialPage: search.page,
    onChange: ({ page }) => navigate({ search: { page } }),
  })

  const registerMutation = useRegisterMutation()
  const deleteUserMutation = useDeleteUserMutation()
  const setSettingMutation = useSetSettingMutation()

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

  const onSourceSettingFormSubmit = sourceSettingForm.handleSubmit(async (data) => {
    await setSettingMutation.mutateAsync({ params: { key: config.settings.externalDictionary, value: data.source } })

    toast.success(t('toast.updated-source-setting'))
  })

  return {
    state: { registerForm, sourceSettingForm },
    handlers: { onRegisterFormSubmit, onDeleteUser, onSourceSettingFormSubmit },
    queries: { getUsers: getUsersQuery },
    mutations: { register: registerMutation, deleteUser: deleteUserMutation, setSetting: setSettingMutation },
    pagination,
  }
}
