"use client"
import React, {
  useState,
  createContext,
  useContext,
  PropsWithChildren,
  useMemo,
  useEffect,
  useCallback,
} from "react"
import { Student } from "@/_temp_types/student"
import { useSearchParams, usePathname } from "next/navigation"
import { PaginationState } from "@tanstack/react-table"
import { useCourse } from "../../(hooks)/useCourse"

type QueryParams = {
  page: number;
  per_page: number;
  search?: string;
  sections?: string;
};

type DropdownOption = {
  label: string;
  value: string;
};

type StudentsContextType = {
  displayStudents: Student[];
  allSections: DropdownOption[] | undefined;
  totalStudents: number;
  pageCount: number;
  setSearchQuery: (searchQuery: string) => void;
  setSelectedSections: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSections: string[];
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  isLoadingData: boolean;
};
const StudentsContext = createContext<StudentsContextType>({
  displayStudents: [],
  allSections: [],
  totalStudents: 0,
  pageCount: 0,
  setSearchQuery: (searchQuery: string) => {},
  setSelectedSections: (x: any) => {},
  selectedSections: [],
  pagination: { pageIndex: 0, pageSize: 10 },
  setPagination: () => {},
  isLoadingData: true,
})

const createQueryString = (params: Record<string, string | number | undefined>,) => {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value.toString())
    }
  })
  return searchParams.toString()
}

const useStudentsProvider = (): StudentsContextType => {
  const { courseId } = useCourse()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [displayStudents, setDisplayStudents] = useState<Student[]>([])
  const [allSections, setAllSections] = useState<DropdownOption[]>([])
  const [selectedSections, setSelectedSections] = useState<string[]>(searchParams.get("sections")?.split(",") ?? [],)
  const [totalStudents, setTotalStudents] = useState(0)
  const [search, setSearch] = useState(searchParams.get("search") ?? "")
  const [pageCount, setPageCount] = useState(0)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: parseInt(searchParams.get("page") ?? "1") - 1,
    pageSize: parseInt(searchParams.get("per_page") ?? "10"),
  })
  const [isLoadingData, setIsLoadingData] = useState(true)

  const setSearchQuery = useCallback((searchQuery: string) => {
    setSearch(searchQuery)
    setPagination({ ...pagination, pageIndex: 0 })
  },
  [pagination, setSearch, setPagination],)

  const queryStringParams: QueryParams = useMemo(() => ({
    page: pagination.pageIndex + 1, // adding one to make it appear as 1 indexed for the URL query in browser
    per_page: pagination.pageSize,
    search: search,
    sections:
        selectedSections.length > 0 ? selectedSections.join(",") : undefined,
  }),
  [pagination.pageIndex, pagination.pageSize, search, selectedSections],)

  useEffect(() => {
    let newSelectedSections = selectedSections.filter((section) => !isNaN(parseInt(section)),)
    if (allSections !== undefined) {
      newSelectedSections = newSelectedSections.filter((section) =>
        allSections.find((sectionOption) => sectionOption.value === section),)
    }
    if (newSelectedSections.length !== selectedSections.length) {
      setSelectedSections(newSelectedSections)
    }
  }, [allSections, selectedSections])

  useEffect(() => {
    const queryString = createQueryString(queryStringParams)
    const fetchStudents = async () => {
      try {
        const courseMemberResponse = await fetch(`${process.env.BACKEND_BASE_URI}/api/v1/course/${courseId}/students?${queryString}`,)
        const courseMemberData = await courseMemberResponse.json()
        const studentsToDisplay: Student[] = courseMemberData.results.map((member: any) => ({
          id: member.user.id,
          name: `${member.user.last_name}, ${member.user.first_name}`,
          sections: member.sections.map((section: any) => section.name),
        }),)
        setDisplayStudents(studentsToDisplay)
        setTotalStudents(courseMemberData.count)
        setPageCount(Math.ceil(courseMemberData.count / pagination.pageSize))
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoadingData(false)
      }
    }
    fetchStudents()
  }, [
    courseId,
    queryStringParams,
    setDisplayStudents,
    setTotalStudents,
    setPageCount,
    pagination.pageSize,
  ])

  useEffect(() => {
    const queryString = createQueryString(queryStringParams)
    window.history.replaceState(null, "", `${pathname}?${queryString}`)
  }, [queryStringParams, pathname])

  useEffect(() => {
    const fetchSections = async () => {
      const sectionsResponse = await fetch(`${process.env.BACKEND_BASE_URI}/api/v1/course/${courseId}/sections`,)
      const sectionsData = await sectionsResponse.json()
      const sectionsToDisplay: DropdownOption[] = sectionsData.map((section: any) => ({
        label: section.name,
        value: String(section.id),
      }),)
      setAllSections(sectionsToDisplay)
    }
    fetchSections()
  }, [courseId, setAllSections])

  return {
    displayStudents,
    allSections,
    totalStudents,
    pageCount,
    setSearchQuery,
    setSelectedSections,
    selectedSections,
    pagination,
    setPagination,
    isLoadingData,
  }
}

export const StudentsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const studentsContext = useStudentsProvider()
  return (
    <StudentsContext.Provider value={studentsContext}>
      {children}
    </StudentsContext.Provider>
  )
}

export const useStudents = (): StudentsContextType => {
  return useContext(StudentsContext)
}
