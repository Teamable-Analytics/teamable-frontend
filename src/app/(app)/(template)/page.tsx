import PageView from "@/components/views/Page"
import { DataTable } from "@/components/ui/data-table"
import { DummyData, columns } from "./columns"
import Navbar from "@/components/Navbar"
import {Separator} from "@/components/ui/separator"
import Footer from "@/components/Footer"

const getFakeData = async () => {
  return [
    { id: 1, name: "John Doe", numericValue: 123 },
    { id: 2, name: "Jane Doe", numericValue: 456 },
    { id: 3, name: "John Smith", numericValue: 789 },
  ]
}

export default async function Home() {
  const data = await getFakeData()

  return (
    <>
      <Navbar />
      <Separator />
      <PageView
        title={"Default Page"}
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Students", href: "/students" },
        ]}
      >
        <DataTable<DummyData>
          columns={columns}
          data={data}
          searchBarOptions={{
            placeholder: "Search a thing",
            searchColumn: "name",
          }}
        />
      </PageView>
      <Separator />
      <Footer />
    </>
  )
}
