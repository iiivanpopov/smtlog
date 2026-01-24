import { zodResolver } from '@hookform/resolvers/zod'
import { useSuspenseQueries } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { getDictionaryQueryOptions, getSMTLinesQueryOptions, useCreateSMTLineMutation, useDeleteSMTLineMutation } from '@/api'
import { useDisclosure, useMediaQuery } from '@/hooks'
import { timeToMS } from '@/lib'
import { queryClient, useI18n } from '@/providers'
import { newFormDefaultValues, NewFormSchema } from '../-schemas/new-form.schema'
import { calculatePerShiftMPcb, calculatePerShiftPcb } from '../-utils'

export function useNewPage() {
  const { t } = useI18n()
  const isMobile = useMediaQuery('(max-width: 768px)')

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
  const formValues = newForm.watch()

  const donePerShiftMPcb = useMemo(() => calculatePerShiftMPcb(
    Number(formValues.lastMPcb),
    Number(formValues.firstMPcb),
  ), [formValues.lastMPcb, formValues.firstMPcb])

  const donePerShiftPcb = useMemo(() => calculatePerShiftPcb(
    Number(formValues.lastPcb),
    Number(formValues.firstPcb),
    Number(formValues.segmentsCount),
  ), [formValues.lastPcb, formValues.firstPcb, formValues.segmentsCount])

  const [deletingSMTLinePendingId, setDeletingSMTLinePendingId] = useState<number | null>(null)

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
        comment: comment || undefined,
        timeStart: timestampStart.date!.getTime() + timeToMS(timestampStart.time),
        timeEnd: timestampEnd.date!.getTime() + timeToMS(timestampEnd.time),
      },
    })
    queryClient.invalidateQueries(getSMTLinesQueryOptions({ limit: 10, page: 1 }))

    toast.success(t('toast.created-smt'))
    newForm.reset()
  })

  const onDeleteSMTLine = async (id: number) => {
    setDeletingSMTLinePendingId(id)

    await deleteSMTLineMutation.mutateAsync({
      params: { id },
    })

    queryClient.invalidateQueries(getSMTLinesQueryOptions({ limit: 10, page: 1 }))

    toast.success(t('toast.deleted-smt'))
    setDeletingSMTLinePendingId(null)
  }

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
      donePerShiftMPcb,
      donePerShiftPcb,
      deletingSMTLinePendingId,
    },
    mutations: {
      createSMTLine: createSMTLineMutation,
      deleteSMTLine: deleteSMTLineMutation,
    },
    handlers: {
      onNewFormSubmit,
      onDeleteSMTLine,
    },
    features: {
      isMobile,
    },
  }
}
