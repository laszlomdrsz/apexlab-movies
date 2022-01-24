describe('Existing details', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get("input[placeholder*='search' i").click().type('fight{enter}');
    cy.contains(/fight club/i).click();
  });

  it('should contain Wikipedia summary and similar movies button', () => {
    cy.contains(/Fight Club is a 1999 American film/i);
    cy.contains(/Similar movies/i);
  });

  it('should contain link to Wikipedia page opening on a new tab', () => {
    cy.contains(/Open Wikipedia page/i)
      .should('have.attr', 'href')
      .and('match', /https:\/\/en.wikipedia.org\/wiki\/Fight( |_)Club/i);
    cy.contains(/Open Wikipedia page/i)
      .should('have.attr', 'target')
      .and('equal', '_blank');
  });

  it('should contain link to IMDB page opening on a new tab', () => {
    cy.contains(/Open IMDB page/i)
      .should('have.attr', 'href')
      .and('match', /https:\/\/www.imdb.com\/title\/tt0137523/i);
    cy.contains(/Open IMDB page/i)
      .should('have.attr', 'target')
      .and('equal', '_blank');
  });
});
