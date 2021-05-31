describe('/todo', () => {
  // before(() => {
  //   cy.request('POST', '/challenger').as('challenger')
  // })

  // beforeEach(()=>{
  //   cy.visit('/gui/challenges/08ad2f98-9b2a-4cc0-b7cc-be97135c35af')
  // })

  it('GET /todos (200)', () => {
    cy.request({
      method: 'GET',
      url: '/todos',
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af'
      }
    }).then(response => {
      expect(response.status).to.eq(200)
    })
  })
})
