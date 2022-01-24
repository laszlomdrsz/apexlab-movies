describe('Similar movies', () => {
  const firstMovieSearch = 'Fight';
  const firstMovie = 'Fight Club';
  beforeEach(() => {
    cy.visit('/');
    cy.get("input[placeholder*='search' i").as('searchInput').click().type(`${firstMovieSearch}{enter}`);
    cy.contains(firstMovie).click();
    cy.contains(/Similar movies/i).click();
  });

  it('should display similar movies on multiple levels', () => {
    cy.get('[data-testid="ListItemName"]').first().click();
    cy.contains(/Similar movies/i).click();
    cy.get('[data-testid="ListItemName"]').first().click();
    cy.contains(/Similar movies/i).click();
    cy.get('[data-testid="ListItemName"]');
  });

  it('should have proper navigation', () => {
    cy.contains(`Showing movies similar to '${firstMovie}'`);
    cy.get('[data-testid="ListItemName"]').then((ListItemNames) => {
      const ListItemName = ListItemNames[0];
      ListItemName.click();
      cy.contains(/Similar movies/i).click();
      cy.contains(`Showing movies similar to '${ListItemName.innerHTML}'`);
      cy.contains(`Back to search results: '${firstMovieSearch}'`).click();
      cy.get('@searchInput').should('have.value', firstMovieSearch);
    });
  });
});
