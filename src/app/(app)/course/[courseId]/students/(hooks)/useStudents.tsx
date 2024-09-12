"use client"
import React, {
  useState,
  createContext,
  useContext,
  PropsWithChildren,
  useMemo,
  useEffect,
  useCallback,
  EffectCallback,
  useRef,
} from "react"
import { Student } from "@/_temp_types/student"
import { useSearchParams, usePathname } from "next/navigation"
import { PaginationState } from "@tanstack/react-table"
import { useCourse } from "../../(hooks)/useCourse"
import { useQuery } from "@tanstack/react-query"
import { PaginatedList } from "@/_temp_types/pagination"
import { PAGE_SIZE_OPTIONS } from "@/components/ui/data-table-pagination"

const SORTABLE_FIELDS = ["firstName", "lastName", "id"] as const
export type SortableFieldKey = (typeof SORTABLE_FIELDS)[number];

interface StudentsContextType {
  /**
   * The students on the current page. Not all of them.
   */
  studentsToDisplay: Student[];
  refetch: () => void;
  totalStudents: number;
  totalPages: number;
  isLoading: boolean;
  filters: StudentFilters;
}

interface Filter<T extends string | string[] | number | number[]> {
  value: T;
  set: (value: T) => void;
}

export interface FilterValues {
  sort: `${SortableFieldKey}.${"asc" | "desc"}` | "";
  searchQuery: string;
  pageIndex: PaginationState["pageIndex"];
  pageSize: PaginationState["pageSize"];
  selectedSections: string[];
}

const FILTER_QUERY_PARAMS = {
  sort: "sort",
  searchQuery: "search",
  pageIndex: "page",
  pageSize: "per_page",
  selectedSections: "sections",
} as const

interface StudentFilters {
  sort: Filter<FilterValues["sort"]>;
  searchQuery: Filter<FilterValues["searchQuery"]>;
  pageIndex: Filter<FilterValues["pageIndex"]>;
  pageSize: Filter<FilterValues["pageSize"]>;
  selectedSections: Filter<FilterValues["selectedSections"]>;
}

const INITIAL_PAGE_SIZE = 10

const StudentsContext = createContext<StudentsContextType>({
  studentsToDisplay: [],
  totalStudents: 0,
  totalPages: 0,
  isLoading: true,
  refetch: () => {},
  filters: {
    sort: {
      value: "",
      set: () => {},
    },
    searchQuery: {
      value: "",
      set: () => {},
    },
    pageIndex: {
      value: 0,
      set: () => {},
    },
    pageSize: {
      value: INITIAL_PAGE_SIZE,
      set: () => {},
    },
    selectedSections: {
      value: [],
      set: () => {},
    },
  },
})

const useEffectOnce = (effect: EffectCallback) => {
  const stopRef = useRef(false)

  useEffect(() => {
    if (stopRef.current) return

    effect()
    stopRef.current = true
  }, [effect])
}

const useStudentsFilters = (): StudentFilters & {
  initialFiltersLoading: boolean;
  queryString: string;
} => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { sections } = useCourse()
  const validSectionIds = sections.map((s) => s.id)

  const [initialFiltersLoading, setInitialFiltersLoading] = useState(true)

  const [filters, setFilters] = useState<FilterValues>({
    sort: "",
    searchQuery: "",
    pageIndex: 0,
    pageSize: INITIAL_PAGE_SIZE,
    selectedSections: [],
  })

  const setSort = useCallback((value: FilterValues["sort"]) => {
    setFilters((prev) => {
      const [key, direction] = (value ?? "").split(".")
      let cleanValue = value
      if (!SORTABLE_FIELDS.includes(key as SortableFieldKey)) {
        cleanValue = ""
      }
      if (!["asc", "desc"].includes(direction)) {
        cleanValue = ""
      }

      return {
        ...prev,
        sort: cleanValue,
      }
    })
  }, [])

  const setSearchQuery = useCallback((value: FilterValues["searchQuery"]) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: value,
      pageIndex: 0,
    }))
  }, [])

  const setPageIndex = useCallback((value: FilterValues["pageIndex"]) => {
    setFilters((prev) => {
      const cleanValue = value > 0 ? value : 0
      return {
        ...prev,
        pageIndex: cleanValue,
      }
    })
  }, [])

  const setPageSize = useCallback((value: FilterValues["pageSize"]) => {
    setFilters((prev) => {
      const cleanValue =
        value > 0 && PAGE_SIZE_OPTIONS.includes(value)
          ? value
          : PAGE_SIZE_OPTIONS[0]
      return {
        ...prev,
        pageSize: cleanValue,
      }
    })
  }, [])

  const setSelectedSections = useCallback(
    (value: FilterValues["selectedSections"]) => {
      setFilters((prev) => {
        const cleanValue = value.filter(
          (v) => !isNaN(Number(v)) && validSectionIds.includes(Number(v)) && v,
        )
        return {
          ...prev,
          selectedSections: cleanValue,
          pageIndex: 0,
        }
      })
    },
    [validSectionIds],
  )

  useEffectOnce(() => {
    // Set the values of all filters to the initial query param values
    setSort(
      searchParams.get(FILTER_QUERY_PARAMS["sort"]) as FilterValues["sort"],
    )
    setSearchQuery(searchParams.get(FILTER_QUERY_PARAMS["searchQuery"]) ?? "")
    setPageIndex(
      parseInt(searchParams.get(FILTER_QUERY_PARAMS["pageIndex"]) ?? "1") - 1,
    )
    setPageSize(
      parseInt(
        searchParams.get(FILTER_QUERY_PARAMS["pageSize"]) ??
          `${INITIAL_PAGE_SIZE}`,
      ),
    )
    const rawSections = searchParams.get(
      FILTER_QUERY_PARAMS["selectedSections"],
    )
    setSelectedSections(rawSections ? rawSections.split(",") : [])
    setInitialFiltersLoading(false)
  })

  const queryString = useMemo(
    () =>
      createQueryString({
        sort: (filters.sort as string) || undefined,
        search: filters.searchQuery || undefined,
        page: filters.pageIndex + 1, // adding one to make it appear as 1 indexed for the URL query in browser
        per_page: filters.pageSize,
        sections:
          filters.selectedSections.length > 0
            ? filters.selectedSections.join(",")
            : undefined,
      }),
    [
      filters.sort,
      filters.searchQuery,
      filters.pageIndex,
      filters.pageSize,
      filters.selectedSections,
    ],
  )

  useEffect(() => {
    // Sync the filter values to query params
    window.history.replaceState(null, "", `${pathname}?${queryString}`)
  }, [queryString, pathname])

  return {
    queryString,
    initialFiltersLoading,
    sort: {
      value: filters.sort,
      set: setSort,
    },
    searchQuery: {
      value: filters.searchQuery,
      set: setSearchQuery,
    },
    pageIndex: {
      value: filters.pageIndex,
      set: setPageIndex,
    },
    pageSize: {
      value: filters.pageSize,
      set: setPageSize,
    },
    selectedSections: {
      value: filters.selectedSections,
      set: setSelectedSections,
    },
  }
}

const createQueryString = (
  params: Record<typeof FILTER_QUERY_PARAMS[keyof typeof FILTER_QUERY_PARAMS], string | number | undefined>,
) => {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value.toString())
    }
  })
  return searchParams.toString()
}

const useStudentsQuery = ({
  courseId,
  queryString,
  enabled,
}: {
  courseId: number;
  queryString: string;
  enabled: boolean;
}) => {
  const studentsQuery = useQuery<unknown, unknown, PaginatedList<Student>>({
    queryKey: [`courses/${courseId}/students/?${queryString}`],
    enabled,
  })

  return {
    getStudentsAsync: studentsQuery.refetch,
    ...studentsQuery,
  }
}

export const StudentsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { courseId } = useCourse()
  const {
    queryString,
    initialFiltersLoading,
    sort,
    searchQuery,
    pageIndex,
    pageSize,
    selectedSections,
  } = useStudentsFilters()
  const { data, isLoading, refetch } = useStudentsQuery({
    courseId,
    queryString,
    enabled: !initialFiltersLoading,
  })

  const studentsToDisplay = useMemo(() => (data ? data.results : []), [data])

  const totalStudents = useMemo(() => (data ? data.count : 0), [data])

  const totalPages = useMemo(
    () => (data ? Math.ceil(data.count / pageSize.value) : 0),
    [data, pageSize.value],
  )

  return (
    <StudentsContext.Provider
      value={{
        studentsToDisplay,
        refetch,
        isLoading,
        totalStudents,
        totalPages,
        filters: {
          sort,
          searchQuery,
          pageIndex,
          pageSize,
          selectedSections,
        },
      }}
    >
      {children}
    </StudentsContext.Provider>
  )
}

export const useStudents = (): StudentsContextType => {
  return useContext(StudentsContext)
}
