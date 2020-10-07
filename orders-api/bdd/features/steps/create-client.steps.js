const assert = require('assert');
const axios = require('axios');
const { Given, When, Then } = require('cucumber');

const client = {};
let response;

Given('nome igual a {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    client.name = string;
});
Given('email igual a {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    client.email = string;
});

When('cadastro um novo usuário', async function () {
    // Write code here that turns the phrase above into concrete actions
    const headers = {
        'Content-Type': 'application/json',
    }
    response = await axios.post('http://localhost:3000/clients', JSON.stringify(client), { headers });
});
Then('deve responder com status igual a {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    assert.equal(response.status+'', string+'');
});
Then('deve responder com nome igual a {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    const { name } = response.data;
    assert.equal(name, client.name);
});
Then('deve responder com email igual a {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    const { email } = response.data;
    assert.equal(email, client.email);
});