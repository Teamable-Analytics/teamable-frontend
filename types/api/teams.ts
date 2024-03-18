export type ApiProjectSet = {
    id: number
    name: string
    teams: ApiProject[]
    createdAt: string
    updatedAt: string
}

export type ApiProject = {
    id: number
    name: string
    members: ApiCourseMember[] // This is supposed to be empty
    createdAt: string
    updatedAt: string
    slug: string
    requirements: ApiProjectRequirement[]
    max_people: number
    min_people: number
    team_set: number
}

export type ApiProjectRequirement = {
    // TODO: Update this
}

export type ApiCourseMember = {
    // TODO: Update this
}
