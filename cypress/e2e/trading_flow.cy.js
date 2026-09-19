describe('Sprint 11 QA: FinPulse AI E2E Algorithmic Trading Automation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('navigates through trading portal and executes an algorithmic trade order', () => {
    // 1. Verify Home Dashboard renders with Net Worth metrics
    cy.contains('FINPULSE').should('be.visible');
    cy.contains('FinPulse AI Wealth & Algorithmic Portal').should('be.visible');

    // 2. Navigate to Markets
    cy.contains('Markets').click();
    cy.url().should('include', '/markets');
    cy.contains('Global Financial Markets').should('be.visible');

    // 3. Search for NVDA asset
    cy.get('input[placeholder*="Search symbol"]').type('NVDA');
    cy.contains('NVIDIA Corporation').should('be.visible');

    // 4. Click Trade NVDA
    cy.contains('Trade NVDA').click();
    cy.url().should('include', '/trade?symbol=NVDA');

    // 5. Enter Order Quantity
    cy.get('[data-testid="quantity-input"]').clear().type('15');

    // 6. Execute Order
    cy.get('[data-testid="submit-order-button"]').click();

    // 7. Verify Order Success Banner
    cy.get('[data-testid="order-success-banner"]', { timeout: 5000 }).should('be.visible');
    cy.contains('Order').should('be.visible');
    cy.contains('Executed').should('be.visible');
  });

  it('navigates to Algo Bots backtester and deploys strategy', () => {
    cy.contains('Algo Bots').click();
    cy.url().should('include', '/strategies');
    cy.contains('Automated Quantitative Trading Bots').should('be.visible');
    cy.contains('Sharpe Ratio').should('be.visible');
    cy.contains('HALT ALGORITHM').should('be.visible');
  });
});
