import PaginaProduto from "../pages/paginaProduto";

describe('Funcionalidade: Produtos', () => {
    beforeEach(() => {
        PaginaProduto.visitarUrl();
    });

    afterEach(() => {
        cy.screenshot();
    });

    it('Deve adicionar 3 produtos ao carrinho com sucesso', () => {
        cy.fixture('produtos').then(dados => {
            // Primeiro produto
            PaginaProduto.buscarProduto(dados[0].nomeProduto);
            PaginaProduto.adicionarCarrinho(
                dados[0].tamanho,
                dados[0].cor,
                dados[0].quantidade
            );
            //Valida a insersão do produto 1
            cy.get('.woocommerce-message').should('contain', dados[0].nomeProduto);

            // Segundo produto
            PaginaProduto.buscarProduto(dados[1].nomeProduto);
            PaginaProduto.adicionarCarrinho(
                dados[1].tamanho,
                dados[1].cor,
                dados[1].quantidade
            );
            //Valida a insersão do produto 2
            cy.get('.woocommerce-message').should('contain', dados[1].nomeProduto);

            // Terceiro produto
            PaginaProduto.buscarProduto(dados[2].nomeProduto);
            PaginaProduto.adicionarCarrinho(
                dados[2].tamanho,
                dados[2].cor,
                dados[2].quantidade
            );
            //Valida a insersão do produto 3
            cy.get('.woocommerce-message').should('contain', dados[2].nomeProduto);
            
            // Clica para ver o carrinho
            cy.get('.woocommerce-message > .button').click();

            // Validação dos 3 produtos no carrinho
            dados.forEach((produto, index) => {
              cy.get(`.cart_item:nth-child(${index + 1}) .product-name`)
                .should('contain', produto.nomeProduto);
            });

        });
    });
    
});