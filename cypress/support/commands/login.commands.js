Cypress.Commands.add('login', (username, password) => {
  Cypress.log({
    name: 'login',
    message: `${username} | ${password}`,
  })

  const challenger = Cypress.env('challenger')

  cy.request({
    method: 'POST',
    url: '/secret/token',
    headers: {
      'X-CHALLENGER': challenger,
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
