import {Relationship} from "@/types/Relationship"

export type Student = {
    id: number
    name?: string
    attributes?: Record<number, number[]>
    relationships?: Record<number, Relationship>
    projectPreferences?: number[]
    team?: number
}
