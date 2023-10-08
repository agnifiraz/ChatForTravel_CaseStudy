describe("Test Lab 13 Search for user", () => {
    it("Available Users Selection ", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#menubtn").click();
    cy.contains("a", "Lab 13").click();
    cy.contains("Lab 13");
    cy.wait(1000);

    cy.get("#users").click();
    cy.get("input:first").type("Agnita Paul").click();
    cy.get("#users").type("{downArrow}").click();
    cy.contains("Agnita Paul").click();
    });
   });
