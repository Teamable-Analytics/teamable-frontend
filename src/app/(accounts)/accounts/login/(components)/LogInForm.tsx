"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Formik, useFormikContext } from "formik"
import * as Yup from "yup"
import { InputErrorMessage } from "@/components/InputErrorMessage"
import { useLogin } from "@/hooks/use-login"

interface LogInFormValues {
  username: string;
  password: string;
}

export const LogInForm = () => {
  const { loginAsync } = useLogin()

  const onSubmit = async (values: LogInFormValues) => {
    await loginAsync({
      username: values.username,
      password: values.password,
    })
  }

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={Yup.object({
        username: Yup.string().required("Required."),
        password: Yup.string().required("Required."),
      })}
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
  } = useFormikContext()

  return (
    <form className={cn("grid gap-6")} onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label htmlFor="username">Email</Label>
          <Input
            id="username"
            name="username"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting || isValidating}
            value={values.username}
          />
          <InputErrorMessage id="username" name="username" />
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
