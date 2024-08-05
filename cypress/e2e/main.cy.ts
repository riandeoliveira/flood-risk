describe("Flood Risk E2E Tests", () => {
  it("should start at home screen", () => {
    cy.visit("http://localhost:3000");

    const testIds: string[] = [
      "home-page",
      "header-area",
      "main-area",
      "side-bar",
      "map-area",
      "footer-area",
    ];

    testIds.forEach((id) => {
      cy.get(`[data-test-id=${id}]`).should("be.visible");
    });

    cy.get("[data-test-id=side-bar-title]").should("have.text", "Áreas de Risco de Alagamentos");
  });

  it("should create a new flood risk area", () => {
    cy.get("[data-test-id=create-flood-risk-area-button]").click({ force: true });

    cy.get("[data-test-id=side-bar-title]").should("have.text", "Nova Área de Risco");

    cy.get("[data-test-id=nome-input]").type("Teste");

    cy.get("[data-test-id=descricao-input]").type("Teste descrição...");

    cy.get("[data-test-id=estado-input]").click({ multiple: true });
    cy.contains("Rio Grande do Sul").click();

    cy.get("[data-test-id=cidade-input]").click({ multiple: true });
    cy.contains("GRAVATAI").click();

    cy.get("[data-test-id=latitude-input]").type("-29.925300287652572");

    cy.get("[data-test-id=longitude-input]").type("-51.010277607803005");

    cy.get("[data-test-id=nivel-risco-input]").click({ multiple: true });
    cy.contains("1. Muito baixo").click();

    cy.get("[data-test-id=submit-button]").click();

    cy.contains("Área de risco criada com sucesso!");
  });

  it("should search a flood risk area", () => {
    cy.get("[data-test-id=search-input]").type("Teste");

    cy.contains("Teste | GRAVATAI").click();

    cy.get("[data-test-id=side-bar-title]").should("have.text", "Teste");
  });

  it("should update a flood risk area", () => {
    cy.get("[data-test-id=update-flood-risk-area-button]").click({ force: true });

    cy.get("[data-test-id=side-bar-title]").should("have.text", "Atualizar Área de Risco");

    cy.get("[data-test-id=submit-button]").click();

    cy.contains("Área de risco atualizada com sucesso!");
  });

  it("should delete a flood risk area", () => {
    cy.get("[data-test-id=search-input]").type("Teste");

    cy.contains("Teste | GRAVATAI").click();

    cy.get("[data-test-id=delete-flood-risk-area-button]").click({ force: true });

    cy.get("[data-test-id=side-bar-title]").should("have.text", "Remover Área de Risco");

    cy.get("[data-test-id=submit-button]").click();

    cy.contains("Área de risco removida com sucesso!");

    cy.get("[data-test-id=search-input]").type("Teste");

    cy.contains("Teste | GRAVATAI").should("not.exist");

    cy.get("[data-test-id=side-bar-title]").should("have.text", "Áreas de Risco de Alagamentos");
  });
});
