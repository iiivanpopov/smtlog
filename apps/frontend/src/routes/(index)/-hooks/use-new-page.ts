import { zodResolver } from '@hookform/resolvers/zod'
import { useSuspenseQueries } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { getDictionaryQueryOptions, getSMTLinesQueryOptions, useCreateSMTLineMutation, useDeleteSMTLineMutation } from '@/api'
import { useDisclosure } from '@/hooks'
import { timeToSeconds } from '@/lib'
import { queryClient, useI18n } from '@/providers'
import { newFormDefaultValues, NewFormSchema } from '../-schemas/new-form.schema'

export function useNewPage() {
  const { t } = useI18n()

  const [smtLinesQuery, dictionaryQuery] = useSuspenseQueries({
    queries: [
      getSMTLinesQueryOptions({ limit: 10, page: 1 }),
      getDictionaryQueryOptions({ options: { staleTime: 5 * 60 * 1000 } }),
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

  const createSMTLineMutation = useCreateSMTLineMutation()
  const deleteSMTLineMutation = useDeleteSMTLineMutation()

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
    queryClient.invalidateQueries(getSMTLinesQueryOptions({ limit: 10, page: 1 }))

    toast.success(t('toast.created-smt'))
    newForm.reset()
  })

  const onDeleteSMTLine = async (id: number) => {
    await deleteSMTLineMutation.mutateAsync({
      params: { id },
    })

    queryClient.invalidateQueries(getSMTLinesQueryOptions({ limit: 10, page: 1 }))

    toast.success(t('toast.deleted-smt'))
  }

  return {
    queries: { dictionary: dictionaryQuery, smtLines: smtLinesQuery },
    state: { newForm, boardsSelect, dateStartPicker, dateEndPicker, smtLinesModal },
    mutations: { createSMTLine: createSMTLineMutation, deleteSMTLine: deleteSMTLineMutation },
    handlers: { onNewFormSubmit, onDeleteSMTLine },
  }
}
