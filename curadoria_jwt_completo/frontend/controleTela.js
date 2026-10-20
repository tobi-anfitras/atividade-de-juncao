async function processa_cadastro_usuario() {
    const form_cadastro_usuario = document.getElementById('from_cadastro_usuario')
    const dados_form = new FormData(form_cadastro_usuario);
    const corpo_payload =  Object.fromEntries(dados_form.entries());
    console.log(corpo_payload)

    rota_api_register(corpo_payload)
}

async function processa_login() {
    const form_login = document.getElementById('form_login')
    const dados_login = new FormData(form_login)
    const corpo_login = Object.fromEntries(dados_login.entries())
    console.log(corpo_login)

    rota_api_login(corpo_login)
}

async function colocagen_de_item() {
    const form_carregagem = documento.getElementById('form_carregagem')
    const dados_carregagem = new FormData(form_carregagem)
    const corpo_items = Object.fromEntries(dados_carregagem.entries())
    console.log(corpo_items)

    rota_api_items(corpo_items)
    
}