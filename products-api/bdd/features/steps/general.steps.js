const { Given, Then, When } = require("cucumber");
const assert = require('assert').strict;
const axios = require('axios');
const { apiBaseUrl } = require('../../config');


const assignField = function (field, value) {
    if(!this.request) {
        this.request = {
            body: {
                [field]: value
            }
        };
    } else {
        this.request.body[field] = value;
    }
} 

const assertField = function (field, value) {
    assert.strictEqual(this.response.body[field], value);
}

const makeRequest = async (method, path, data) => {
    try {
        const response = await axios.request({
            url: path,
            baseURL: apiBaseUrl,
            data,
            method
        });
        return {
            status: response.status,
            body: response.data,
        }
    } catch (error) {
        return {
            status: error.response?.status,
            body: error.response?.data
        };
    }
}

Given('{string} igual a {int}', assignField);
Given('{string} igual a {string}', assignField);

Then('deve responder com status igual a {int}', function (statusCode) {
    assert.strictEqual(this.response.status, statusCode);
});
Then('deve responder com {string}', function(fieldName) {
    const field = this.response.body[fieldName];
    const validate = (typeof field !== 'undefined' && field !== null );
    assert.strictEqual(validate, true);
});
Then('deve responder {string} igual a {int}', assertField);
Then('deve responder {string} igual a {string}', assertField);

When('cadastro um novo produto', async function() {
    this.response = await makeRequest('post', '/product', this.request.body);
});

When('busco um produto', async function() {
    this.response = await makeRequest('get', `/product/${this.request.body.id}`);
});

When('busco a lista de produtos cadastrados', async function() {
    this.response = await makeRequest('get', `/product/`);
});

Then('deve responder com:', function (dataTable) {
    const dataRows = dataTable.hashes();
    for (const key in dataRows) {
       assert.strictEqual(this.response.body[key].id, dataRows[key].id);
       assert.strictEqual(this.response.body[key].nome, dataRows[key].nome);
       assert.strictEqual(this.response.body[key].descricao, dataRows[key].descricao);
       assert.strictEqual(this.response.body[key].preco, dataRows[key].preco);
    }
});