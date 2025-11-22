import { ListIcon, TrashIcon } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { Button, Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Field, FieldError, FieldLabel, FieldSet, Header, I18nText, Input, Layout, Spinner } from '@/components'
import { useI18n } from '@/providers'
import { useAdminPage } from '../-hooks/use-admin-page'

export function AdminPage() {
  const { state, handlers, queries, mutations } = useAdminPage()
  const { t } = useI18n()

  return (
    <Layout>
      <Header />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>
            <I18nText id="action.register" />
          </CardTitle>
          <CardAction>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ListIcon />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <I18nText id="dialog.users.title" />
                  </DialogTitle>
                  <DialogDescription>
                    <I18nText id="dialog.users.description" />
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-3">
                  {queries.getUsers.data.data.users.map(user => (
                    <Card key={user.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            <I18nText id="table.user.name" />
                          </p>
                          <p className="font-semibold">
                            {user.name}
                          </p>
                        </div>
                        <Button
                          disabled={mutations.deleteUser.isPending}
                          onClick={() => handlers.onDeleteUser(user.id)}
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
        <CardContent>
          <form id="register-form" onSubmit={handlers.onRegisterFormSubmit}>
            <FieldSet>
              <Controller
                name="code"
                control={state.registerForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      <I18nText id="field.code.label" />
                    </FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (<FieldError errors={[t(fieldState.error)]} />)}
                  </Field>
                )}
              />
              <Controller
                name="name"
                control={state.registerForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      <I18nText id="field.name.label" />
                    </FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (<FieldError errors={[t(fieldState.error)]} />)}
                  </Field>
                )}
              />
            </FieldSet>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            form="register-form"
            className="w-full"
            disabled={mutations.register.isPending || !state.registerForm.formState.isValid}
          >
            {mutations.register.isPending && <Spinner />}
            <I18nText id="action.submit" />
          </Button>
        </CardFooter>
      </Card>
    </Layout>
  )
}
