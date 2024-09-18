"use client"

import { Student } from "@/_temp_types/student"
import { ColumnDef } from "@tanstack/react-table"
import { Text } from "@/components/ui/text"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"

export const columns: ColumnDef<Student>[] = [
  {
    id: "first_name",
    meta: { columnName: "First Name" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="First Name"
        hasDropDownMenu={false}
      />
    ),
    accessorFn: (row) => row.first_name,
    cell: ({ getValue }) => (
      <Text element="p" as="smallText">
        {String(getValue())}
      </Text>
    ),
  },
  {
    id: "last_name",
    meta: { columnName: "Last Name" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Last Name"
        hasDropDownMenu={false}
      />
    ),
    accessorFn: (row) => row.last_name,
    cell: ({ getValue }) => (
      <Text element="p" as="smallText">
        {String(getValue())}
      </Text>
    ),
  },
  {
    id: "id",
    meta: { columnName: "Student ID" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Student ID"
        hasDropDownMenu={false}
      />
    ),
    accessorFn: (row) => row.sis_user_id,
    cell: ({ getValue }) => {
      const empty = !getValue()
      return (
        <Text element="p" as={empty ? "mutedText" : "smallText"}>
          {empty ? "None" : String(getValue()) }
        </Text>
      )
    },
  },
  // {
  //   id: "sections",
  //   enableSorting: false,
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="Sections"
  //       hasDropDownMenu={false}
  //     />
  //   ),
  //   accessorFn: (row) => row.sections?.map((s) => s.name) ?? [],
  //   cell: ({ row, getValue }) => {
  //     const sections = getValue() as string[]
  //     return (
  //       <div className="flex flex-row gap-2">
  //         {sections?.map((section, index) => (
  //           <Badge
  //             key={`${row.id}-${section}-${index}`}
  //             variant="secondary"
  //             className="rounded-sm"
  //           >
  //             <Text element="p">{section}</Text>
  //           </Badge>
  //         ))}
  //       </div>
  //     )
  //   },
  // },
]
