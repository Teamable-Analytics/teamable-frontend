// App.js or a parent component
'use client'
import React from 'react'
import { StudentsProvider } from './hooks/useStudents' // adjust the import path as necessary
import StudentsPage from '@/app/students/views/studentsPage' // adjust the import path as necessary
import { TeamSetsProvider } from './hooks/useTeamSets'

export default function page() {
    return (
        <StudentsProvider>
            <TeamSetsProvider>
                <StudentsPage />
            </TeamSetsProvider>
        </StudentsProvider>
    )
}
