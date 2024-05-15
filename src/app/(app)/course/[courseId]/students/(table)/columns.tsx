"use client"

import { useStudentRow } from "../(hooks)/useStudentSections"
import { Student } from "@/_temp_types/student"
import { Row, ColumnDef } from "@tanstack/react-table"
import { Text } from "@/components/ui/text"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/ui/table-column-header"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {StudentsSectionsSelect} from "./students-sections-select"

type SectionFilterValue = string[];
type CellsNeedingContextType = {
  row: Row<Student>;
  columnId: string;
}

const CellsNeedingContext: React.FC<CellsNeedingContextType> = ({row, columnId}) => {
  const { isEditable, setEditable } = useStudentRow()
  if (columnId === 'sections') {
    return (
      <div className="flex flex-row gap-2">
        {isEditable ?
          <StudentsSectionsSelect studentSections={(row.getValue("sections") as string[]).map((section) => ({
            label: section,
            value: section,
          }))} />
          :
          (row.getValue("sections") as string[]).map((section) => (
            <Badge key={section} variant="secondary" className="rounded-sm">
              <Text element="p" as="mutedText">
                {section}
              </Text>
            </Badge>
          ))
        }
      </div>
    )
  } else if (columnId === 'actions') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setEditable(!isEditable)}>
            {isEditable ? 'Confirm' : 'Edit'} Sections
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
}


export const columns: ColumnDef<Student>[] = [  {
  id: "firstName",
  header: ({ column }) => (
    <DataTableColumnHeader
      column={column}
      title="First Name"
      hasDropDownMenu={false}
    />
  ),
  accessorFn: (row) => row.name.split(",")[1],
  cell: ({ getValue }) => (
    <Text element="p" as="smallText">
      {String(getValue())}
    </Text>
  ),
},
{
  id: "lastName",
  header: ({ column }) => (
    <DataTableColumnHeader
      column={column}
      title="Last Name"
      hasDropDownMenu={false}
    />
  ),
  accessorFn: (row) => row.name.split(",")[0],
  cell: ({ getValue }) => (
    <Text element="p" as="smallText">
      {String(getValue())}
    </Text>
  ),
},
{
  accessorKey: "id",
  header: ({ column }) => (
    <DataTableColumnHeader
      column={column}
      title="Student ID"
      hasDropDownMenu={false}
    />
  ),
  cell: ({ row }) => (
    <Text element="p" as="smallText">
      {row.getValue("id")}
    </Text>
  ),
},
{
  accessorKey: "sections",
  header: ({ column }) => (
    <DataTableColumnHeader
      column={column}
      title="Sections"
      hasDropDownMenu={false}
    />
  ),
  cell: ({ row }) => (
    <div className="flex flex-row gap-2">
      <CellsNeedingContext row={row} columnId="sections" />
    </div>
  ),
  filterFn: (row, id, filterValues: SectionFilterValue) => {
    const rowSections = row.getValue(id) as string[]
    return filterValues.some((filterValue) =>
      rowSections.includes(filterValue),)
  },
},
{
  id: "actions",
  header: ({ column }) => (
    <DataTableColumnHeader
      column={column}
      title="Actions"
      hasDropDownMenu={true}
    />
  ),
  cell: ({ row }) => (
    <CellsNeedingContext row={row} columnId="actions" />
  ),
},
]
