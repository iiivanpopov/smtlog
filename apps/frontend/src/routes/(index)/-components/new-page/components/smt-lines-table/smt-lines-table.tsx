import type { SMTLineDTO } from '@/api'

import { TrashIcon } from 'lucide-react'
import { Button, I18nDate, I18nText, I18nTime, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components'

interface SMTLinesTableProps {
  smtLines: SMTLineDTO[]
  deletingSMTLinePendingId: number | null
  onDeleteSMTLine: (id: number) => void
}

export function SMTLinesTable({ smtLines, deletingSMTLinePendingId, onDeleteSMTLine }: SMTLinesTableProps) {
  return (
    <div className="overflow-auto flex-1">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-48">
              <I18nText id="table.smt-lines.board" />
            </TableHead>
            <TableHead>
              <I18nText id="table.smt-lines.start-at" />
            </TableHead>
            <TableHead>
              <I18nText id="table.smt-lines.end-at" />
            </TableHead>
            <TableHead>
              <I18nText id="table.pcb-side.title" />
            </TableHead>
            <TableHead>
              <I18nText id="field.first-m-pcb.label" />
            </TableHead>
            <TableHead>
              <I18nText id="field.first-pcb.label" />
            </TableHead>
            <TableHead>
              <I18nText id="field.last-m-pcb.label" />
            </TableHead>
            <TableHead>
              <I18nText id="field.last-pcb.label" />
            </TableHead>
            <TableHead>
              <I18nText id="field.segments-count.label" />
            </TableHead>
            <TableHead className="w-50">
              <I18nText id="table.smt-lines.comment" />
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {smtLines.map(smtLine => (
            <TableRow key={smtLine.id}>
              <TableCell>
                <div className="font-semibold line-clamp-2 whitespace-normal">
                  {smtLine.board}
                </div>
              </TableCell>
              <TableCell>
                <I18nDate date={smtLine.timeStart} />
                <p className="text-muted-foreground text-sm">
                  <I18nTime date={smtLine.timeStart} />
                </p>
              </TableCell>
              <TableCell>
                <I18nDate date={smtLine.timeEnd} />
                <p className="text-muted-foreground text-sm">
                  <I18nTime date={smtLine.timeEnd} />
                </p>
              </TableCell>
              <TableCell className="text-center">{smtLine.pcbSide}</TableCell>
              <TableCell className="text-center">{smtLine.firstMPcb}</TableCell>
              <TableCell className="text-center">{smtLine.firstPcb}</TableCell>
              <TableCell className="text-center">{smtLine.lastMPcb}</TableCell>
              <TableCell className="text-center">{smtLine.lastPcb}</TableCell>
              <TableCell className="text-center">{smtLine.segmentsCount}</TableCell>
              <TableCell>
                <div className="select-text text-left line-clamp-2 whitespace-normal">
                  {smtLine.comment}
                </div>
                {!smtLine.comment && (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  className="text-destructive"
                  disabled={deletingSMTLinePendingId === smtLine.id}
                  size="icon-sm"
                  variant="ghost"
                  onClick={() => onDeleteSMTLine(smtLine.id)}
                >
                  <TrashIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
