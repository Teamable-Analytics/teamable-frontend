"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Formik, FormikHelpers, useFormikContext } from "formik"
import * as Yup from "yup"
import { InputErrorMessage } from "@/components/InputErrorMessage"
import { useLogin } from "@/hooks/use-login"
import { LoginErrorResponse } from "@/_temp_types/accounts"

interface LogInFormValues {
  email: string;
  password: string;
}

export const LogInForm = () => {
  const { loginAsync } = useLogin()

  const onSubmit = async (
    values: LogInFormValues,
    formikHelpers: FormikHelpers<LogInFormValues>,
  ) => {
    try {
      await loginAsync({
        email: values.email,
        password: values.password,
      })
    } catch (error: any) {
      "email" in error &&
        formikHelpers.setFieldError("email", error.email.join(", "))
      "password" in error &&
        formikHelpers.setFieldError("password", error.password.join(", "))
    }
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={Yup.object({
        email: Yup.string().required("Required."),
        password: Yup.string().required("Required."),
      })}
      validateOnChange={false}
    >
      <LogInFormFields />
    </Formik>
  )
}

const LogInFormFields = () => {
  const {
    isValid,
    isValidating,
    isSubmitting,
    values,
    submitForm,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormikContext<LogInFormValues>()

  return (
    <form className={cn("grid gap-6")} onSubmit={handleSubmit}>
      <div className="grid gap-3">
        <div className="grid gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting || isValidating}
            value={values.email}
          />
          <InputErrorMessage id="email" name="email" />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoCapitalize="none"
            autoCorrect="off"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting || isValidating}
            value={values.password}
          />
          <div>
            <InputErrorMessage id="password" name="password" />
          </div>
        </div>
        <Button
          disabled={isSubmitting || isValidating || !isValid}
          onClick={submitForm}
        >
          {(isSubmitting || isValidating) && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Login
        </Button>
      </div>
    </form>
  )
}
