// 'use client'
import React from 'react'
import { StudentsProvider } from './(hooks)/useStudents'
import PageView from '@/components/views/Page'
import { StudentTable } from './(table)/student-table'


export default function StudentsPage() {
    return (
        <PageView title="Students" breadcrumbs={[
            {title: 'Home', href: '/'},
            {title: 'Students', href: '/students'},
        ]}>
            <StudentsProvider>
                <StudentTable/>
            </StudentsProvider>
        </PageView>
    )
}
