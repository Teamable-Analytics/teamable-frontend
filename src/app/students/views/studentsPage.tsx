'use client'
import React, {useState, ChangeEvent, useEffect, useCallback} from 'react'
import PageView from '@/app/students/views/page'
// import {DataTable} from '@/components/ui/data-table'
import {Student} from '@/_temp_types/student'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { useStudents } from '../hooks/useStudents'
import { useTeamSets } from '../hooks/useTeamSets'
import {columns} from '../columns'
import {DataTable} from "../components/data-table"

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


export default function StudentsPage() {
    const { allTeamSets, displayTeamSet, handleSelectTeamSet } = useTeamSets()
    const { displayStudents} = useStudents()

    const TeamSelect = () => {
        // this needs to be refactored soon
        return(
            <Select onValueChange={handleSelectTeamSet}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select team set"/>
                </SelectTrigger>
                {<SelectContent>
                    {allTeamSets.map((teamSet) => (
                        <SelectItem value={"" + teamSet.id} key={teamSet.id}>{teamSet.name}</SelectItem>
                    ))}
                </SelectContent>}
            </Select>
        )
    }
    return (
        <PageView title="Students" rightSide={<TeamSelect/>} breadcrumbs={[
            {title: 'Home', href: '/'},
            {title: 'Students', href: '/students'},
        ]}>
            <DataTable
                data={displayStudents}
                columns={columns}
            />
        </PageView>
    )
}
