import { zodResolver } from '@hookform/resolvers/zod'
import { useSuspenseQueries } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { getDictionaryQueryOptions, getSMTLinesQueryOptions, useCreateSMTLineMutation, useDeleteSMTLineMutation } from '@/api'
import { useDisclosure } from '@/hooks'
import { timeToMS } from '@/lib'
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
  const firstMPcb = newForm.watch('firstMPcb') ?? 0
  const lastMPcb = newForm.watch('lastMPcb') ?? 0
  const firstPcb = newForm.watch('firstPcb') ?? 0
  const lastPcb = newForm.watch('lastPcb') ?? 0
  const segmentsCount = newForm.watch('segmentsCount') ?? 0

  const donePerShiftMPcb = useMemo(() => {
    return Number(lastMPcb) - Number(firstMPcb) + 1
  }, [lastMPcb, firstMPcb])

  const donePerShiftPcb = useMemo(() => {
    return Number(lastPcb) - Number(firstPcb) + Number(segmentsCount)
  }, [lastPcb, firstPcb, segmentsCount])
  const boardsSelect = useDisclosure()
  const dateStartPicker = useDisclosure()
  const dateEndPicker = useDisclosure()
  const smtLinesModal = useDisclosure()

  const createSMTLineMutation = useCreateSMTLineMutation()
  const deleteSMTLineMutation = useDeleteSMTLineMutation()

  const onNewFormSubmit = newForm.handleSubmit(async ({ comment, timestampStart, timestampEnd, ...data }) => {
    await createSMTLineMutation.mutateAsync({
      params: {
        ...data,
        board: data.board,
        comment: comment || undefined,
        timeStart: timestampStart.date!.getTime() + timeToMS(timestampStart.time),
        timeEnd: timestampEnd.date!.getTime() + timeToMS(timestampEnd.time),
        segmentsCount: data.segmentsCount,
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
    state: {
      newForm,
      boardsSelect,
      dateStartPicker,
      dateEndPicker,
      smtLinesModal,
      // reactive computed values for the form
      donePerShiftMPcb,
      donePerShiftPcb,
    },
    mutations: { createSMTLine: createSMTLineMutation, deleteSMTLine: deleteSMTLineMutation },
    handlers: { onNewFormSubmit, onDeleteSMTLine },
  }
}
