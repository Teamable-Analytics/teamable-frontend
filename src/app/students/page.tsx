'use client'
import React, {useState, ChangeEvent, useEffect} from 'react'
import FileUpload from '../../components/fileupload'
import {parseCSV} from '@/lib/parseCSV'
import {DataTable} from '@/components/ui/data-table'
import {Student} from '@/types/Student'
import {Text} from "@/components/ui/text"
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog"
import {Input} from "@/components/ui/input"
import {TeamSet} from "@/types/TeamSet"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { MultiSelect } from "@/components/ui/multi-select"
import { generateColumns } from './columns'

/**
 * export type Student = {
 *     id: number
 *     name: string,
 *     attributes?: Record<number, number[]>
 *     relationships?: Record<number, Relationship>
 *     projectPreferences?: number[]
 *     team?: number
 *     // not sure if section is an attribute for student type
 *     section?: string
 * }
 */

function getStudentData() {
    // TODO: Change this to fetch data from the backend

    const students: Student[] = Array.from(Array(1000)).map((_, idx) => {
        const id = idx + 1
        const labSectionNumber = Math.floor(Math.random() * 10) + 1
        return {
            id: id,
            name: "Student " + id,
            attributes: {},
            relationships: {},
            projectPreferences: [],
            team: 1,
            sections: ["Lecture", "Lab " + labSectionNumber],
        }
    })
    return students
}


function getTeamSets() {
    // TODO: Change this to fetch data from the backend

    const teamSets: TeamSet[] = Array.from(Array(10)).map((_, idx) => {
        const id = idx + 1
        return {
            id: id,
            name: "Team Set " + id,
            teams: [],
        }
    })

    return teamSets
}

export default function StudentsPage() {
    const [allTeamSets, setAllTeamSets] = useState<TeamSet[]>([])
    const [displayTeamSet, setDisplayTeamSet] = useState<TeamSet>()

    const [csvStudentsParse, setStudentsParse] = useState<Student[]>([])
    const [displayStudents, setDisplayStudents] = useState<Student[]>([])
    const [currentSections, setSections] = useState<{ label: string, value: string }[]>([])

    useEffect(() => {
        const teamSets = getTeamSets()
        setAllTeamSets(teamSets)
    }, [])

    useEffect(() => {
        if (!displayTeamSet) {
            setDisplayStudents([])
        } else {
            const students = getStudentData()
            setDisplayStudents(students)
        }
    }, [displayTeamSet])
    // temporary solution: useEffect to update the displayStudents when the csvStudentsParse changes
    useEffect(() => {
        if (csvStudentsParse.length > 0) {
            if(displayStudents.length > 0) {
                setDisplayStudents([])
            }
            setDisplayStudents(csvStudentsParse)
        }
    }, [csvStudentsParse, displayStudents])
    // Listen for changes to displayStudents

    // get set of sections from the students in the displayStudents
    useEffect(() => {
        async function getAllSections() {
            const sections = new Set<string>()
            displayStudents.forEach((student) => {
                student.sections?.forEach((section) => {
                    sections.add(section)
                })
            })
            // convert sections into options object: {label: string, value: string} where both label and value are the section
            const sectionsOptions = Array.from(sections).map((section) => ({label: section, value: section}))
            return sectionsOptions
        }
        async function updateSections() {
            const newSections = await getAllSections()// This now correctly uses the updated displayStudents
            setSections(newSections)
        }
        updateSections()
    }, [displayStudents])

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center">
                <Text element="h1" as="h1">Students</Text>
                <Select onValueChange={handleSelectTeamSet}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select team set" />
                    </SelectTrigger>
                    {<SelectContent>
                        {allTeamSets.map((teamSet) => (
                            <SelectItem value={"" + teamSet.id} key={teamSet.id}>{teamSet.name}</SelectItem>
                        ))}
                    </SelectContent>}
                </Select>
            </div>
            <DataTable
                data={displayStudents}
                columns={generateColumns(currentSections)}
                searchBarOptions={{ placeholder: "Search Last Names", searchColumn: "lastName" }}
                actionItems={
                    () => {
                        return<div className="flex items-center gap-2">
                            <MultiSelect
                                options={currentSections}
                                placeholder="Sections"
                                className="w-auto my-0"
                                inTableHeader = {false}
                            />
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>Upload</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Upload Students [CSV]</DialogTitle>
                                    </DialogHeader>
                                    <DialogBody>
                                        <div className="grid gap-4 py-4">
                                            <Input type="file" onChange={handleFileChange} accept=".csv"/>
                                        </div>
                                    </DialogBody>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                            <Button onClick={handleSave}>Upload</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>

                    }
                }
            />
        </div>
    )
    async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        let parsedCSV = []
        if (file) {
            parsedCSV = await parseCSV(file)
            setStudentsParse(parsedCSV)
        }
        console.log(csvStudentsParse)
    }

    function handleCancel() {
        setStudentsParse([])
    }

    function handleSave() {
        // TODO: Send a request to backend with the studentParsed

        // set the displayStudents to the new students
        setDisplayStudents(csvStudentsParse)
    }

    function handleSelectTeamSet(teamSetIdString: string) {
        const teamSetId = parseInt(teamSetIdString)
        const teamSet = allTeamSets.find((teamSet) => teamSet.id === teamSetId)
        setDisplayTeamSet(teamSet)
    }
}
