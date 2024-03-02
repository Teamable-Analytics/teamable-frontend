import PageView from "@/components/views/Page"
import MultipleChoiceComponent from "./(components)/MultipleChoiceComponent"

// Only have Multiple Choice Editor for now

const Profiles = () => {
    return (
        <PageView title={'Profiles'} breadcrumbs={[
            {title: 'Home', href: '/'},
            {title: 'Profiles', href: '/profiles'},
        ]}>
            <MultipleChoiceComponent />
        </PageView>
    )
}

export default Profiles
