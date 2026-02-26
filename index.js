import express from 'express';

const host = '0.0.0.0'; //todas interfaces de rede possam acessar a nossa aplicação
const porta = 3000; //aplicação identificada pelo número 3000

const app = express();
var listaJogadores = [];

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('<h1>Bem-vindo à aula ao vivo nº 2 de PPI ADS 2026!</h1>');
});

//Diferentemente do método GET, que exigia do usuário a passagem de parâmetros por meio da url
//iremos nesta aula utilizar o método POST.
//O método cria um novo recurso no servidor (um registro, uma imagem, um comentário, etc)


//poder enviar dados de um jogador usando um formulário HTML
//A aplicação deverá entregar ou oferecer tal formulário HTML
app.get("/jogador", (requisicao, resposta) => {
    //retornar uma página contendo um formulário HTML
    resposta.write(`
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Formulário de cadastro de Jogador</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            </head>
            <body>
                <div class="container mt-5">
                    <form method="POST" action="/jogador" class="row gy-2 gx-3 align-items-center border p-3">
                        <legend>
                            <h3>Cadastro de Jogadores</h3>
                        </legend>

                        <div class="row">
                            <label class="colFormLabel" for="nome">Nome do Jogador</label>
                            <input type="text" class="form-control" id="nome" name="nome">
                        </div>
                        <div class="row">
                            <label class="colFormLabel" for="apelido">Nickname</label>
                            <input type="text" class="form-control" id="apelido" name="apelido">
                        </div>
                        <div class="row">
                            <label class="colFormLabel" for="apelido">Nível do jogador</label>
                            <select class="form-select mb-3" aria-label="seleção de nível do jogador" id="nivel" name="nivel">
                                <option selected>Selecione o nível do jogador</option>
                                <option value="iniciante">Iniciante</option>
                                <option value="experiente">Experiente</option>
                                <option value="expert">Expert</option>
                            </select>
                        </div>
                        
                        <div class="row">
                            <button type="submit" class="btn btn-primary">Cadastrar Jogador</button>
                        </div>
                        </form>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
        </html>
    `);
    resposta.end();
})

//Espera por dados de um formulário html
app.post("/jogador", (requisicao, resposta) => {
    //Deve adicionar um novo jogador, criando um  novo estado da aplicação.
    //Usando o método POST o formulário html envia os seus dados no corpo da requisição

    const nome = requisicao.body.nome;
    const apelido = requisicao.body.apelido;
    const nivel = requisicao.body.nivel;

    listaJogadores.push(
        {
            "nome": nome,
            "apelido": apelido,
            "nivel": nivel
        }
    );

    resposta.redirect("/listaJogadores");
});

app.get("/listaJogadores", (requisicao, resposta) => {
    resposta.write(`
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Formulário de cadastro de Jogador</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            </head>
            <body>
                <div class="container mt-5">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Apelido</th>
                                <th scope="col">Nível</th>
                            </tr>
                        </thead>
                        <tbody>
    `);
    for(let i = 0; i < listaJogadores.length; i++) {
        const jogador = listaJogadores[i];
        resposta.write(`
            <tr>
                <td>${i+1}</td>
                <td>${jogador.nome}</td>
                <td>${jogador.apelido}</td>
                <td>${jogador.nivel}</td>
            </tr>
        `);
    }
    resposta.write(`    </tbody>
                    </table>
                    <a href="/jogador" class="btn btn-primary">Continuar cadastrando...</a>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
        </html>`);

    resposta.end();
});

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
})