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
    cy.get('[data-testid="MovieItemName"]').first().click();
    cy.contains(/Similar movies/i).click();
    cy.get('[data-testid="MovieItemName"]').first().click();
    cy.contains(/Similar movies/i).click();
    cy.get('[data-testid="MovieItemName"]');
  });

  it('should have proper navigation', () => {
    cy.contains(`Showing movies similar to '${firstMovie}'`);
    cy.get('[data-testid="MovieItemName"]').then((MovieItemNames) => {
      const movieItemName = MovieItemNames[0];
      movieItemName.click();
      cy.contains(/Similar movies/i).click();
      cy.contains(`Showing movies similar to '${movieItemName.innerHTML}'`);
      cy.contains(`Back to search results: '${firstMovieSearch}'`).click();
      cy.get('@searchInput').should('have.value', firstMovieSearch);
    });
  });
});
