# language: pt
Funcionalidade: Gestão de Usuários

    Cenário: Cadastro de um novo usuário
        Dado nome igual a "Igor"
        E email igual a "igor@email.com"
        Quando cadastro um novo usuário
        Então deve responder com status igual a "201"
        E deve responder com nome igual a "Igor"
        E deve responder com email igual a "igor@email.com"

    Cenário: Busca de usuários
        Quando busco os usuários
        Então deve responder com status code igual a "200"
        E deve responder com:
        | id | name | email          |
        | 1  | Igor | igor@email.com |