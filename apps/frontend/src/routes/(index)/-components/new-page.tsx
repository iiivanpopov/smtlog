import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { Controller } from 'react-hook-form'
import {
  Button,
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
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
  I18nText,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components'
import { cn } from '@/lib'
import { useI18n } from '@/providers'
import { useNewPage } from '../-hooks/use-new-page'

export function NewPage() {
  const { state, actions, queries } = useNewPage()
  const { t } = useI18n()

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <I18nText id="action.create-new" />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form id="new-form" onSubmit={actions.onNewFormSubmit}>
          <FieldSet>
            <Controller
              name="board"
              control={state.newForm.control}
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid} className="w-[300px]">
                  <FieldLabel htmlFor={field.name}>
                    <I18nText id="field.label.board" />
                  </FieldLabel>

                  <Popover open={state.boardsSelect.opened} onOpenChange={state.boardsSelect.setOpened}>
                    <PopoverTrigger aria-invalid={fieldState.invalid} asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-invalid={fieldState.invalid}
                        aria-expanded={state.boardsSelect.opened}
                        className="max-w-[300px] justify-between"
                      >
                        <span className="max-w-[250px] overflow-hidden text-ellipsis">
                          {field.value
                            ? queries.dictionary.data?.data.boards.find(board => board === field.value)
                            : t('placeholder.board')}
                        </span>
                        <ChevronsUpDownIcon className="opacity-50" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="max-w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder={t('field.board.search')} className="h-9" />
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
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    field.value === board ? 'opacity-100' : 'opacity-0',
                                  )}
                                />
                                {board}
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
              name="count"
              control={state.newForm.control}
              render={({ field: { value, ...field }, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-[300px]">
                  <FieldLabel htmlFor={field.name}>
                    <I18nText id="field.label.count" />
                  </FieldLabel>

                  <Input
                    {...field}
                    value={String(value)}
                    placeholder="1"
                    id={field.name}
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && <FieldError errors={[t(fieldState.error)]} />}
                </Field>
              )}
            />
          </FieldSet>
        </form>
      </CardContent>

      <CardFooter>
        <Field>
          <FieldDescription>
            <I18nText id="action.submit.description" />
          </FieldDescription>
          <Button
            type="submit"
            form="new-form"
            disabled={!state.newForm.formState.isValid && state.newForm.formState.isSubmitted}
          >
            <I18nText id="action.submit" />
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
