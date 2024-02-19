import {Button} from "@/components/ui/button"
import PageView from "@/components/views/Page"

export default function Home() {
    return (
        <PageView title={'Default Page'} breadcrumbs={[
            {title: 'Home', href: '/'},
            {title: 'Students', href: '/students'},
        ]}>
            <Button>Click me</Button>
        </PageView>
    )
}
