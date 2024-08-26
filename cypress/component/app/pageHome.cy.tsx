import Home from "@/app/(app)/page"

describe("<Home />", () => {
  it("renders", () => {
    cy.mount(<Home />)
  })
})
