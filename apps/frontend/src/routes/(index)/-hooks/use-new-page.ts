import { zodResolver } from '@hookform/resolvers/zod'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { getSMTLinesOptions, useGetDictionary } from '@/api'
import { useDisclosure, useOffsetPagination } from '@/hooks'
import { newFormDefaultValues, NewFormSchema } from '../-schemas/new-form.schema'

export function useNewPage() {
  const { page } = useSearch({ from: '/(index)/' })

  const dictionaryQuery = useGetDictionary()
  const smtLinesQuery = useSuspenseQuery(getSMTLinesOptions({ limit: 10, page }))
  const pagination = useOffsetPagination({
    total: 5,
    initialPageSize: 10,
    initialPage: 0,
  })

  const boards = useDisclosure()
  const newForm = useForm({
    defaultValues: newFormDefaultValues,
    resolver: zodResolver(NewFormSchema),
  })

  const onNewFormSubmit = newForm.handleSubmit(async (data) => {
    toast(JSON.stringify(data))
    newForm.reset()
  })

  return {
    state: {
      newForm,
      boards,
    },
    actions: {
      onNewFormSubmit,
    },
    queries: {
      dictionary: dictionaryQuery,
      smtLines: smtLinesQuery,
    },
    mutations: {},
    pagination,
  }
}
