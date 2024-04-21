import PageView from "@/components/views/Page"
import CategoricalSingle from "./(components)/CategoricalSingle"
import CategoricalMulti from "./(components)/CategoricalMulti"

const Profiles = () => {
  return (
    <PageView
      title={"Profiles"}
      breadcrumbs={[
        { title: "Home", href: "/" },
        { title: "Profiles", href: "/profiles" },
      ]}
    >
      <CategoricalSingle />
      <CategoricalMulti />
    </PageView>
  )
}

export default Profiles
