'use client'
import React from 'react'
import { StudentsProvider } from './(hooks)/useStudents'
import { StudentsTable } from './(components)/students-table'

export default function StudentsPage() {
    return (
        <StudentsProvider>
            <StudentsTable/>
        </StudentsProvider>
    )
}
