export type Student = {
    id: number
    name?: string
}

export type Team = {
    id: number
    name?: string
    students: Student[]
}

export type TeamSet = {
    id: number
    teams: Team[]
}

/**
 * Export a TeamSet to a CSV format compatible with Canvas LMS.
 * The generated CSV includes columns for canvas_user_id and group_name.
 *
 * @param {TeamSet} teamSet - The TeamSet to be exported.
 * @returns {string} The CSV representation of the TeamSet for Canvas.
 */
export function exportTeamSetToCanvas(teamSet: TeamSet): string {
    let exportedCSV = teamSet.teams.map(team => {
        const teamName = team.name || `Group ${team.id}`;
        return team.students.map(student => `${student.id},${teamName}`).join("\n");
    }).join("\n");

    return "canvas_user_id,group_name\n" + exportedCSV;
}
