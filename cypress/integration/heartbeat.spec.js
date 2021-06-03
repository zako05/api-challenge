describe('/heartbeat', () => {
  beforeEach(() => {
    cy.visit('/gui/challenges/08ad2f98-9b2a-4cc0-b7cc-be97135c35af')
  })

  it('GET /heartbeat (204)', () => {
    cy.request({
      method: 'GET',
      url: '/heartbeat',
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
      },
    }).then((response) => {
      expect(response.status).to.eq(204)
    })
  })

  it('DELETE /heartbeat (405)', () => {
    cy.request({
      method: 'DELETE',
      url: '/heartbeat',
      failOnStatusCode: false,
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
      },
    }).then((response) => {
      expect(response.status).to.eq(405)
    })
  })

  it('PATCH /heartbeat (500)', () => {
    cy.request({
      method: 'PATCH',
      url: '/heartbeat',
      failOnStatusCode: false,
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
      },
    }).then((response) => {
      expect(response.status).to.eq(500)
    })
  })

  it('TRACE /heartbeat (501)', () => {
    cy.request({
      method: 'TRACE',
      url: '/heartbeat',
      failOnStatusCode: false,
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
      },
    }).then((response) => {
      expect(response.status).to.eq(501)
    })
  })
})
