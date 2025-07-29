import url_api from "../../../fixtures/urlApi.json";
import cuponsData from "../../../fixtures/cupons.json";

describe('Funcionalidade: Cupons', () => {
    let cupomId;
    cuponsData.cupomValido.code = cuponsData.cupomValido.code + Math.floor(Math.random() * 999)
    const token = "Basic YWRtaW5fZWJhYzpAYWRtaW4hJmJAYyEyMDIy";

    afterEach(() => {
        cy.screenshot();
    });

    it('Deve cadastrar um cupom válido com sucesso - POST', () => {
        cy.api({
            method: 'POST',
            url: url_api.urlCoupons,
            headers: { authorization: token },
            body:  cuponsData.cupomValido
        }).then((response) => {
          //Valida se o cupom foi cadastrado
            expect(response.status).to.equal(201);
            cupomId = response.body.id;
        });
    });

    it('Deve listar o cupom cadastrado - GET', () => {
        cy.api({
            method: 'GET',
            url: `${url_api.urlCoupons}/${cupomId}`,
            headers: { authorization: token }
        }).then((response) => {
          //Valida se o cupom cadastrado está listado
            expect(response.status).to.equal(200);
            expect(response.body.id).to.equal(cupomId);
            expect(response.body.amount).to.equal(cuponsData.cupomValido.amount);
        });
    });

    it('Não deve permitir cadastrar cupom já existente - POST', () => {
        cy.api({
            method: 'POST',
            url: url_api.urlCoupons,
            headers: { authorization: token },
            body: cuponsData.cupomValido,
            failOnStatusCode: false
        }).then((response) => {
          //Valida erro no cadastro
            expect(response.status).to.equal(400);
        });
    });

    it('Deve listar todos os cupons com sucesso - GET', () => {
        cy.api({
            method: 'GET',
            url: url_api.urlCoupons,
            headers: { authorization: token }
        }).then((response) => {
          //Valida se os cupons estão listados
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array'); 
        });
    });
});
