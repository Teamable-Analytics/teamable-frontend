import {TeamSet} from "@/types/TeamSet"

/**
 * Export a TeamSet to a CSV format compatible with Canvas LMS.
 * The generated CSV includes columns for canvas_user_id and group_name.
 *
 * @param {TeamSet} teamSet - The TeamSet to be exported.
 * @returns {string} The CSV representation of the TeamSet for Canvas.
 */
export function exportTeamSetToCanvas(teamSet: TeamSet): string {
    // Check that all team names are unique
    const teamNames: Set<string> = new Set()
    for (const team of teamSet.teams) {
        const name = team.name || `Group ${team.id}`
        if (teamNames.has(name)) {
            // Duplicate team name found
            // TODO: Decide what to do when there are duplicate team names. Maybe default to all use `Group ${id}` format
        }
        teamNames.add(name)
    }

    let exportedCSV = teamSet.teams.map(team => {
        const teamName = team.name || `Group ${team.id}`
        return team.students.map(student => `${student.id},${teamName}`).join("\n")
    }).join("\n")

    return "canvas_user_id,group_name\n" + exportedCSV
}
