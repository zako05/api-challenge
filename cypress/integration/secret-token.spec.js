describe('/secret/token', () => {
  beforeEach(() => {
    cy.visit('/gui/challenges/08ad2f98-9b2a-4cc0-b7cc-be97135c35af')
  })

  it('POST /secret/token (201)', () => {
    cy.request({
      method: 'POST',
      url: '/secret/token',
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
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
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
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
