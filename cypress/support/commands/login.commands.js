Cypress.Commands.add('login', (username, password) => {
  Cypress.log({
    name: 'login',
    message: `${username} | ${password}`,
  })

  cy.request({
    method: 'POST',
    url: '/secret/token',
    headers: {
      'X-CHALLENGER': '08ad2f98-9b2a-4cc0-b7cc-be97135c35af',
    },
    auth: {
      username: username,
      password: password,
    },
  }).then((response) => {
    expect(response.status).to.eq(201)
    return response.headers['x-auth-token']
  })
})
