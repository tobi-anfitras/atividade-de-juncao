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
async function rota_api_items(dados_items) {
    try{
        let tokem = localStorage.getItem('accesToken');

        const requisição = await fetch('http://localhost:3001/items/',{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${tokem}`,
                'Content-Type': `application/json`//indica o que deve ser enviado
           },
           
        });
        
      if (!requisicao.ok) {
        return console.log("deu ruim ai aruma seu merda")
      }
      let dados = await requisicao.json();
      //console.log(JSON.stringify(dados));

      const divaqui = document.getElementById("aqui")

      divItens.innerHTML = dados.map(item => `
  <h1>titulo:${item.title}<h1>
    <h2>foto:<a href='${item.url}'> ${item.url} </a><h2>
        <h3>tags:${item.tags}<h3>
        <h3>notas:${item.notes}<h3>`)
    


    }catch(e){

    }
    
}


