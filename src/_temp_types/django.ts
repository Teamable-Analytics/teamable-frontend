export type DjangoFieldError = string[];
export type DjangoErrorResponse<FieldNames extends string = never> = Record<
  FieldNames,
  DjangoFieldError
> & {
  non_field_errors?: DjangoFieldError;
};
