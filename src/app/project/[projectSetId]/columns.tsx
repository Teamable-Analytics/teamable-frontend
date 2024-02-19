import {type ColumnDef} from "@tanstack/react-table"
import {type Project, ProjectRequirement} from "@/types/Projects"
import {DataTableColumnHeader} from "@/components/ui/data-table-column-header"


function getAttributeNameMap(attributeIds: number[]): Record<number, string> {
    return {
        1: "Academic History",
        2: "Timeslot Availability",
        3: "Age",
    }
}

function getAttributeValueMap(attributeValues: Record<number, number>): Record<number, Record<number, string>> {
    return {
        1: {
            2: '50%',
        },
        2: {
            1: '3pm - 6pm',
        },
        3: {
            3: '30',
        },
    }
}


function convertProjectName(projectId: number): string {
    const attributeNameMap = getAttributeNameMap([1, 2, 3])

    return attributeNameMap[projectId]
}

function convertProjectValue(projectId: number, projectValue: number): string {
    const attributeValueMap = getAttributeValueMap({1: 2, 2: 1, 3: 3})

    return attributeValueMap?.[projectId]?.[projectValue]
}

export const columns: ColumnDef<ProjectRequirement>[] = [
    {
        accessorKey: "attribute",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title={"Attribute"}/>
        ),
        cell: ({row}) => (
            <span>{convertProjectName(row.original.value)}</span>
        ),
    },
    {
        accessorKey: "operator",
        header: "Operator",
    },
    {
        accessorKey: "value",
        header: "Value",
        cell: ({row}) => {
            return <span>
                {convertProjectValue(row.original.attribute, row.original.value)}
            </span>
        },
    },
]
