import { zodResolver } from '@hookform/resolvers/zod'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { getDictionaryQueryOptions, getSMTLinesQueryOptions, useCreateSMTLineMutation } from '@/api'
import { useDisclosure } from '@/hooks'
import { timeToMS } from '@/lib'
import { queryClient, useI18n } from '@/providers'
import { newFormDefaultValues, NewFormSchema } from '../schemas/new-form.schema'
import { calculatePerShiftMPcb, calculatePerShiftPcb } from '../utils'

export function useNewPage() {
  const { t } = useI18n()

  const dictionaryQuery = useSuspenseQuery(getDictionaryQueryOptions({
    options: { staleTime: 5 * 60 * 1000 },
  }))

  const form = useForm({
    defaultValues: newFormDefaultValues,
    resolver: zodResolver(NewFormSchema),
  })
  const formValues = form.watch()

  const donePerShiftMPcb = useMemo(() => calculatePerShiftMPcb(
    Number(formValues.lastMPcb),
    Number(formValues.firstMPcb),
  ), [formValues.lastMPcb, formValues.firstMPcb])

  const donePerShiftPcb = useMemo(() => calculatePerShiftPcb(
    Number(formValues.lastPcb),
    Number(formValues.firstPcb),
    Number(formValues.segmentsCount),
  ), [formValues.lastPcb, formValues.firstPcb, formValues.segmentsCount])

  const boardsSelect = useDisclosure()
  const dateStartPicker = useDisclosure()
  const dateEndPicker = useDisclosure()

  const createSMTLineMutation = useCreateSMTLineMutation()

  const onNewFormSubmit = form.handleSubmit(async ({ comment, timestampStart, timestampEnd, ...data }) => {
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
    form.reset()
  })

  return {
    form,
    state: {
      boardsSelect,
      dateStartPicker,
      dateEndPicker,
      donePerShiftMPcb,
      donePerShiftPcb,
      boards: dictionaryQuery.data?.data?.boards ?? [],
    },
    mutations: {
      createSMTLine: createSMTLineMutation,
    },
    handlers: {
      onNewFormSubmit,
    },
  }
}
