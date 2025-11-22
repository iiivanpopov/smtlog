import { zodResolver } from '@hookform/resolvers/zod'
import { useSuspenseQueries } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { getDictionaryOptions, getSMTLinesOptions, useCreateSMTLineMutation } from '@/api'
import { useDisclosure, useOffsetPagination } from '@/hooks'
import { timeToSeconds } from '@/lib'
import { newFormDefaultValues, NewFormSchema } from '../-schemas/new-form.schema'

export function useNewPage() {
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

  const boardsSelect = useDisclosure()
  const dateStartPicker = useDisclosure()
  const dateEndPicker = useDisclosure()
  const smtLinesModal = useDisclosure()

  const pagination = useOffsetPagination({
    total: smtLinesQuery.data.data.meta.total,
    initialPageSize: 10,
    initialPage: page,
  })

  const createSMTLineMutation = useCreateSMTLineMutation()

  const onNewFormSubmit = newForm.handleSubmit(async (data) => {
    await createSMTLineMutation.mutateAsync({
      params: {
        board: data.board,
        count: data.count,
        comment: data.comment || undefined,
        timeStart: data.timestampStart.date!.getTime() / 1000 + timeToSeconds(data.timestampStart.time),
        timeEnd: data.timestampEnd.date!.getTime() / 1000 + timeToSeconds(data.timestampEnd.time),
      },
    })

    toast.success('Successfully created a new record')
    newForm.reset()
  })

  return {
    queries: {
      dictionary: dictionaryQuery,
      smtLines: smtLinesQuery,
    },
    state: {
      newForm,
      boardsSelect,
      dateStartPicker,
      dateEndPicker,
      smtLinesModal,
    },
    pagination,
    mutations: { createSMTLine: createSMTLineMutation },
    handlers: { onNewFormSubmit },
  }
}
