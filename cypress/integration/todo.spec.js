describe('/todo', () => {
  const challenger = Cypress.env('challenger')
  let todoZero

  before(() => {
    // cy.request('POST', '/challenger').as('challenger')
    cy.request({
      method: 'GET',
      url: '/todos',
      headers: {
        'X-CHALLENGER': challenger,
      },
    }).then((response) => {
      todoZero = response.body.todos[0].id
      return todoZero
    })
  })

  beforeEach(() => {
    cy.visit(`/gui/challenges/${challenger}`)
  })

  it('GET /todo (404)', () => {
    cy.request({
      method: 'GET',
      url: '/todo',
      failOnStatusCode: false,
      headers: {
        'X-CHALLENGER': challenger,
      },
    }).then((response) => {
      expect(response.status).to.eq(404)
    })
    cy.get(
      'body > div > table:nth-child(12) > tbody > tr:nth-child(2) > td:nth-child(3)'
    ).should('have.text', 'true')
  })

  it('GET /todo/id (404)', () => {
    cy.request({
      method: 'GET',
      url: `/todo/${todoZero}`,
      failOnStatusCode: false,
      headers: {
        'X-CHALLENGER': challenger,
      },
    }).then((response) => {
      expect(response.status).to.eq(404)
    })
  })
})
