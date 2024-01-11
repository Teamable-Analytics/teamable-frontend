import {Team} from "@/lib/models/Team"

export type TeamSet = {
    id: number
    name?: string
    teams: Team[]
}
