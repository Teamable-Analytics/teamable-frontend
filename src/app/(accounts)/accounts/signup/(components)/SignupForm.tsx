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
import { useSignUp } from "@/hooks/use-sign-up"
import { useSearchParams } from "next/navigation"

interface SignUpFormValues {
  email: string;
  password: string;
}

export const SignupForm = () => {
  const { signUpAsync } = useSignUp()
  const token = useSearchParams().get("token")

  const onSubmit = async (values: SignUpFormValues) => {
    await signUpAsync({
      email: values.email,
      password: values.password,
      token,
    })
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Please enter a valid email address.")
          .required("Required."),
        password: Yup.string()
          .min(8, "Password must be longer than 8 characters.")
          .required("Required."),
      })}
    >
      <SignUpFormFields />
    </Formik>
  )
}

const SignUpFormFields = () => {
  const {
    isValid,
    isValidating,
    isSubmitting,
    values,
    submitForm,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormikContext<SignUpFormValues>()

  return (
    <form className={cn("grid gap-6")} onSubmit={handleSubmit}>
      <div className="grid gap-2">
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
          Sign up with email
        </Button>
      </div>
    </form>
  )
}
