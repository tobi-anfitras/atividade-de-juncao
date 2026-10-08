async function rota_api_register(dados_cadastro) {
    try{
        const requisição = await fetch('http:/localhost:3001/auth/register',{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(dados_cadastro)
        }

        );
        const resposta = await requisição.json();
        console.log(resposta)
        return "usuario cadastrado";
    }catch(e){
        console.error(e.message);
        return"erro ao cadastrar usuario";
    }
}


