import type { DateRange, OnSelectHandler } from 'react-day-picker'
import { useSuspenseQueries } from '@tanstack/react-query'

import { useState } from 'react'
import { toast } from 'sonner'
import { getDictionaryQueryOptions, getSMTLinesQueryOptions, useDeleteSMTLineMutation, useGetSMTLinesSummaryQuery } from '@/api'
import { useDebounce, useDisclosure, useMediaQuery } from '@/hooks'
import { queryClient, useI18n } from '@/providers'

export function useSMTLinesModal() {
  const i18n = useI18n()
  const isMobile = useMediaQuery('(max-width: 768px)')

  const [smtLinesQuery, dictionaryQuery] = useSuspenseQueries({
    queries: [
      getSMTLinesQueryOptions({ limit: 10, page: 1 }),
      getDictionaryQueryOptions({
        options: { staleTime: 5 * 60 * 1000 },
      }),
    ],
  })

  const [summaryFilters, setSummaryFilters] = useState<{
    pcb: string
    side: string
    dateRange: {
      from: Date | undefined
      to: Date | undefined
    }
  }>({
    pcb: '',
    side: 'T',
    dateRange: {
      from: undefined,
      to: undefined,
    },
  })

  const boardsSelect = useDisclosure()

  const debouncedSummaryFilters = useDebounce(summaryFilters, 500)

  const smtLinesSummaryQuery = useGetSMTLinesSummaryQuery({
    side: debouncedSummaryFilters.side as 'T' | 'B',
    pcb: debouncedSummaryFilters.pcb,
    dateRangeFrom: debouncedSummaryFilters.dateRange.from?.getTime() ?? 0,
    dateRangeTo: (debouncedSummaryFilters.dateRange.to?.getTime() ?? 0) + 24 * 60 * 60 * 1000,
  }, {
    options: {
      enabled: !!debouncedSummaryFilters.pcb
        && !!debouncedSummaryFilters.dateRange.from
        && !!debouncedSummaryFilters.dateRange.to
        && !!debouncedSummaryFilters.side,
    },
  })

  const [deletingSMTLinePendingId, setDeletingSMTLinePendingId] = useState<number | null>(null)

  const deleteSMTLineMutation = useDeleteSMTLineMutation()

  const onDeleteSMTLine = async (id: number) => {
    setDeletingSMTLinePendingId(id)

    await deleteSMTLineMutation.mutateAsync({
      params: { id },
    })

    queryClient.invalidateQueries(getSMTLinesQueryOptions({ limit: 10, page: 1 }))

    toast.success(i18n.t('toast.deleted-smt'))
    setDeletingSMTLinePendingId(null)
  }

  const onDateRangeChange: OnSelectHandler<DateRange> = (dateRange) => {
    if (!dateRange)
      return

    setSummaryFilters(current => ({
      ...current,
      dateRange: {
        from: dateRange.from ?? current.dateRange.from,
        to: dateRange.to ?? current.dateRange.to,
      },
    }))
  }

  const onSideChange = (side: string) => {
    setSummaryFilters(current => ({
      ...current,
      side,
    }))
  }

  const onPCBChange = (pcb: string) => {
    setSummaryFilters(current => ({
      ...current,
      pcb,
    }))
  }

  return {
    queries: {
      smtLines: smtLinesQuery,
      dictionary: dictionaryQuery,
      summary: smtLinesSummaryQuery,
    },
    state: {
      deletingSMTLinePendingId,
      summaryFilters,
    },
    functions: {
      onDeleteSMTLine,
      onDateRangeChange,
      onSideChange,
      onPCBChange,
    },
    features: {
      i18n,
      isMobile,
      boardsSelect,
    },
  }
}
