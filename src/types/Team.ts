import {Student} from "@/types/Student"
import {ProjectRequirement} from "@/types/Projects"

export type Team = {
    id: number
    name?: string
    projectId?: number
    requirements?: ProjectRequirement[]
    students: Student[]
}
