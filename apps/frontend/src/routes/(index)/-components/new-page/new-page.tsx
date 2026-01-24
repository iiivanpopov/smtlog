import { CheckIcon, ChevronDownIcon, ChevronsUpDownIcon } from 'lucide-react'
import { Controller } from 'react-hook-form'

import { Button, Calendar, Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Field, FieldContent, FieldDescription, FieldError, FieldLabel, Header, I18nText, Input, Layout, Popover, PopoverContent, PopoverTrigger, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Spinner, Textarea } from '@/components'
import { ButtonGroup } from '@/components/ui/button-group'
import { cn } from '@/lib'
import { useI18n } from '@/providers'

import { SMTLinesModal } from './components'
import { useNewPage } from './hooks/use-new-page'

export function NewPage() {
  const { form, state, handlers, mutations } = useNewPage()
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
            <SMTLinesModal />
          </CardAction>
        </CardHeader>
        <CardContent className="w-87.5 md:w-150">
          <form id="new-form" onSubmit={handlers.onNewFormSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <Controller
                control={form.control}
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
                              {state.boards.map(board => (
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
                control={form.control}
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

              <Field data-invalid={!!form.formState.errors.firstMPcb?.message || !!form.formState.errors.lastMPcb?.message}>
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
                    control={form.control}
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
                    control={form.control}
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

                {(form.formState.errors.firstMPcb?.message || form.formState.errors.lastMPcb?.message) && (
                  <FieldError errors={[t(form.formState.errors.lastMPcb || form.formState.errors.firstMPcb)]} />
                )}
              </Field>

              <Field data-invalid={!!form.formState.errors.firstPcb?.message || !!form.formState.errors.lastPcb?.message}>
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
                    control={form.control}
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
                    control={form.control}
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

                {(form.formState.errors.firstPcb?.message || form.formState.errors.lastPcb?.message) && (
                  <FieldError errors={[t(form.formState.errors.lastPcb || form.formState.errors.firstPcb)]} />
                )}
              </Field>

              <Controller
                control={form.control}
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
                data-invalid={!!form.formState.errors.timestampStart}
                className="md:col-start-2 md:row-start-1"
              >
                <FieldLabel>
                  <I18nText id="field.start-time.label" />
                </FieldLabel>

                <ButtonGroup>
                  <Controller
                    control={form.control}
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
                    control={form.control}
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

                {(form.formState.errors.timestampStart?.date?.message || form.formState.errors.timestampStart?.time?.message) && (
                  <FieldError errors={[t(form.formState.errors.timestampStart?.date || form.formState.errors.timestampStart?.time)]} />
                )}
              </Field>

              <Field
                data-invalid={!!form.formState.errors.timestampEnd}
                className="md:col-start-2 md:row-start-2"
              >
                <FieldLabel>
                  <I18nText id="field.end-time.label" />
                </FieldLabel>
                <ButtonGroup>
                  <Controller
                    control={form.control}
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
                    control={form.control}
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

                {(form.formState.errors.timestampEnd?.date?.message || form.formState.errors.timestampEnd?.time?.message) && (
                  <FieldError errors={[t(form.formState.errors.timestampEnd?.date || form.formState.errors.timestampEnd?.time)]} />
                )}
              </Field>

              <Controller
                control={form.control}
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
            disabled={mutations.createSMTLine.isPending || (form.formState.isDirty && !form.formState.isValid)}
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
