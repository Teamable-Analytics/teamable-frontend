import {Student} from "@/lib/models/Student"
import {ProjectRequirement} from "@/lib/models/Projects"

export type Team = {
    id: number
    name?: string
    projectId?: number
    requirements?: ProjectRequirement[]
    students: Student[]
}
