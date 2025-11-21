import { CheckIcon, ChevronDownIcon, ChevronsUpDownIcon } from 'lucide-react'
import { Controller } from 'react-hook-form'
import {
  Button,
  Calendar,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  Header,
  I18nText,
  Input,
  Layout,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@/components'
import { cn } from '@/lib'
import { useI18n } from '@/providers'
import { useNewPage } from '../-hooks/use-new-page'

export function NewPage() {
  const { state, handlers, queries } = useNewPage()
  const { t } = useI18n()

  return (
    <Layout>
      <Header />
      <Card>
        <CardHeader>
          <CardTitle>
            <I18nText id="action.create-new" />
          </CardTitle>
        </CardHeader>
        <CardContent className="w-[350px] lg:w-[600px]">
          <form id="new-form" onSubmit={handlers.onNewFormSubmit}>
            <div className="grid lg:grid-cols-2 gap-6">
              <FieldGroup>
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
                            className="w-full justify-between font-normal"
                          >
                            <span className="truncate max-w-[200px]">
                              {field.value
                                ? queries.dictionary.data?.data.boards.find(board => board === field.value)
                                : t('field.board.placeholder')}
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
                  name="count"
                  control={state.newForm.control}
                  render={({ field: { value, ...field }, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        <I18nText id="field.label.count" />
                      </FieldLabel>
                      <Input
                        {...field}
                        value={String(value)}
                        placeholder="1"
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
                    <Field data-invalid={fieldState.invalid}>
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
                        aria-invalid={fieldState.invalid}
                      />

                      {fieldState.invalid && (<FieldError errors={[t(fieldState.error)]} />)}
                    </Field>
                  )}
                />
              </FieldGroup>

              <FieldSeparator className="lg:hidden" />

              <FieldGroup>
                <Field>
                  <FieldLabel>
                    <I18nText id="field.start-time.label" />
                  </FieldLabel>
                  <div className="flex gap-2">
                    <Controller
                      name="timestampStart.date"
                      control={state.newForm.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="w-[140px]">
                          <Popover open={state.dateStartPicker.opened} onOpenChange={state.dateStartPicker.setOpened}>
                            <PopoverTrigger asChild>
                              <Button
                                aria-invalid={fieldState.invalid}
                                aria-expanded={state.dateStartPicker.opened}
                                variant="outline"
                                className="flex-1 max-h-9 justify-between font-normal"
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
                        <Field data-invalid={fieldState.invalid} className="w-[140px]">
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

                <Field>
                  <FieldLabel>
                    <I18nText id="field.end-time.label" />
                  </FieldLabel>
                  <div className="flex gap-2">
                    <Controller
                      name="timestampEnd.date"
                      control={state.newForm.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="w-[140px]">
                          <Popover open={state.dateEndPicker.opened} onOpenChange={state.dateEndPicker.setOpened}>
                            <PopoverTrigger asChild>
                              <Button
                                aria-invalid={fieldState.invalid}
                                variant="outline"
                                aria-expanded={state.dateEndPicker.opened}
                                className="flex-1 max-h-9 justify-between font-normal"
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
                        <Field data-invalid={fieldState.invalid} className="w-[140px]">
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
              </FieldGroup>
            </div>
          </form>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            form="new-form"
            className="w-full"
            disabled={!state.newForm.formState.isValid && state.newForm.formState.isSubmitted}
          >
            <I18nText id="action.submit" />
          </Button>
        </CardFooter>
      </Card>
    </Layout>
  )
}
