import { useSuspenseQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import { getSMTLinesQueryOptions, useDeleteSMTLineMutation } from '@/api'
import { useMediaQuery } from '@/hooks'
import { queryClient, useI18n } from '@/providers'

export function useSMTLinesModal() {
  const { t } = useI18n()
  const isMobile = useMediaQuery('(max-width: 768px)')

  const smtLinesQuery = useSuspenseQuery(getSMTLinesQueryOptions({ limit: 10, page: 1 }))

  const [deletingSMTLinePendingId, setDeletingSMTLinePendingId] = useState<number | null>(null)

  const deleteSMTLineMutation = useDeleteSMTLineMutation()

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
    smtLines: smtLinesQuery.data.data?.smtLines ?? [],
    deletingSMTLinePendingId,
    onDeleteSMTLine,
    isMobile,
  }
}
