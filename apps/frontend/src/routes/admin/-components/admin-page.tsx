import { ChevronLeftIcon, ChevronRightIcon, ListIcon, SettingsIcon, TrashIcon } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { Button, Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Field, FieldError, FieldLabel, FieldSet, Header, I18nText, Input, Layout, Pagination, PaginationContent, PaginationItem, PaginationLink, Spinner } from '@/components'
import { cn } from '@/lib'
import { useI18n } from '@/providers'
import { useAdminPage } from '../-hooks/use-admin-page'

export function AdminPage() {
  const { state, handlers, queries, mutations, pagination } = useAdminPage()
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
            <div className="space-x-1">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <SettingsIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      <I18nText id="dialog.source.title" />
                    </DialogTitle>
                    <DialogDescription>
                      <I18nText id="dialog.source.description" />
                    </DialogDescription>
                  </DialogHeader>
                  <form id="source-form" onSubmit={handlers.onSourceSettingFormSubmit}>
                    <Controller
                      name="source"
                      control={state.sourceSettingForm.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Input
                            {...field}
                            placeholder={t('field.source.placeholder')}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                          />
                          {fieldState.invalid && (<FieldError errors={[t(fieldState.error)]} />)}
                        </Field>
                      )}
                    />
                  </form>
                  <DialogFooter>
                    <Button
                      type="submit"
                      form="source-form"
                      className="w-full"
                      disabled={mutations.setSetting.isPending || !state.sourceSettingForm.formState.isValid}
                    >
                      {mutations.setSetting.isPending && <Spinner />}
                      <I18nText id="action.submit" />
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <ListIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col max-h-[85vh] h-[85vh]">
                  <DialogHeader>
                    <DialogTitle>
                      <I18nText id="dialog.users.title" />
                    </DialogTitle>
                    <DialogDescription>
                      <I18nText id="dialog.users.description" />
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-3 flex-1 overflow-auto">
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

                  <DialogFooter>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem className={cn(pagination.isFirstPage && 'invisible')}>
                          <PaginationLink asChild>
                            <Button onClick={() => pagination.setPage(pagination.page - 1)} variant="ghost" size="icon">
                              <ChevronLeftIcon />
                            </Button>
                          </PaginationLink>
                        </PaginationItem>

                        <PaginationItem className={cn(pagination.page === 1 && 'invisible')}>
                          <PaginationLink asChild>
                            <Button onClick={() => pagination.setPage(1)} variant="ghost" size="icon">
                              1
                            </Button>
                          </PaginationLink>
                        </PaginationItem>

                        <PaginationItem className={cn(pagination.pageCount === 1 && 'invisible')}>
                          <PaginationLink asChild isActive={true}>
                            <span>
                              {pagination.page}
                            </span>
                          </PaginationLink>
                        </PaginationItem>

                        <PaginationItem className={cn(pagination.pageCount === pagination.page && 'invisible')}>
                          <PaginationLink asChild>
                            <Button onClick={() => pagination.setPage(pagination.pageCount)} variant="ghost" size="icon">
                              {pagination.pageCount}
                            </Button>
                          </PaginationLink>
                        </PaginationItem>

                        <PaginationItem className={cn(pagination.isLastPage && 'invisible')}>
                          <PaginationLink asChild>
                            <Button onClick={() => pagination.setPage(pagination.page + 1)} variant="ghost" size="icon">
                              <ChevronRightIcon />
                            </Button>
                          </PaginationLink>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
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
                      placeholder={t('field.code.placeholder')}
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
                      placeholder={t('field.name.placeholder')}
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
