describe('Search', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get("input[placeholder*='search' i").as('searchInput');
  });

  it('should find existing movie', () => {
    cy.get('@searchInput').click().type('fight{enter}');
    cy.contains(/fight club/i);
  });

  it('should work by clicking the search icon', () => {
    cy.get('@searchInput').click().type('fight');
    cy.get('[data-testid="SearchIcon"]').click();
    cy.contains(/fight club/i);
  });

  it('should handle zero results', () => {
    cy.get('@searchInput').click().type('xyzxyzxykksad{enter}');
    cy.contains(/No movies could be found/i);
  });
});
