describe('Burger Constructor Page', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'test-access');
      cy.window().then(win => win.localStorage.setItem('refreshToken', 'test-refresh'));
  
      cy.intercept('GET', '**/auth/user', {
        body: { success: true, user: { email: 'test@example.com', name: 'Test User' } }
      }).as('getUser');
  
      cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
  
      cy.intercept('POST', '**/orders', {
        body: { success: true, order: { number: 5555 } }
      }).as('createOrder');
  
      cy.visit('/');
      cy.wait('@getIngredients');
      cy.wait('@getUser');
    });
  
    it('добавляет ингредиент в конструктор', () => {
      cy.get('[data-testid="burger-ingredient"]')
        .contains('булка')
        .parent()
        .contains('Добавить')
        .click();
      
      cy.get('[data-testid="burger-ingredient"]')
        .contains('моллюсков')
        .parent()
        .contains('Добавить')
        .click();
  
      cy.get('[data-testid="burger-constructor-bun"]').should('exist');
      cy.get('[data-testid="burger-constructor-element"]').should('have.length.greaterThan', 0);
    });
  
    it('открывает и закрывает модальное окно ингредиента', () => {
      cy.get('[data-testid="burger-ingredient"]').first().click();
      cy.get('[data-testid="modal"]').should('exist');
      cy.get('[data-testid="modal-close"]').click();
      cy.get('[data-testid="modal"]').should('not.exist');
    });
  
    it('отображает данные выбранного ингредиента в модалке', () => {
      cy.get('[data-testid="burger-ingredient"]').contains('Флюоресцентная булка').click();
      cy.get('[data-testid="modal"]').should('contain', 'Флюоресцентная булка R2-D3');
    });
  
    it('создаёт заказ и очищает конструктор', () => {
      cy.get('[data-testid="burger-ingredient"]')
        .contains('булка')
        .parent()
        .contains('Добавить')
        .click();
      
      cy.get('[data-testid="burger-ingredient"]')
        .contains('моллюсков')
        .parent()
        .contains('Добавить')
        .click();
  
      cy.get('[data-testid="burger-constructor-bun"]').should('exist');
  
      cy.contains('Оформить заказ').click();
      cy.wait('@createOrder');

      cy.get('[data-testid="modal"]').should('contain', '5555');

      cy.get('[data-testid="modal-close"]').click();

      cy.get('[data-testid="burger-constructor-bun"]').should('not.exist');

      cy.get('[data-testid="burger-constructor-element"]')
        .children('li')
        .should('have.length', 0);
    });
});
  