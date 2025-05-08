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

  afterEach(() => {
    cy.clearCookies();
    cy.window().then(win => {
      win.localStorage.clear();
      win.sessionStorage.clear();
    });
  });

  it('добавляет ингредиенты в конструктор', () => {
    const bunName = 'булка';
    const fillingName = 'моллюсков';

    cy.get('[data-testid="burger-constructor-bun"]').should('not.exist');
    cy.get('[data-testid="burger-constructor-element"]').should('not.contain', fillingName);

    cy.get('[data-testid="burger-ingredient"]')
      .contains(bunName)
      .parent()
      .contains('Добавить')
      .click();
    cy.get('[data-testid="burger-constructor-bun"]').should('contain', bunName);

    cy.get('[data-testid="burger-ingredient"]')
      .contains(fillingName)
      .parent()
      .contains('Добавить')
      .click();
    cy.get('[data-testid="burger-constructor-element"]').should('contain', fillingName);
  });

  it('открывает и закрывает модальное окно ингредиента', () => {
    cy.get('[data-testid="modal"]').should('not.exist');

    cy.get('[data-testid="burger-ingredient"]').first().click();

    cy.get('[data-testid="modal"]').should('exist');

    cy.get('[data-testid="modal-close"]').click();

    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('отображает данные выбранного ингредиента в модалке', () => {
    const ingredientName = 'Флюоресцентная булка';

    cy.get('[data-testid="modal"]').should('not.exist');

    cy.get('[data-testid="burger-ingredient"]').contains(ingredientName).click();

    cy.get('[data-testid="modal"]').should('contain', `${ingredientName} R2-D3`);
  });

  it('создаёт заказ и очищает конструктор', () => {
    const bunName = 'булка';
    const fillingName = 'моллюсков';

    cy.get('[data-testid="burger-constructor-bun"]').should('not.exist');
    cy.get('[data-testid="burger-constructor-element"]').should('not.contain', fillingName);

    cy.get('[data-testid="burger-ingredient"]')
      .contains(bunName)
      .parent()
      .contains('Добавить')
      .click();
    cy.get('[data-testid="burger-constructor-bun"]').should('contain', bunName);

    cy.get('[data-testid="burger-ingredient"]')
      .contains(fillingName)
      .parent()
      .contains('Добавить')
      .click();
    cy.get('[data-testid="burger-constructor-element"]').should('contain', fillingName);

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get('[data-testid="modal"]').should('contain', '5555');

    cy.get('[data-testid="modal-close"]').click();

    cy.get('[data-testid="burger-constructor-bun"]').should('not.exist');
    cy.get('[data-testid="burger-constructor-element"]').children('li').should('have.length', 0);
  });
});
