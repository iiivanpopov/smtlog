import { TableIcon } from 'lucide-react'

import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, I18nText } from '@/components'

import { SMTLinesCards } from '../smt-lines-cards'
import { SMTLinesTable } from '../smt-lines-table'
import { useSMTLinesModal } from './hooks'

export function SMTLinesModal() {
  const { smtLines, deletingSMTLinePendingId, onDeleteSMTLine, isMobile } = useSMTLinesModal()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <TableIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-200 lg:max-w-5xl xl:max-w-300 max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            <I18nText id="dialog.smt-lines.title" />
          </DialogTitle>
          <DialogDescription>
            <I18nText id="dialog.smt-lines.description" />
          </DialogDescription>
        </DialogHeader>

        {!isMobile && (
          <SMTLinesTable
            deletingSMTLinePendingId={deletingSMTLinePendingId}
            smtLines={smtLines}
            onDeleteSMTLine={onDeleteSMTLine}
          />
        )}

        {isMobile && (
          <SMTLinesCards
            deletingSMTLinePendingId={deletingSMTLinePendingId}
            smtLines={smtLines}
            onDeleteSMTLine={onDeleteSMTLine}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
