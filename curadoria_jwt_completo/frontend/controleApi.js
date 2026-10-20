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

async function rota_api_login(dados_do_login) {
    try{
        const requisição = await fetch('http://localhost:3001/auth/login',{
            method: 'POST',
            headers:{
                 'Content-Type': `application/json`
            },
            body:JSON.stringify(dados_do_login)
        }
            
        );

        if(!requisição.ok){
            return console.log("deu ruim")
        }

        
        const resposta = await requisição.json();
        localStorage.setItem('accessToken', resposta.accessToken);
        
        console.log ("se pa foi pro localhost")
        return resposta;
        

    }catch(e){
        console.error(e.message);
        return"deu errado mas eu acho que sei o motivo"
    }
    
}


