describe('/todo', () => {
  const todoNotExist = 1000
  let todoZero

  before(() => {
    //   cy.request('POST', '/challenger').as('challenger')
    cy.request({
      method: 'GET',
      url: '/todos',
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
      },
    }).then((response) => {
      todoZero = response.body.todos[0].id
      return todoZero
    })
  })

  beforeEach(()=>{
    cy.visit('/gui/challenges/08ad2f98-9b2a-4cc0-b7cc-be97135c35af')
  })

  it('GET /todos (200)', () => {
    cy.request({
      method: 'GET',
      url: '/todos',
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('GET /todos/id (200)', () => {
    cy.request({
      method: 'GET',
      url: `/todos/${todoZero}`,
      failOnStatusCode: false,
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('GET /todo/id (404)', () => {
    cy.request({
      method: 'GET',
      url: `/todos/${todoNotExist}`,
      failOnStatusCode: false,
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
      },
    }).then((response) => {
      expect(response.status).to.eq(404)
    })
  })
})
