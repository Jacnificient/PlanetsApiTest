/// <reference types = "Cypress"/>

describe('Planets Get Api Tests', ()=>
{
    it('Verify Response Headers', ()=>
    {
        cy.request('https://swapi.dev/api/planets/3/').as('planets')//This calls the API and stores response in object called Planets
   
        //verifies status code after call 
        cy.statusVerify() //customised command

        //Block of code below validates all header response
        cy.get('@planets').its('headers').its('server').should('include','nginx/1.16.1')
        cy.get('@planets').its('headers').its('content-type').should('include','application/json')
        cy.get('@planets').its('headers').its('transfer-encoding').should('include','chunked')
        cy.get('@planets').its('headers').its('connection').should('include','keep-alive')
        cy.get('@planets').its('headers').its('vary').should('include','Accept, Cookie')
        cy.get('@planets').its('headers').its('x-frame-options').should('include','SAMEORIGIN')
        cy.get('@planets').its('headers').its('etag').should('include','"ccbca9ad5dbcc6c73413df0765660c26"')
        cy.get('@planets').its('headers').its('allow').should('include','GET, HEAD, OPTIONS')
        cy.get('@planets').its('headers').its('strict-transport-security').should('include','max-age=15768000')

    })  

    it('Verify Response Data', ()=>
    {
        cy.request('https://swapi.dev/api/planets/3/').as('planets')//This calls the API and stores response in object called Planets
   
        //verifies status code after call 
        cy.statusVerify //customised command

        //Block of code below validates all header response
        cy.get('@planets').its('body').should('include',{name: 'Yavin IV'})
        cy.get('@planets').its('body').should('include',{rotation_period: '24'})
        cy.get('@planets').its('body').should('include',{orbital_period: '4818'})
        cy.get('@planets').its('body').should('include',{diameter: '10200'})
        cy.get('@planets').its('body').should('include',{climate: 'temperate, tropical'})
        cy.get('@planets').its('body').should('include',{gravity: '1 standard'})
        cy.get('@planets').its('body').should('include',{terrain: 'jungle, rainforests'})
        cy.get('@planets').its('body').should('include',{surface_water: '8'})
        cy.get('@planets').its('body').should('include',{population: '1000'})
        cy.get('@planets').its('body').its('residents').should('be.a','array')
        cy.get('@planets').its('body').its('films').should('be.a','array').and('contain','https://swapi.dev/api/films/1/')
        cy.get('@planets').its('body').should('include',{created: '2014-12-10T11:37:19.144000Z'})
        cy.get('@planets').its('body').should('include',{edited: '2014-12-20T20:58:18.421000Z'})
        cy.get('@planets').its('body').should('include',{url: 'https://swapi.dev/api/planets/3/'})

    })  

    it('Verify Response Time', ()=>
    {
        cy.request('https://swapi.dev/api/planets/3/').then((response)=>{
            // this assertion expects response time to be less than 3ms
               expect(response.duration).to.not.be.greaterThan(3)   
            })
    })  

    it('Mock Data Test', function()
    {
        cy.visit('https://swapi.dev/api/planets/3/');
        cy.intercept({
            method: 'GET',
            url: 'https://swapi.dev/api/planets/3/'
        },
        {
            body:[
            {"name": "Imtiyaz",
            "rotation_period": "24",
            "orbital_period": "4818",
            "diameter": "10200"
        }]
        }).as('planets');
        //cy.wait('@planets')
        cy.get('@planets').its('body').should('include',{name: 'Yavin IV'})
    })  

    it('Negative Test', function()
    {
        cy.request({
            method: 'POST',
            failOnStatusCode: false,
            url: 'https://swapi.dev/api/planets/3/',
            body: 
            { 
                "name": "Automated testing",
                "Completed": true
            }
        }).as('planets')
        
        //verifies status code is = 405
        cy.poststatusVerify() //customised command
        cy.get('@planets').its('body').should('include',{detail: "Method 'POST' not allowed."})
    })
})