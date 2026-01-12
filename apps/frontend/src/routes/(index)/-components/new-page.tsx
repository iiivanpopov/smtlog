import { CheckIcon, ChevronDownIcon, ChevronsUpDownIcon, ListIcon, TrashIcon } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { Button, Calendar, Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Field, FieldContent, FieldDescription, FieldError, FieldLabel, Header, I18nDate, I18nText, I18nTime, Input, Layout, Popover, PopoverContent, PopoverTrigger, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Spinner, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Textarea, Tooltip, TooltipContent, TooltipTrigger } from '@/components'
import { cn } from '@/lib'
import { useI18n } from '@/providers'
import { useNewPage } from '../-hooks/use-new-page'

export function NewPage() {
  const { state, handlers, queries, mutations } = useNewPage()
  const { t } = useI18n()

  return (
    <Layout>
      <Header />
      <Card>
        <CardHeader>
          <CardTitle>
            <I18nText id="action.create-new" />
          </CardTitle>
          <CardAction>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ListIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] md:max-w-[800px] max-h-[85vh] overflow-hidden flex flex-col">
                <DialogHeader>
                  <DialogTitle>
                    <I18nText id="dialog.smt-lines.title" />
                  </DialogTitle>
                  <DialogDescription>
                    <I18nText id="dialog.smt-lines.description" />
                  </DialogDescription>
                </DialogHeader>

                <div className="hidden md:block overflow-auto flex-1">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[120px]">
                          <I18nText id="table.smt-lines.board" />
                        </TableHead>
                        <TableHead className="min-w-[130px]">
                          <I18nText id="table.smt-lines.start-at" />
                        </TableHead>
                        <TableHead className="min-w-[130px]">
                          <I18nText id="table.smt-lines.end-at" />
                        </TableHead>
                        <TableHead className="w-20 text-center">
                          <I18nText id="field.pcb-side.label" />
                        </TableHead>
                        <TableHead className="w-24 text-center">
                          <I18nText id="field.first-m-pcb.label" />
                        </TableHead>
                        <TableHead className="w-24 text-center">
                          <I18nText id="field.first-pcb.label" />
                        </TableHead>
                        <TableHead className="w-24 text-center">
                          <I18nText id="field.last-m-pcb.label" />
                        </TableHead>
                        <TableHead className="w-24 text-center">
                          <I18nText id="field.last-pcb.label" />
                        </TableHead>
                        <TableHead className="w-24 text-center">
                          <I18nText id="field.segments-count.label" />
                        </TableHead>
                        <TableHead className="min-w-[120px]">
                          <I18nText id="table.smt-lines.comment" />
                        </TableHead>
                        <TableHead className="w-16"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {queries.smtLines.data.data.smtLines.map(smtLine => (
                        <TableRow key={smtLine.id}>
                          <TableCell>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <p className="font-semibold text-left line-clamp-2 max-w-[200px]">{smtLine.board}</p>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-[300px] wrap-break-word">
                                {smtLine.board}
                              </TooltipContent>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <p><I18nDate date={smtLine.timeStart} /></p>
                            <p className="text-muted-foreground text-sm"><I18nTime date={smtLine.timeStart} /></p>
                          </TableCell>
                          <TableCell>
                            <p><I18nDate date={smtLine.timeEnd} /></p>
                            <p className="text-muted-foreground text-sm"><I18nTime date={smtLine.timeEnd} /></p>
                          </TableCell>
                          <TableCell className="text-center">
                            {smtLine.pcbSide}
                          </TableCell>
                          <TableCell className="text-center">
                            {smtLine.firstMPcb}
                          </TableCell>
                          <TableCell className="text-center">
                            {smtLine.firstPcb}
                          </TableCell>
                          <TableCell className="text-center">
                            {smtLine.lastMPcb}
                          </TableCell>
                          <TableCell className="text-center">
                            {smtLine.lastPcb}
                          </TableCell>
                          <TableCell className="text-center">
                            {smtLine.segmentsCount}
                          </TableCell>
                          <TableCell>
                            {smtLine.comment && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <p className="text-left line-clamp-2 max-w-[200px]">{smtLine.comment}</p>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-[300px] max-h-[300px] wrap-break-word">
                                  {smtLine.comment}
                                </TooltipContent>
                              </Tooltip>
                            )}
                            {!smtLine.comment && (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              disabled={mutations.deleteSMTLine.isPending}
                              onClick={() => handlers.onDeleteSMTLine(smtLine.id)}
                              className="text-destructive"
                              variant="ghost"
                              size="icon-sm"
                            >
                              <TrashIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="md:hidden overflow-auto flex-1 space-y-3 px-1">
                  {queries.smtLines.data.data.smtLines.map(smtLine => (
                    <Card key={smtLine.id} className="p-4">
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            <I18nText id="table.smt-lines.board" />
                          </p>
                          <p className="font-semibold wrap-break-word">{smtLine.board}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              <I18nText id="table.smt-lines.start-at" />
                            </p>
                            <p className="text-sm"><I18nDate date={smtLine.timeStart} /></p>
                            <p className="text-xs text-muted-foreground"><I18nTime date={smtLine.timeStart} /></p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              <I18nText id="table.smt-lines.end-at" />
                            </p>
                            <p className="text-sm"><I18nDate date={smtLine.timeEnd} /></p>
                            <p className="text-xs text-muted-foreground"><I18nTime date={smtLine.timeEnd} /></p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              <I18nText id="field.first-m-pcb.label" />
                            </p>
                            <p className="text-sm font-medium">{smtLine.firstMPcb}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              <I18nText id="field.first-pcb.label" />
                            </p>
                            <p className="text-sm font-medium">{smtLine.firstPcb}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              <I18nText id="field.last-m-pcb.label" />
                            </p>
                            <p className="text-sm font-medium">{smtLine.lastMPcb}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              <I18nText id="field.last-pcb.label" />
                            </p>
                            <p className="text-sm font-medium">{smtLine.lastPcb}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              <I18nText id="field.pcb-side.label" />
                            </p>
                            <p className="text-sm font-medium">{smtLine.pcbSide}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              <I18nText id="field.segments-count.label" />
                            </p>
                            <p className="text-sm font-medium">{smtLine.segmentsCount}</p>
                          </div>
                        </div>

                        {smtLine.comment && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              <I18nText id="table.smt-lines.comment" />
                            </p>
                            <p className="text-sm wrap-break-word">{smtLine.comment}</p>
                          </div>
                        )}
                        <Button
                          disabled={mutations.deleteSMTLine.isPending}
                          onClick={() => handlers.onDeleteSMTLine(smtLine.id)}
                          className="text-destructive"
                          variant="ghost"
                          size="icon-sm"
                        >
                          <TrashIcon />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>
        <CardContent className="w-[350px] md:w-[600px]">
          <form id="new-form" onSubmit={handlers.onNewFormSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <Controller
                name="board"
                control={state.newForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      <I18nText id="field.board.label" />
                    </FieldLabel>

                    <Popover open={state.boardsSelect.opened} onOpenChange={state.boardsSelect.setOpened}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-invalid={fieldState.invalid}
                          aria-expanded={state.boardsSelect.opened}
                          className="w-full justify-between font-normal h-auto py-1.5 whitespace-normal"
                        >
                          <span className="line-clamp-2 text-left">
                            {field.value}
                            {!field.value && t('field.board.placeholder')}
                          </span>
                          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                        <Command>
                          <CommandInput placeholder={t('field.board.search')} />
                          <CommandList>
                            <CommandEmpty>
                              <I18nText id="field.board.not-found" />
                            </CommandEmpty>
                            <CommandGroup>
                              {queries.dictionary.data?.data.boards.map(board => (
                                <CommandItem
                                  key={board}
                                  value={board}
                                  onSelect={() => {
                                    field.onChange(board)
                                    state.boardsSelect.close()
                                  }}
                                >
                                  <span className="truncate w-[300px]">
                                    {board}
                                  </span>
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      field.value === board ? 'opacity-100' : 'opacity-0',
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    {fieldState.invalid && (<FieldError errors={[t(fieldState.error)]} />)}
                  </Field>
                )}
              />

              <Controller
                name="pcbSide"
                control={state.newForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      <I18nText id="field.pcb-side.label" />
                    </FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger size="sm" className="w-full">
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
                    {fieldState.invalid && (<FieldError errors={[t(fieldState.error)]} />)}
                  </Field>
                )}
              />

              <Controller
                name="firstMPcb"
                control={state.newForm.control}
                render={({ field: { value, ...field }, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      <I18nText id="field.first-m-pcb.label" />
                    </FieldLabel>
                    <Input
                      {...field}
                      value={String(value)}
                      type="number"
                      min={0}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (<FieldError errors={[t(fieldState.error)]} />)}
                  </Field>
                )}
              />

              <Controller
                name="firstPcb"
                control={state.newForm.control}
                render={({ field: { value, ...field }, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      <I18nText id="field.first-pcb.label" />
                    </FieldLabel>
                    <Input
                      {...field}
                      value={String(value)}
                      type="number"
                      min={0}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (<FieldError errors={[t(fieldState.error)]} />)}
                  </Field>
                )}
              />

              <Controller
                name="lastMPcb"
                control={state.newForm.control}
                render={({ field: { value, ...field }, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      <I18nText id="field.last-m-pcb.label" />
                    </FieldLabel>
                    <Input
                      {...field}
                      value={String(value)}
                      type="number"
                      min={0}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (<FieldError errors={[t(fieldState.error)]} />)}
                  </Field>
                )}
              />

              <Controller
                name="lastPcb"
                control={state.newForm.control}
                render={({ field: { value, ...field }, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      <I18nText id="field.last-pcb.label" />
                    </FieldLabel>
                    <Input
                      {...field}
                      value={String(value)}
                      type="number"
                      min={0}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (<FieldError errors={[t(fieldState.error)]} />)}
                  </Field>
                )}
              />

              <Field aria-disabled="true">
                <FieldLabel>
                  <I18nText id="field.done-per-shift-m-pcb.label" />
                </FieldLabel>
                <Input
                  disabled
                  value={String(state.donePerShiftMPcb)}
                  type="number"
                  min={0}
                />
              </Field>

              <Field aria-disabled="true">
                <FieldLabel>
                  <I18nText id="field.done-per-shift-pcb.label" />
                </FieldLabel>
                <Input
                  disabled
                  value={String(state.donePerShiftPcb)}
                  type="number"
                  min={0}
                />
              </Field>

              <Field className="md:col-start-2 md:row-start-1">
                <FieldLabel>
                  <I18nText id="field.start-time.label" />
                </FieldLabel>
                <div className="flex gap-2">
                  <Controller
                    name="timestampStart.date"
                    control={state.newForm.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="w-[140px] flex-1">
                        <Popover open={state.dateStartPicker.opened} onOpenChange={state.dateStartPicker.setOpened}>
                          <PopoverTrigger asChild>
                            <Button
                              aria-invalid={fieldState.invalid}
                              aria-expanded={state.dateStartPicker.opened}
                              variant="outline"
                              className="max-h-9 justify-between font-normal"
                            >
                              {field.value ? field.value.toLocaleDateString() : t('field.datepicker.placeholder')}
                              <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ?? undefined}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                field.onChange(date)
                                state.dateStartPicker.close()
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        {fieldState.invalid && (<FieldError errors={[t(fieldState.error)]} />)}
                      </Field>
                    )}
                  />

                  <Controller
                    name="timestampStart.time"
                    control={state.newForm.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="w-[140px] flex-1">
                        <Input
                          {...field}
                          type="time"
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (<FieldError errors={[t(fieldState.error)]} />)}
                      </Field>
                    )}
                  />
                </div>
              </Field>

              <Field className="md:col-start-2 md:row-start-2">
                <FieldLabel>
                  <I18nText id="field.end-time.label" />
                </FieldLabel>
                <div className="flex gap-2">
                  <Controller
                    name="timestampEnd.date"
                    control={state.newForm.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="w-[140px] flex-1">
                        <Popover open={state.dateEndPicker.opened} onOpenChange={state.dateEndPicker.setOpened}>
                          <PopoverTrigger asChild>
                            <Button
                              aria-invalid={fieldState.invalid}
                              variant="outline"
                              aria-expanded={state.dateEndPicker.opened}
                              className="max-h-9 justify-between font-normal"
                            >
                              {field.value ? field.value.toLocaleDateString() : t('field.datepicker.placeholder')}
                              <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ?? undefined}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                field.onChange(date)
                                state.dateEndPicker.close()
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        {fieldState.invalid && (<FieldError errors={[t(fieldState.error)]} />)}
                      </Field>
                    )}
                  />

                  <Controller
                    name="timestampEnd.time"
                    control={state.newForm.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="w-[140px] flex-1">
                        <Input
                          {...field}
                          type="time"
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (<FieldError errors={[t(fieldState.error)]} />)}
                      </Field>
                    )}
                  />
                </div>
              </Field>

              <Controller
                name="segmentsCount"
                control={state.newForm.control}
                render={({ field: { value, ...field }, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                    <FieldLabel htmlFor={field.name}>
                      <I18nText id="field.segments-count.label" />
                    </FieldLabel>
                    <Input
                      {...field}
                      value={String(value)}
                      type="number"
                      min={0}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (<FieldError errors={[t(fieldState.error)]} />)}
                  </Field>
                )}
              />

              <Controller
                name="comment"
                control={state.newForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="md:row-start-6 md:col-span-2 h-full flex flex-col">
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>
                        <I18nText id="field.comment.label" />
                      </FieldLabel>
                      <FieldDescription>
                        <I18nText id="field.comment.description" />
                      </FieldDescription>
                    </FieldContent>

                    <Textarea
                      {...field}
                      placeholder={t('field.comment.placeholder')}
                      id={field.name}
                      rows={3}
                      className="flex-1"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (<FieldError errors={[t(fieldState.error)]} />)}
                  </Field>
                )}
              />
            </div>
          </form>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            form="new-form"
            className="w-full"
            disabled={mutations.createSMTLine.isPending || !state.newForm.formState.isValid}
          >
            {mutations.createSMTLine.isPending && <Spinner />}
            <I18nText id="action.submit" />
          </Button>
        </CardFooter>
      </Card>
    </Layout>
  )
}
