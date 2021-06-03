describe('/todo', () => {
  const todoNotExist = 1000
  const foo = 'bob'
  let todoZero

  before(() => {
    //   cy.request('POST', '/challenger').as('challenger')
    // get first item from returned collection
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

  beforeEach(() => {
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

  it('GET /todos/{id} (200)', () => {
    cy.request({
      method: 'GET',
      url: `/todos/${todoZero}`,
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('GET /todos/{id} (404)', () => {
    cy.request({
      method: 'GET',
      url: `/todos/${todoNotExist}`,
      failOnStatusCode: false,
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
      },
    }).then((response) => {
      expect(response.status).to.eq(404)
      expect(response.body.errorMessages[0]).to.eq(
        'Could not find an instance with todos/1000'
      )
    })
  })

  it('HEAD /todos/{id} (200)', () => {
    cy.request({
      method: 'HEAD',
      url: '/todos',
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.eq('')
    })
  })

  it('POST /todos (201)', () => {
    cy.request({
      method: 'POST',
      url: '/todos',
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
      },
      body: {
        title: 'new todo',
        description: 'this is new todo',
        doneStatus: true,
      },
    }).then((response) => {
      expect(response.status).to.eq(201)
    })
  })

  it('GET /todos (200) ?filter', () => {
    cy.request({
      method: 'GET',
      url: '/todos?doneStatus=true',
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('POST /todos (200) doneStatus', () => {
    cy.request({
      method: 'POST',
      url: '/todos',
      failOnStatusCode: false,
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
      },
      body: {
        title: 'new todo',
        description: 'this is new todo',
        doneStatus: `${foo}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })

  it('POST /todos/{id} (200)', () => {
    cy.request({
      method: 'POST',
      url: `/todos/${todoZero}`,
      failOnStatusCode: false,
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
      },
      body: {
        title: 'todo updated',
        description: 'updated',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('DELETE /todos/{id} (200)', () => {
    cy.request({
      method: 'DELETE',
      url: `/todos/${todoZero + 1}`,
      failOnStatusCode: false,
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('OPTIONS /todos (200)', () => {
    cy.request({
      method: 'OPTIONS',
      url: '/todos',
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.eq('')
      expect(response.headers.allow).to.eq('OPTIONS, GET, HEAD, POST')
    })
  })

  it('GET /todos (200) XML', () => {
    cy.request({
      method: 'GET',
      url: '/todos',
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
        Accept: 'Application/xml',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.headers['content-type']).to.eq('application/xml')
    })
  })

  it('GET /todos (200) JSON', () => {
    cy.request({
      method: 'GET',
      url: '/todos',
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
        Accept: 'Application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.headers['content-type']).to.eq('application/json')
    })
  })

  it('GET /todos (200) ANY', () => {
    cy.request({
      method: 'GET',
      url: '/todos',
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
        Accept: 'application/xml, application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.headers['content-type']).to.eq('application/xml')
    })
  })

  it('GET /todos (200) no accept', () => {
    cy.request({
      method: 'GET',
      url: '/todos',
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.headers['content-type']).to.eq('application/json')
    })
  })

  it('GET /todos (406)', () => {
    cy.request({
      method: 'GET',
      url: '/todos',
      failOnStatusCode: false,
      headers: {
        'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
        Accept: 'application/gzip',
      },
    }).then((response) => {
      expect(response.status).to.eq(406)
      expect(response.headers['content-type']).to.eq('application/json')
    })
  })

  it('POST /todos XML', () => {
    cy.readFile('http-request-method-post.xml').then((xml) => {
      cy.request({
        method: 'POST',
        url: '/todos',
        headers: {
          'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
          Accept: 'application/xml',
          'Content-type': 'application/xml',
        },
        body: xml,
      }).then((response) => {
        expect(response.status).to.eq(201)
      })
    })
  })

  it('POST /todos JSON', () => {
    cy.readFile('http-request-method-post.json').then((json) => {
      cy.request({
        method: 'POST',
        url: '/todos',
        headers: {
          'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: json,
      }).then((response) => {
        expect(response.status).to.eq(201)
      })
    })
  })

  it('POST /todos (415)', () => {
    cy.readFile('http-request-method-post.json').then((json) => {
      cy.request({
        method: 'POST',
        url: '/todos',
        failOnStatusCode: false,
        headers: {
          'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
          Accept: 'application/json',
          'Content-type': `application/${foo}`,
        },
        body: json,
      }).then((response) => {
        expect(response.status).to.eq(415)
      })
    })
  })

  it.only('POST /todos XML to JSON', () => {
    cy.readFile('http-request-method-post.xml').then((xml) => {
      cy.request({
        method: 'POST',
        url: '/todos',
        headers: {
          'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
          Accept: 'application/json',
          'Content-type': `application/xml`,
        },
        body: xml,
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.headers.['content-type']).to.eq('application/json')
      })
    })
  })

  it.only('POST /todos JSON to XML', () => {
    cy.readFile('http-request-method-post.json').then((json) => {
      cy.request({
        method: 'POST',
        url: '/todos',
        headers: {
          'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
          Accept: 'application/xml',
          'Content-type': 'application/json',
        },
        body: json,
      }).then((response) => {
        expect(response.status).to.eq(201)
      })
    })
  })
})
