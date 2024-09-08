"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/ui/data-table-view-options"
import { useStudents } from "../(hooks)/useStudents"
import { StudentTableSectionsFilter } from "./student-table-sections-filter"
import { useCourse } from "@/app/(app)/course/[courseId]/(hooks)/useCourse"

type DataTableToolbarProps<TData> = {
  table: Table<TData>;
};

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { sections: allSections } = useCourse()
  const { filters } = useStudents()

  const sectionsOptions = allSections.map((s) => ({
    label: s.name,
    value: String(s.id),
  }))

  return (
    <div className="flex items-center justify-between mt-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          value={filters.searchQuery.value}
          placeholder="Search students..."
          onChange={(event) => filters.searchQuery.set(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("sections") && (
          <StudentTableSectionsFilter
            column={table.getColumn("sections")}
            title="Sections"
            options={sectionsOptions}
          />
        )}
      </div>
      <div className="flex items-center space-x-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
