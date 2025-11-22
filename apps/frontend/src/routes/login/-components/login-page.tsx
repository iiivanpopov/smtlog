import { Controller } from 'react-hook-form'
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, Field, FieldDescription, FieldError, FieldLabel, Header, I18nText, Input, Layout, Spinner } from '@/components'
import { useI18n } from '@/providers'
import { useLoginPage } from '../-hooks/use-login-page'

export function LoginPage() {
  const { state, handlers, mutations } = useLoginPage()
  const { t } = useI18n()

  return (
    <Layout>
      <Header />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>
            <I18nText id="action.login" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={handlers.onLoginFormSubmit}>
            <Controller
              name="code"
              control={state.loginForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    <I18nText id="field.code.label" />
                  </FieldLabel>
                  <Input
                    placeholder="725139"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldDescription>
                    <I18nText id="field.description.code" />
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[t(fieldState.error)]} />
                  )}
                </Field>
              )}
            />
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            form="login-form"
            disabled={mutations.login.isPending || !state.loginForm.formState.isValid}
          >
            {mutations.login.isPending && <Spinner />}
            <I18nText id="action.submit" />
          </Button>
        </CardFooter>
      </Card>
    </Layout>
  )
}
