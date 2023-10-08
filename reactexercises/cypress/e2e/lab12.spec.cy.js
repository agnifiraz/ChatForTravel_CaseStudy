describe("Test Lab 12 Sentence Builder", () => {
    it("finds the server and selects six words", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#fruits").click().type("{downArrow}{enter}");
    cy.get("#fruits").click().type("{downArrow}{enter}");
    cy.get("#fruits").click().type("{downArrow}{enter}");
    cy.get("#fruits").click().type("{downArrow}{enter}");
    cy.get("#fruits").click().type("{downArrow}{enter}");
    cy.get("#fruits").click().type("{downArrow}{enter}");
    cy.contains("Hey I built a sentence. Agnita Paul");
    });
   });
