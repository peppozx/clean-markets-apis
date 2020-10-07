# language: pt
Funcionalidade: Gestão de produtos

    @products-truncate
    Cenário: Cadastro de um novo produto
        Dado "name" igual a "Nescau"
        E "description" igual a "Achocolatado em Pó Nescau"
        E "price" igual a 1499
        Quando cadastro um novo produto
        Então deve responder com status igual a 201
        E deve responder com "id"
        E deve responder "name" igual a "Nescau"
        E deve responder "description" igual a "Achocolatado em Pó Nescau"
        E deve responder "price" igual a 1499
    
    @products-seeder
    @products-truncate
    Cenário: Busca de produto por id
        Dado "id" igual a "5f7dff12203ac20209211428"
        Quando busco um produto
        Então deve responder com status igual a 200
        E deve responder "id" igual a "5f7dff12203ac20209211428"
        E deve responder "name" igual a "Toddy"
        E deve responder "description" igual a "Nescau melhor que Toddy"
        E deve responder "price" igual a 1000

    Cenário: Busca de produto por id não existente
        Dado "id" igual a 99
        Quando busco um produto
        Então deve responder com status igual a 404
        E deve responder "message" igual a "Produto não encontrado"

    @products-seeder
    @products-truncate
    Cenário: Busca a lista de produtos cadastrados
        Quando busco a lista de produtos cadastrados
        Então deve responder com:
        | id                        | name         | description               | price |
        | 5f7dff12203ac20209211428  | Toddy        | Nescau melhor que Toddy   | 1000  |
        | 5f7dff4dbc994c7c05f777b2  | Achocolatado | Descrição do achocolatado | 700   |