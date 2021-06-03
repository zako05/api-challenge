import { createNote } from '../support/faker-generator'

describe('/secret/note', () => {
  const challenger = Cypress.env('challenger')
  let note

  before(() => {
    note = createNote()
  })

  beforeEach(() => {
    cy.visit(`/gui/challenges/${challenger}`)
    // get auth token
    cy.login('admin', 'password').as('authToken')
  })

  it('GET /secret/note (200)', () => {
    cy.get('@authToken').then((authToken) => {
      cy.request({
        method: 'GET',
        url: '/secret/note',
        headers: {
          'X-CHALLENGER': challenger,
          'X-AUTH-TOKEN': authToken,
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    })
  })

  it('GET /secret/note (401)', () => {
    cy.request({
      method: 'GET',
      url: '/secret/note',
      failOnStatusCode: false,
      headers: {
        'X-CHALLENGER': challenger,
      },
    }).then((response) => {
      expect(response.status).to.eq(401)
    })
  })

  it('GET /secret/note (403)', () => {
    cy.request({
      method: 'GET',
      url: '/secret/note',
      failOnStatusCode: false,
      headers: {
        'X-CHALLENGER': challenger,
        'X-AUTH-TOKEN': 'fakeAuthToken',
      },
    }).then((response) => {
      expect(response.status).to.eq(403)
    })
  })

  it('POST /secret/note (200)', () => {
    cy.get('@authToken').then((authToken) => {
      cy.request({
        method: 'POST',
        url: '/secret/note',
        headers: {
          'Content-Type': 'application/json',
          'X-CHALLENGER': challenger,
          'X-AUTH-TOKEN': authToken,
        },
        body: {
          note: note.text,
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    })
  })

  it('POST /secret/note (200) JSON', () => {
    cy.readFile('secret-note.json').then((json) => {
      cy.get('@authToken').then((authToken) => {
        cy.request({
          method: 'POST',
          url: '/secret/note',
          headers: {
            'Content-Type': 'application/json',
            'X-CHALLENGER': challenger,
            'X-AUTH-TOKEN': authToken,
          },
          body: json,
        }).then((response) => {
          expect(response.status).to.eq(200)
        })
      })
    })
  })

  it('POST /secret/note (401)', () => {
    cy.get('@authToken').then((authToken) => {
      cy.request({
        method: 'POST',
        url: '/secret/note',
        failOnStatusCode: false,
        headers: {
          'Content-Type': 'application/json',
          'X-CHALLENGER': challenger,
        },
        body: {
          note: note.text,
        },
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })
  })

  it('POST /secret/note (403)', () => {
    cy.get('@authToken').then((authToken) => {
      cy.request({
        method: 'POST',
        url: '/secret/note',
        failOnStatusCode: false,
        headers: {
          'Content-Type': 'application/json',
          'X-CHALLENGER': challenger,
          'X-AUTH-TOKEN': 'invalid token',
        },
        body: {
          note: note.text,
        },
      }).then((response) => {
        expect(response.status).to.eq(403)
      })
    })
  })

  it('GET /secret/note (Bearer)', () => {
    cy.get('@authToken').then((authToken) => {
      cy.request({
        method: 'GET',
        url: '/secret/note',
        headers: {
          'Content-Type': 'application/json',
          'X-CHALLENGER': challenger,
          Authorization: `Bearer ${authToken}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    })
  })

  it('POST /secret/note (Bearer)', () => {
    cy.get('@authToken').then((authToken) => {
      cy.request({
        method: 'POST',
        url: '/secret/note',
        headers: {
          'Content-Type': 'application/json',
          'X-CHALLENGER': challenger,
          Authorization: `Bearer ${authToken}`,
        },
        body: {
          note: note.text,
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    })
  })
})
