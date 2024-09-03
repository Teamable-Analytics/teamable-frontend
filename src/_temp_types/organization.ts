export const LMS_TYPES = {
  CANVAS: "CANVAS",
} as const

export type LmsType = typeof LMS_TYPES[keyof typeof LMS_TYPES]

export interface Organization {
    name: string;
    lms_type: LmsType
}
