async function rota_api_register(dados_cadastro) {
    try {
        const requisição = await fetch('http:/localhost:3001/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados_cadastro)
        }

        );
        const resposta = await requisição.json();
        console.log(resposta)
        return "usuario cadastrado";
    } catch (e) {
        console.error(e.message);
        return "erro ao cadastrar usuario";
    }
}

async function rota_api_login(dados_do_login) {
    try {
        const requisição = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': `application/json`
            },
            body: JSON.stringify(dados_do_login)
        }

        );

        if (!requisição.ok) {
            return console.log("deu ruim")
        }


        const resposta = await requisição.json();
        localStorage.setItem('accessToken', resposta.accessToken);

        console.log("se pa foi pro localhost")
        return resposta;


    } catch (e) {
        console.error(e.message);
        return "deu errado mas eu acho que sei o motivo"
    }

}
async function rota_api_novo_item(dados_new_item) {
    let tokem = localStorage.getItem('accessToken');
    try {
        const requisição = await fetch('http:/localhost:3001/items/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${tokem}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados_new_item)
        }

        );
        const resposta = await requisição.json();
        console.log(resposta)
        return "item novo cadastrado";
    } catch (e) {
        console.error(e.message);
        return "erro ao cadastrar item";
    }
}
    

async function rota_api_items(dados_items) {
    let tokem = localStorage.getItem('accessToken');
    try {


        const requisicao = await fetch('http://localhost:3001/items/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tokem}`,
                'Content-Type': `application/json`//indica o que deve ser enviado
            },
            body: JSON.stringify(dados_items)

        });

        if (!requisicao.ok) {
            return console.log("deu ruim ai aruma seu merda")
        }
        let dados = await requisicao.json();
        console.log(dados);
        
        return dados;

    } catch (e) {

    }

}


