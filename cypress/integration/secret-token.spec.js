describe('/secret/token', () => {
  const challenger = Cypress.env('challenger')

  beforeEach(() => {
    cy.visit(`/gui/challenges/${challenger}`)
  })

  it('POST /secret/token (201)', () => {
    cy.request({
      method: 'POST',
      url: '/secret/token',
      headers: {
        'X-CHALLENGER': challenger,
      },
      auth: {
        username: 'admin',
        password: 'password',
      },
    }).then((response) => {
      expect(response.status).to.eq(201)
    })
  })

  it('POST /secret/token (401)', () => {
    cy.request({
      method: 'POST',
      url: '/secret/token',
      failOnStatusCode: false,
      headers: {
        'X-CHALLENGER': challenger,
      },
      auth: {
        username: 'admin',
        password: 'admin',
      },
    }).then((response) => {
      expect(response.status).to.eq(401)
    })
  })
})
