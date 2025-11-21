import { zodResolver } from '@hookform/resolvers/zod'
import { useSuspenseQueries } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { getDictionaryOptions, getSMTLinesOptions } from '@/api'
import { useDisclosure, useOffsetPagination } from '@/hooks'
import { newFormDefaultValues, NewFormSchema } from '../-schemas/new-form.schema'

export function useNewPage() {
  const boardsSelect = useDisclosure()
  const { page } = useSearch({ from: '/(index)/' })

  const [smtLinesQuery, dictionaryQuery] = useSuspenseQueries({
    queries: [
      getSMTLinesOptions({ limit: 10, page }),
      getDictionaryOptions({ options: { staleTime: 5 * 60 * 1000 } }),
    ],
  })

  const newForm = useForm({
    defaultValues: newFormDefaultValues,
    resolver: zodResolver(NewFormSchema),
  })
  const pagination = useOffsetPagination({
    total: smtLinesQuery.data.data.meta.total,
    initialPageSize: 10,
    initialPage: page,
  })

  const onNewFormSubmit = newForm.handleSubmit(async (data) => {
    toast(JSON.stringify(data))
    toast.success('Successfully created a new record')
    newForm.reset()
  })

  return {
    state: {
      newForm,
      boardsSelect,
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
