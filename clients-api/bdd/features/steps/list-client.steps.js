const assert = require('assert');
const axios = require('axios');
const { Given, When, Then } = require('cucumber');

let response;

When('busco os usuários', async function () {
    // Write code here that turns the phrase above into concrete actions
    response = await axios.get('http://localhost:3333/clients');
});

Then('deve responder com status code igual a {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    assert.equal(response.status+'', string);
});

Then('deve responder com:', function (dataTable) {
    // Write code here that turns the phrase above into concrete actions
    const expectedUser = _dataTableToJSON(dataTable);
    const [responseUser] = response.data;
    assert.equal(responseUser.name, expectedUser.name);
    assert.equal(responseUser.email, expectedUser.email);
});

function _dataTableToJSON(dataTable) {
    const { rawTable } = dataTable;
    const [fields, values] = rawTable;
    let json = {};
    fields.forEach((field, index) => {
        json[field] = values[index];
    });
    return json;
}
