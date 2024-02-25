import PageView from "@/components/views/Page"
import MultipleChoiceEditor from "./multipleChoiceEditor"

// Only have Multiple Choice Editor for now

const Profiles = () => {
    return (
        <PageView title={'Profiles'} breadcrumbs={[
            {title: 'Home', href: '/'},
            {title: 'Profiles', href: '/profiles'},
        ]}>
            <MultipleChoiceEditor />
        </PageView>
    )
}

export default Profiles
