import {type ColumnDef} from "@tanstack/react-table"
import {type ProjectRequirement, RequirementOperator} from "@/_temp_types/projects"
import {DataTableColumnHeader} from "@/components/ui/data-table-column-header"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react"
import { ChevronDownIcon } from "@radix-ui/react-icons"

function getAttributeNameMap(): Record<number, string> {
    return {
        1: "Academic History",
        2: "Timeslot Availability",
        3: "Age",
    }
}

function getAttributeValueMap(): Record<number, Record<number, string>> {
    return {
        1: {
            1: '10%',
            2: '50%',
            3: '90%',
        },
        2: {
            1: '3pm - 6pm',
            2: '6pm - 9pm',
            3: '9pm - 12am',
        },
        3: {
            1: '20',
            2: '25',
            3: '30',
        },
    }
}


function convertAttributeName(projectId: number): string {
    const attributeNameMap = getAttributeNameMap()

    return attributeNameMap[projectId]
}

function convertAttributeValue(attributeName: number, attributeValue: number): string {
    const attributeValueMap = getAttributeValueMap()
    return attributeValueMap?.[attributeName]?.[attributeValue]
}

function convertRequirementOperator(operator: RequirementOperator): string {
    if (operator === RequirementOperator.LESS_THAN) {
        return "Less than"
    }
    if (operator === RequirementOperator.EXACTLY) {
        return "Exactly"
    }
    if (operator === RequirementOperator.MORE_THAN) {
        return "More than"
    }
    return ""
}

export type ProjectRequirementRowProps = {
    handleChange: (projectRequirement: ProjectRequirement) => void
}

export const uneditableColumns = (): ColumnDef<ProjectRequirement>[] => {
    return [
        {
            accessorKey: "attribute",
            header: ({column}) => (
                <DataTableColumnHeader column={column} title={"Attribute"}/>
            ),
            cell: ({row}) => {
                return <span>
                    {convertAttributeName(row.original.attribute)}
                </span>
            },
        },
        {
            accessorKey: "operator",
            header: "Operator",
            cell: ({row}) => {
                return <span>
                    {convertRequirementOperator(row.original.operator)}
                </span>
            },
        },
        {
            accessorKey: "value",
            header: "Value",
            cell: ({row}) => {
                return <span>
                    {convertAttributeValue(row.original.attribute, row.original.value)}
                </span>
            },
        },
    ]
}

export const editableColumns = ({handleChange}: ProjectRequirementRowProps): ColumnDef<ProjectRequirement>[] => {
    const allAttributes = getAttributeNameMap()
    const attributeMap = getAttributeValueMap()

    return [
        {
            accessorKey: "attribute",
            header: ({column}) => (
                <DataTableColumnHeader column={column} title={"Attribute"}/>
            ),
            cell: ({row}) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <span className="cursor-pointer flex items-center">
                                {convertAttributeName(row.original.attribute)}
                                <ChevronDownIcon className="ml-1 w-3 h-3" />
                            </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuRadioGroup
                                value={row.original.attribute.toString()}
                                onValueChange={(value) => handleChange({
                                    id: row.original.id,
                                    attribute: parseInt(value),
                                    operator: RequirementOperator.EXACTLY,
                                    value: 1,
                                })}
                            >
                                {Object.keys(allAttributes).map((attributeId) => {
                                    return (
                                        <DropdownMenuRadioItem
                                            key={attributeId}
                                            value={attributeId}
                                            className="cursor-pointer"
                                        >
                                            {convertAttributeName(parseInt(attributeId))}
                                        </DropdownMenuRadioItem>
                                    )
                                })}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
        {
            accessorKey: "operator",
            header: "Operator",
            // A dropdown menu
            cell: ({row}) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <span className="cursor-pointer flex items-center">
                                {convertRequirementOperator(row.original.operator)}
                                <ChevronDownIcon className="ml-1 w-3 h-3" />
                            </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuRadioGroup
                                value={row.original.operator}
                                onValueChange={(value) => handleChange({...row.original, operator: value as RequirementOperator})}
                            >
                                <DropdownMenuRadioItem value={RequirementOperator.LESS_THAN} className="cursor-pointer">
                                    {convertRequirementOperator(RequirementOperator.LESS_THAN)}
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={RequirementOperator.EXACTLY} className="cursor-pointer">
                                    {convertRequirementOperator(RequirementOperator.EXACTLY)}
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={RequirementOperator.MORE_THAN} className="cursor-pointer">
                                    {convertRequirementOperator(RequirementOperator.MORE_THAN)}
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
        {
            accessorKey: "value",
            header: "Value",
            cell: ({row}) => {
                // return <span>
                //     {convertProjectValue(row.original.attribute, row.original.value)}
                // </span>
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <span className="cursor-pointer flex items-center">
                                {convertAttributeValue(row.original.attribute, row.original.value)}
                                <ChevronDownIcon className="ml-1 w-3 h-3" />
                            </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuRadioGroup
                                value={row.original.value.toString()}
                                onValueChange={(value) => handleChange({...row.original, value: parseInt(value)})}
                            >
                                {Object.keys(attributeMap[row.original.attribute]).map((value) => {
                                    return (
                                        <DropdownMenuRadioItem
                                            key={value}
                                            value={value}
                                            className="cursor-pointer"
                                        >
                                            {convertAttributeValue(row.original.attribute, parseInt(value))}
                                        </DropdownMenuRadioItem>
                                    )
                                })}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
}
