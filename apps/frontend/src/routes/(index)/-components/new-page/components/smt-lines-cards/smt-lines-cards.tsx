import type { SMTLineDTO } from '@/api'

import { TrashIcon } from 'lucide-react'
import { Button, Card, I18nDate, I18nText, I18nTime } from '@/components'

interface SMTLinesCardsProps {
  smtLines: SMTLineDTO[]
  deletingSMTLinePendingId: number | null
  onDeleteSMTLine: (id: number) => void
}

export function SMTLinesCards({ smtLines, deletingSMTLinePendingId, onDeleteSMTLine }: SMTLinesCardsProps) {
  return (
    <div className="overflow-auto flex-1 space-y-3 px-1">
      {smtLines.map(smtLine => (
        <Card key={smtLine.id} className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-muted-foreground mb-1">
                  <I18nText id="table.smt-lines.board" />
                </p>
                <p className="font-semibold wrap-break-word">{smtLine.board}</p>
              </div>

              <Button
                className="text-destructive flex-end"
                disabled={deletingSMTLinePendingId === smtLine.id}
                size="icon-sm"
                variant="ghost"
                onClick={() => onDeleteSMTLine(smtLine.id)}
              >
                <TrashIcon />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-muted-foreground mb-1">
                  <I18nText id="table.smt-lines.start-at" />
                </p>
                <p className="text-sm">
                  <I18nDate date={smtLine.timeStart} />
                </p>
                <p className="text-sm text-muted-foreground">
                  <I18nTime date={smtLine.timeStart} />
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">
                  <I18nText id="table.smt-lines.end-at" />
                </p>
                <p className="text-sm">
                  <I18nDate date={smtLine.timeEnd} />
                </p>
                <p className="text-sm text-muted-foreground">
                  <I18nTime date={smtLine.timeEnd} />
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-muted-foreground mb-1">
                  <I18nText id="field.first-m-pcb.label" />
                </p>
                <p className="text-sm font-medium">{smtLine.firstMPcb}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">
                  <I18nText id="field.first-pcb.label" />
                </p>
                <p className="text-sm font-medium">{smtLine.firstPcb}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-muted-foreground mb-1">
                  <I18nText id="field.last-m-pcb.label" />
                </p>
                <p className="text-sm font-medium">{smtLine.lastMPcb}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">
                  <I18nText id="field.last-pcb.label" />
                </p>
                <p className="text-sm font-medium">{smtLine.lastPcb}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-muted-foreground mb-1">
                  <I18nText id="field.pcb-side.label" />
                </p>
                <p className="text-sm font-medium">{smtLine.pcbSide}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">
                  <I18nText id="field.segments-count.label" />
                </p>
                <p className="text-sm font-medium">{smtLine.segmentsCount}</p>
              </div>
            </div>

            {smtLine.comment && (
              <div>
                <p className="text-muted-foreground mb-1">
                  <I18nText id="table.smt-lines.comment" />
                </p>
                <p className="text-sm wrap-break-word">{smtLine.comment}</p>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
