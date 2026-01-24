import type { useDisclosure } from '@/hooks'

import { CalendarIcon, CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { Button, Calendar, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, I18nText, Popover, PopoverContent, PopoverTrigger, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components'
import { SMTLinesCards } from '../smt-lines-cards'
import { SMTLinesTable } from '../smt-lines-table'
import { useSMTLinesModal } from './hooks'

export interface SMTLinesModalProps {
  smtLinesModal: ReturnType<typeof useDisclosure>
}

export function SMTLinesModal({ smtLinesModal }: SMTLinesModalProps) {
  const { features, queries, state, functions } = useSMTLinesModal()

  return (
    <Dialog open onOpenChange={smtLinesModal.toggle}>
      <DialogContent className="md:max-w-200 lg:max-w-5xl xl:max-w-300 max-h-[80vh] gap-10 overflow-hidden flex flex-col">
        <div className="flex gap-6 lg:gap-10 items-center flex-col md:flex-row">
          <DialogHeader>
            <DialogTitle>
              <I18nText id="dialog.smt-lines.title" />
            </DialogTitle>
            <DialogDescription>
              <I18nText id="dialog.smt-lines.description" />
            </DialogDescription>
          </DialogHeader>

          <div className="flex w-full gap-4 flex-col sm:flex-row md:flex-col">
            <div className="flex flex-wrap gap-2 flex-row sm:flex-col md:flex-row">
              <Popover open={features.boardsSelect.opened} onOpenChange={features.boardsSelect.toggle}>
                <PopoverTrigger asChild>
                  <Button
                    role="combobox"
                    variant="outline"
                    className="w-full xs:w-fit sm:w-48 xs:max-w-48 flex justify-between"
                  >
                    <span className="truncate text-left">
                      {state.summaryFilters.pcb}
                      {!state.summaryFilters.pcb && <I18nText id="field.board.placeholder" />}
                    </span>
                    <ChevronsUpDownIcon className="shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command>
                    <CommandInput placeholder={features.i18n.t('field.board.search')} />
                    <CommandList>
                      <CommandEmpty>
                        <I18nText id="field.board.not-found" />
                      </CommandEmpty>
                      <CommandGroup>
                        {queries.dictionary.data.data?.boards.map(board => (
                          <CommandItem
                            key={board}
                            value={board}
                            onSelect={(value) => {
                              functions.onPCBChange(value)
                              features.boardsSelect.toggle(false)
                            }}
                          >
                            <span className="truncate w-75">{board}</span>
                            <CheckIcon className={state.summaryFilters.pcb === board ? 'opacity-100' : 'opacity-0'} />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <Select value={state.summaryFilters.side} onValueChange={functions.onSideChange}>
                <SelectTrigger className="w-full xs:w-fit sm:w-48 md:w-32" size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="T">
                    <I18nText id="field.pcb-side.top" />
                  </SelectItem>
                  <SelectItem value="B">
                    <I18nText id="field.pcb-side.bottom" />
                  </SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="w-full xs:w-48 xs:max-w-48 flex justify-between"
                    variant="outline"
                  >
                    {state.summaryFilters.dateRange.from && state.summaryFilters.dateRange.to
                      ? (
                          <>
                            {state.summaryFilters.dateRange.from.toLocaleDateString()}
                            {' - '}
                            {state.summaryFilters.dateRange.to.toLocaleDateString()}
                          </>
                        )
                      : (
                          <I18nText id="field.datepicker.placeholder" />
                        )}
                    <CalendarIcon className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    captionLayout="dropdown"
                    mode="range"
                    selected={state.summaryFilters.dateRange}
                    onSelect={functions.onDateRangeChange}
                    required={true}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="h-10">
              {queries.summary.isFetched && queries.summary.data?.data && (
                <>
                  <p className="text-sm text-muted-foreground">
                    <I18nText id="field.done-per-shift-pcb.label" />
                  </p>
                  <p className="font-medium">{queries.summary.data.data.donePerShiftPcb}</p>
                </>
              )}
            </div>
          </div>
        </div>

        {!features.isMobile && (
          <SMTLinesTable
            deletingSMTLinePendingId={state.deletingSMTLinePendingId}
            smtLines={queries.smtLines.data.data.smtLines}
            onDeleteSMTLine={functions.onDeleteSMTLine}
          />
        )}

        {features.isMobile && (
          <SMTLinesCards
            deletingSMTLinePendingId={state.deletingSMTLinePendingId}
            smtLines={queries.smtLines.data.data.smtLines}
            onDeleteSMTLine={functions.onDeleteSMTLine}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
