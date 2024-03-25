'use client'

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
import {ChevronDownIcon} from "@radix-ui/react-icons"

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

export const persistedColumnDefs: ColumnDef<ProjectRequirement>[] = [
    {
        accessorKey: "attribute",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title={"Attribute"}/>
        ),
    },
    {
        accessorKey: "operator",
        header: "Operator",
    },
    {
        accessorKey: "value",
        header: "Value",
    },
]

const allAttributes = getAttributeNameMap()
const attributeMap = getAttributeValueMap()

function handleUpdatedProjectRequirement(updatedRequirement: ProjectRequirement) {
    // TODO: API call to update the project requirements
}

export const mutableColumnDefs: ColumnDef<ProjectRequirement>[] = [
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
                            <ChevronDownIcon className="ml-1 w-3 h-3"/>
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuRadioGroup
                            value={row.original.attribute.toString()}
                            onValueChange={(value) => handleUpdatedProjectRequirement({
                                id: row.original.id,
                                attribute: parseInt(value),
                                operator: RequirementOperator.EQ,
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
                            {row.original.operator}
                            <ChevronDownIcon className="ml-1 w-3 h-3"/>
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuRadioGroup
                            value={row.original.operator}
                            onValueChange={(value) => handleUpdatedProjectRequirement({
                                ...row.original,
                                operator: value as RequirementOperator,
                            })}
                        >
                            {Object.values(RequirementOperator).map((operator, idx) => (
                                <DropdownMenuRadioItem
                                    value={operator}
                                    key={`operator-${idx}`}
                                    className="cursor-pointer">
                                    {operator}
                                </DropdownMenuRadioItem>
                            ))}
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
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <span className="cursor-pointer flex items-center">
                            {row.original.value}
                            <ChevronDownIcon className="ml-1 w-3 h-3"/>
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuRadioGroup
                            value={row.original.value.toString()}
                            onValueChange={(value) => handleUpdatedProjectRequirement({
                                ...row.original,
                                value: parseInt(value),
                            })}
                        >
                            {Object.keys(attributeMap[row.original.attribute]).map((value) => {
                                return (
                                    <DropdownMenuRadioItem
                                        key={value}
                                        value={value}
                                        className="cursor-pointer"
                                    >
                                        {parseInt(value)}
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
