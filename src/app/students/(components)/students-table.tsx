import PageView from "@/components/views/Page"
import { DataTable } from "./data-table"
import { useStudents } from '../(hooks)/useStudents'
import {columns} from '../columns'

export const StudentsTable = () => {
    const {displayStudents} = useStudents()
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
