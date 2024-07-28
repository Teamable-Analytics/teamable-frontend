export type DjangoFieldError = string[];
export type DjangoErrorResponse<FieldNames extends string = undefined> = Record<
  FieldNames,
  DjangoFieldError
> & {
  non_field_errors?: DjangoFieldError;
};
