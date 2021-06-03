export const createNote = () => {
  return {
    text: `${cy.faker.random.word()}'s note`,
  }
}
