import {Relationship} from "@/types/Relationship"

export type Student = {
    id: number
    name?: string
    attributes?: Record<number, number[]>
    relationships?: {
        [studentId: number]: Relationship
    }
    projectPreferences?: number[]
    team?: number
}
