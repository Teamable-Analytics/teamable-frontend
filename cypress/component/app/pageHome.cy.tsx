import Home from "@/app/(template)/page"

describe('<Home />', () => {
    it('renders', () => {
        cy.mount(<Home />)
    })
})
