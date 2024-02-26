import { useState, useEffect, createContext, useContext, PropsWithChildren } from 'react'
import { TeamSet } from '@/_temp_types/teamSet'

interface TeamSetsContextType {
  allTeamSets: TeamSet[];
  displayTeamSet?: TeamSet;
  handleSelectTeamSet: (teamSetIdString: string) => void;
}
function getTeamSets() {
    // TODO: Change this to fetch data from the backend

    const teamSets: TeamSet[] = Array.from(Array(10)).map((_, idx) => {
        const id = idx + 1
        return {
            id: id,
            name: "Team Set " + id,
            teams: [],
        }
    })

    return teamSets
}
const TeamSetsContext = createContext<TeamSetsContextType | undefined>(undefined)

export const useTeamSetsProvider = (): TeamSetsContextType => {
    const [allTeamSets, setAllTeamSets] = useState<TeamSet[]>([])
    const [displayTeamSet, setDisplayTeamSet] = useState<TeamSet>()

    useEffect(() => {
        // Assume getTeamSets() is a function that fetches team sets
        const teamSets = getTeamSets() // Adjust this call to your actual data fetching logic
        setAllTeamSets(teamSets)
    }, [])

    const handleSelectTeamSet = (teamSetIdString: string) => {
        const teamSetId = parseInt(teamSetIdString)
        const teamSet = allTeamSets.find(teamSet => teamSet.id === teamSetId)
        setDisplayTeamSet(teamSet)
    }

    return {
        allTeamSets,
        displayTeamSet,
        handleSelectTeamSet,
    }
}

export const TeamSetsProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const teamSets = useTeamSetsProvider()
    return <TeamSetsContext.Provider value={teamSets}>{children}</TeamSetsContext.Provider>
}

export const useTeamSets = (): TeamSetsContextType => {
    const context = useContext(TeamSetsContext)
    if (context === undefined) {
        throw new Error('useTeamSets must be used within a TeamSetsProvider')
    }
    return context
}
