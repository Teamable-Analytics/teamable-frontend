export type ApiTeamSetTemplate = {
    id: number
    name: string
    teams: ApiTeamTemplate[]
    createdAt: string
    updatedAt: string
}

export type ApiTeamTemplate = {
    id: number
    name: string
    createdAt: string
    updatedAt: string
    slug: string
    requirements: ApiProjectRequirement[]
    number_of_teams: number
    max_people: number
    min_people: number
}

export type ApiProjectRequirement = {
    // TODO: Update this
}
