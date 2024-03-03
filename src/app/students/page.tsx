'use client'
import React from 'react'
import { StudentsProvider } from './hooks/useStudents'
import StudentsPage from '@/app/students/views/studentsPage'

export default function page() {
    return (
        <StudentsProvider>
            <StudentsPage />
        </StudentsProvider>
    )
}
