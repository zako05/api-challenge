describe('/todo', () => {
  // before(() => {
  //   cy.request('POST', '/challenger').as('challenger')
  // })

  beforeEach(()=>{
    cy.visit('/gui/challenges/08ad2f98-9b2a-4cc0-b7cc-be97135c35af')
  })

  it('GET /todo (404)', () => {
    cy.request({
      method: 'GET',
      url: '/todo',
      failOnStatusCode: false,
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af'
      }
    }).then(response => {
      expect(response.status).to.eq(404)
    })
    cy.get('body > div > table:nth-child(12) > tbody > tr:nth-child(2) > td:nth-child(3)').should('have.text', 'true')
  })
  
})
