'use client'
import React, {useState, ChangeEvent, useEffect} from 'react'
import FileUpload from '../../components/fileupload'
import {parseCSV} from '@/lib/parseCSV'
import {DataTable} from './data-table'
import {columns} from './columns'
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
function getAllSections() {
    // TO DO: change this to fetch data from the backend
    const sections = ["Lecture", "LAB 1", "LAB 2", "LAB 3", "LAB 4", "LAB 5", "LAB 6", "LAB 7", "LAB 8", "LAB 9", "LAB 10"]
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
                columns={columns}
                data={displayStudents}
                topRightComponent={
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Upload</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Upload Students CSV</DialogTitle>
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
                                    <Button onClick={handleSave}>Save</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
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
            console.log(parsedCSV)
        }
    }

    function handleCancel() {
        setStudentsParse([])
    }

    function handleSave() {
        // TODO: Send a request to backend with the studentParsed
    }

    function handleSelectTeamSet(teamSetIdString: string) {
        const teamSetId = parseInt(teamSetIdString)
        const teamSet = allTeamSets.find((teamSet) => teamSet.id === teamSetId)
        setDisplayTeamSet(teamSet)
    }
}
