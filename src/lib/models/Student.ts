import {Relationship} from "@/lib/models/Relationship"

export type AttributeMap = {
    [attribute: number]: number[]
}

export type Student = {
    id: number
    name?: string
    attributes?: AttributeMap
    relationships?: {
        [studentId: number]: Relationship
    }
    projectPreferences?: number[]
    team?: number
}
