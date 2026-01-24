import { CheckIcon, ChevronDownIcon, ChevronsUpDownIcon, TableIcon, TrashIcon } from 'lucide-react'
import { Controller } from 'react-hook-form'

import { Button, Calendar, Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Field, FieldContent, FieldDescription, FieldError, FieldLabel, Header, I18nDate, I18nText, I18nTime, Input, Layout, Popover, PopoverContent, PopoverTrigger, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Spinner, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Textarea } from '@/components'
import { ButtonGroup } from '@/components/ui/button-group'
import { cn } from '@/lib'
import { useI18n } from '@/providers'

import { useNewPage } from '../../-hooks/use-new-page'

export function NewPage() {
  const { state, handlers, queries, mutations, features } = useNewPage()
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

                {!features.isMobile && (
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
                        {queries.smtLines.data.data?.smtLines.map(smtLine => (
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
                                disabled={state.deletingSMTLinePendingId === smtLine.id}
                                size="icon-sm"
                                variant="ghost"
                                onClick={() => handlers.onDeleteSMTLine(smtLine.id)}
                              >
                                <TrashIcon />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {features.isMobile && (
                  <div className="overflow-auto flex-1 space-y-3 px-1">
                    {queries.smtLines.data.data?.smtLines.map(smtLine => (
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
                              disabled={state.deletingSMTLinePendingId === smtLine.id}
                              size="icon-sm"
                              variant="ghost"
                              onClick={() => handlers.onDeleteSMTLine(smtLine.id)}
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
                )}
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>
        <CardContent className="w-87.5 md:w-150">
          <form id="new-form" onSubmit={handlers.onNewFormSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <Controller
                control={state.newForm.control}
                name="board"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      <I18nText id="field.board.label" />
                    </FieldLabel>

                    <Popover open={state.boardsSelect.opened} onOpenChange={state.boardsSelect.setOpened}>
                      <PopoverTrigger asChild>
                        <Button
                          aria-expanded={state.boardsSelect.opened}
                          aria-invalid={fieldState.invalid}
                          className="w-full justify-between font-normal h-auto py-1.5 whitespace-normal"
                          role="combobox"
                          variant="outline"
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
                              {queries.dictionary.data?.data?.boards.map(board => (
                                <CommandItem
                                  key={board}
                                  value={board}
                                  onSelect={() => {
                                    field.onChange(board)
                                    state.boardsSelect.close()
                                  }}
                                >
                                  <span className="truncate w-75">{board}</span>
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

                    {fieldState.invalid && <FieldError errors={[t(fieldState.error)]} />}
                  </Field>
                )}
              />

              <Controller
                control={state.newForm.control}
                name="pcbSide"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      <I18nText id="field.pcb-side.label" />
                    </FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full" size="sm">
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
                    {fieldState.invalid && <FieldError errors={[t(fieldState.error)]} />}
                  </Field>
                )}
              />

              <Field data-invalid={!!state.newForm.formState.errors.firstMPcb?.message || !!state.newForm.formState.errors.lastMPcb?.message}>
                <div className="flex gap-2">
                  <FieldLabel>
                    <I18nText id="field.first-m-pcb.label" />
                  </FieldLabel>
                  <FieldLabel>
                    <I18nText id="field.last-m-pcb.label" />
                  </FieldLabel>
                </div>
                <ButtonGroup>
                  <Controller
                    control={state.newForm.control}
                    name="firstMPcb"
                    render={({ field: { value, ...field }, fieldState }) => (
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        id={field.name}
                        min={0}
                        type="number"
                        value={value as string ?? ''}
                      />
                    )}
                  />

                  <Controller
                    control={state.newForm.control}
                    name="lastMPcb"
                    render={({ field: { value, ...field }, fieldState }) => (
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        id={field.name}
                        min={0}
                        type="number"
                        value={value as string ?? ''}
                      />
                    )}
                  />
                </ButtonGroup>

                {(state.newForm.formState.errors.firstMPcb?.message || state.newForm.formState.errors.lastMPcb?.message) && (
                  <FieldError errors={[t(state.newForm.formState.errors.lastMPcb || state.newForm.formState.errors.firstMPcb)]} />
                )}
              </Field>

              <Field data-invalid={!!state.newForm.formState.errors.firstPcb?.message || !!state.newForm.formState.errors.lastPcb?.message}>
                <div className="flex gap-2">
                  <FieldLabel>
                    <I18nText id="field.first-pcb.label" />
                  </FieldLabel>
                  <FieldLabel>
                    <I18nText id="field.last-pcb.label" />
                  </FieldLabel>
                </div>
                <ButtonGroup>
                  <Controller
                    control={state.newForm.control}
                    name="firstPcb"
                    render={({ field: { value, ...field }, fieldState }) => (
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        id={field.name}
                        min={0}
                        type="number"
                        value={value as string ?? ''}
                      />
                    )}
                  />

                  <Controller
                    control={state.newForm.control}
                    name="lastPcb"
                    render={({ field: { value, ...field }, fieldState }) => (
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        id={field.name}
                        min={0}
                        type="number"
                        value={value as string ?? ''}
                      />
                    )}
                  />
                </ButtonGroup>

                {(state.newForm.formState.errors.firstPcb?.message || state.newForm.formState.errors.lastPcb?.message) && (
                  <FieldError errors={[t(state.newForm.formState.errors.lastPcb || state.newForm.formState.errors.firstPcb)]} />
                )}
              </Field>

              <Controller
                control={state.newForm.control}
                name="segmentsCount"
                render={({ field: { value, ...field }, fieldState }) => (
                  <Field className="md:col-span-2" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      <I18nText id="field.segments-count.label" />
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id={field.name}
                      min={0}
                      type="number"
                      value={String(value)}
                    />
                    {fieldState.invalid && <FieldError errors={[t(fieldState.error)]} />}
                  </Field>
                )}
              />

              <Field data-disabled="true">
                <FieldLabel>
                  <I18nText id="field.done-per-shift-m-pcb.label" />
                </FieldLabel>
                <Input disabled min={0} type="number" value={String(state.donePerShiftMPcb)} />
              </Field>

              <Field data-disabled="true">
                <FieldLabel>
                  <I18nText id="field.done-per-shift-pcb.label" />
                </FieldLabel>
                <Input disabled min={0} type="number" value={String(state.donePerShiftPcb)} />
              </Field>

              <Field
                data-invalid={!!state.newForm.formState.errors.timestampStart}
                className="md:col-start-2 md:row-start-1"
              >
                <FieldLabel>
                  <I18nText id="field.start-time.label" />
                </FieldLabel>

                <ButtonGroup>
                  <Controller
                    control={state.newForm.control}
                    name="timestampStart.date"
                    render={({ field, fieldState }) => (
                      <Popover open={state.dateStartPicker.opened} onOpenChange={state.dateStartPicker.setOpened}>
                        <PopoverTrigger asChild>
                          <Button
                            aria-expanded={state.dateStartPicker.opened}
                            aria-invalid={fieldState.invalid}
                            className="max-h-9 justify-between font-normal"
                            variant="outline"
                          >
                            {field.value ? field.value.toLocaleDateString() : t('field.datepicker.placeholder')}
                            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar
                            captionLayout="dropdown"
                            mode="single"
                            selected={field.value ?? undefined}
                            onSelect={(date) => {
                              field.onChange(date)
                              state.dateStartPicker.close()
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />

                  <Controller
                    control={state.newForm.control}
                    name="timestampStart.time"
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        id={field.name}
                        type="time"
                      />
                    )}
                  />
                </ButtonGroup>

                {(state.newForm.formState.errors.timestampStart?.date?.message || state.newForm.formState.errors.timestampStart?.time?.message) && (
                  <FieldError errors={[t(state.newForm.formState.errors.timestampStart?.date || state.newForm.formState.errors.timestampStart?.time)]} />
                )}
              </Field>

              <Field
                data-invalid={!!state.newForm.formState.errors.timestampEnd}
                className="md:col-start-2 md:row-start-2"
              >
                <FieldLabel>
                  <I18nText id="field.end-time.label" />
                </FieldLabel>
                <ButtonGroup>
                  <Controller
                    control={state.newForm.control}
                    name="timestampEnd.date"
                    render={({ field, fieldState }) => (
                      <Popover open={state.dateEndPicker.opened} onOpenChange={state.dateEndPicker.setOpened}>
                        <PopoverTrigger asChild>
                          <Button
                            aria-expanded={state.dateEndPicker.opened}
                            aria-invalid={fieldState.invalid}
                            className="max-h-9 justify-between font-normal"
                            variant="outline"
                          >
                            {field.value ? field.value.toLocaleDateString() : t('field.datepicker.placeholder')}
                            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar
                            captionLayout="dropdown"
                            mode="single"
                            selected={field.value ?? undefined}
                            onSelect={(date) => {
                              field.onChange(date)
                              state.dateEndPicker.close()
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />

                  <Controller
                    control={state.newForm.control}
                    name="timestampEnd.time"
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        id={field.name}
                        type="time"
                      />
                    )}
                  />
                </ButtonGroup>

                {(state.newForm.formState.errors.timestampEnd?.date?.message || state.newForm.formState.errors.timestampEnd?.time?.message) && (
                  <FieldError errors={[t(state.newForm.formState.errors.timestampEnd?.date || state.newForm.formState.errors.timestampEnd?.time)]} />
                )}
              </Field>

              <Controller
                control={state.newForm.control}
                name="comment"
                render={({ field, fieldState }) => (
                  <Field className="md:row-start-6 md:col-span-2 h-full flex flex-col" data-invalid={fieldState.invalid}>
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
                      aria-invalid={fieldState.invalid}
                      className="flex-1"
                      id={field.name}
                      placeholder={t('field.comment.placeholder')}
                      rows={3}
                    />

                    {fieldState.invalid && <FieldError errors={[t(fieldState.error)]} />}
                  </Field>
                )}
              />
            </div>
          </form>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full"
            disabled={mutations.createSMTLine.isPending || (state.newForm.formState.isDirty && !state.newForm.formState.isValid)}
            form="new-form"
            type="submit"
          >
            {mutations.createSMTLine.isPending && <Spinner />}
            <I18nText id="action.submit" />
          </Button>
        </CardFooter>
      </Card>
    </Layout>
  )
}
