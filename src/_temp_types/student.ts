import {Relationship} from "@/_temp_types/relationship"

export type Student = {
    id: number
    name?: string
    attributes?: Record<number, number[]>
    relationships?: Record<number, Relationship>
    projectPreferences?: number[]
    team?: number
}
