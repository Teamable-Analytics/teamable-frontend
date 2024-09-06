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

interface StudentsContextType {
  /**
   * The students on the current page. Not all of them.
   */
  studentsToDisplay: Student[];
  totalStudents: number;
  totalPages: number;
  isLoading: boolean;
  filters: StudentFilters;
}

interface Filter<T extends string | string[] | number | number[]> {
  value: T;
  set: (value: T) => void;
}

interface FilterValues {
  searchQuery: string;
  pageIndex: PaginationState["pageIndex"];
  pageSize: PaginationState["pageSize"];
  selectedSections: string[];
}

// todo: useEffect that runs only on first render - this one takes the initial query params and sets them
// todo: useEffect that runs on every render except the first - this will take every filter and constantly update the query params
interface StudentFilters {
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
  filters: {
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
    // fixme: maybe don't have this in the dep array though
  }, [effect])
}

const useStudentsFilters = (): StudentFilters & {
  initialFiltersLoading: boolean;
  queryString: string;
} => {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [initialFiltersLoading, setInitialFiltersLoading] = useState(true)

  const [filters, setFilters] = useState<FilterValues>({
    searchQuery: "",
    pageIndex: 0,
    pageSize: INITIAL_PAGE_SIZE,
    selectedSections: [],
  })

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
      const cleanValue = value > 0 ? value : 0
      return {
        ...prev,
        pageSize: cleanValue,
      }
    })
  }, [])

  const setSelectedSections = useCallback(
    (value: FilterValues["selectedSections"]) => {
      setFilters((prev) => {
        const cleanValue = value.filter((v) => !isNaN(Number(v)) && v)
        return {
          ...prev,
          selectedSections: cleanValue,
        }
      })
    },
    [],
  )

  useEffectOnce(() => {
    // Set the values of all filters to the initial query param values
    setSearchQuery(searchParams.get("search") ?? "")
    // todo: make sure it doesnt go below 0
    setPageIndex(parseInt(searchParams.get("page") ?? "1") - 1)
    setPageSize(
      parseInt(searchParams.get("per_page") ?? `${INITIAL_PAGE_SIZE}`),
    )
    // fixme: type error is wack
    setSelectedSections(searchParams.get("sections")?.split(",") ?? [])
    setInitialFiltersLoading(false)
  })

  const queryString = useMemo(
    () =>
      createQueryString({
        search: filters.searchQuery || undefined,
        page: filters.pageIndex + 1, // adding one to make it appear as 1 indexed for the URL query in browser
        per_page: filters.pageSize,
        sections:
          filters.selectedSections.length > 0
            ? filters.selectedSections.join(",")
            : undefined,
      }),
    [
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
  params: Record<string, string | number | undefined>,
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
    searchQuery,
    pageIndex,
    pageSize,
    selectedSections,
  } = useStudentsFilters()
  const { data, isLoading } = useStudentsQuery({
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
        isLoading,
        totalStudents,
        totalPages,
        filters: {
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
