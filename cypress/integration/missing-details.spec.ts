describe('Missing details', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get("input[placeholder*='search' i").click().type('Hel - live{enter}');
    cy.contains(/Hel - live/i).click();
  });

  it('should have a similar movies button', () => {
    cy.contains(/Similar movies/i);
  });

  it('should contain missing Wikipedia and IMDB page texts without links', () => {
    cy.contains(/Could not find IMDB page/i).should('not.have.attr', 'href');
    cy.contains(/Could not find Wikipedia page/i).should('not.have.attr', 'href');
  });
});
