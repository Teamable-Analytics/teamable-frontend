import React from "react"
import { ErrorMessageProps } from "formik/dist/ErrorMessage"
import { ErrorMessage } from "formik"

export namespace InputErrorMessage {
  export interface Props extends ErrorMessageProps {}
}

export const InputErrorMessage = ({ id, name }: InputErrorMessage.Props) => {
  return (
    <div className="text-red-500 text-xs">
      <ErrorMessage id={id} name={name} />
    </div>
  )
}
