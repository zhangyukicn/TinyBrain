/// <reference types="cypress" />
context('Signup flow - happy path', () => {
    beforeEach(() =>{
        cy.visit('http://localhost:3000');
    });
    it('Sucessfully signs up', () => {
        const name = 'Jane';
        const email = 'ssdsfsfes@gamil.com';
        const passwords = 'zzzzzzzz';
        const SessionName = 'sample1';
        const Questionname = 'Is the earth round or flat?'
        const Questionanswer = 'A';
        cy.contains('Log In').click()
        cy.contains("Don't have an account? Sign Up").click()

        cy.get('input[name="firstName"]')
        .focus()
        .type(name);

        cy.get('input[name=email]')
        .focus()
        .type(email);

        cy.get('input[name=password]')
        .focus()
        .type(passwords);
        cy.contains('Sign Up').click()
        // cy.get('Button[type="submit"]').click()
        cy.contains('Create Game').click()
        cy.contains('Edit').click()
        cy.get('input[id=name_change]')
        .focus()
        .type(SessionName);
        cy.contains('Change Name').click()
        cy.contains('Add Question').click()

        // Question 1
        cy.contains('Question 1').click()
        cy.get('input[id =questionContent]')
        .focus()
        .type(Questionname);
        cy.get('input[id =answer]')
        .focus()
        .type(Questionanswer);
        cy.get('input[id =point]')
        .focus()
        .type(20);
        cy.get('input[id =timeLimit]')
        .focus()
        .type(20);
        cy.contains('Submit All').click()
        cy.get('input[id =option1]')
        .focus()
        .type('Yes');
        cy.get('input[id =option0]')
        .focus()
        .type('NO');
        cy.contains('Confirm').click()

        // Question 2
        cy.contains('Add Question').click()
        cy.contains('Question 2').click()
        cy.get('input[id =questionContent]')
        .focus()
        cy.get('input[id =point]')
        .focus()
        .type(20);
        cy.get('input[id =timeLimit]')
        .focus()
        .type(20);
        cy.contains('Submit All').click()
        cy.get('input[id =option1]')
        .focus()
        .type('Yes');
        cy.get('input[id =option0]')
        .focus()
        .type('NO');
        cy.contains('Confirm').click()
        cy.contains('Home').click()

        // play
        cy.contains('Play').click()
    });
});
