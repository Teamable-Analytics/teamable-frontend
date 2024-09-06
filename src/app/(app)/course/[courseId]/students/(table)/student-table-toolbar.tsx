"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/ui/data-table-view-options"
import { useStudents } from "../(hooks)/useStudents"
import { StudentTableSectionsFilter } from "./student-table-sections-filter"
import {DataTableFacetedFilterProps} from "@/components/ui/data-table-faceted-filter"

type DataTableToolbarProps<TData> = {
  table: Table<TData>;
};

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  // todo: fix
  const allSections = [] as DataTableFacetedFilterProps<any, any>['options']
  const { filters } = useStudents()
  return (
    <div className="flex items-center justify-between mt-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search students..."
          onChange={(event) => filters.searchQuery.set(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("sections") && (
          <StudentTableSectionsFilter
            column={table.getColumn("sections")}
            title="Sections"
            options={allSections ?? []}
          />
        )}
      </div>
      <div className="flex items-center space-x-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
