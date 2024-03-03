'use client'
import React, {useState, ChangeEvent, useEffect, useCallback} from 'react'
import PageView from '@/app/students/views/page'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { useStudents } from '../hooks/useStudents'
import {columns} from '../columns'
import {DataTable} from "../components/data-table"



export default function StudentsPage() {
    const { displayStudents} = useStudents()

    return (
        <PageView title="Students" breadcrumbs={[
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
