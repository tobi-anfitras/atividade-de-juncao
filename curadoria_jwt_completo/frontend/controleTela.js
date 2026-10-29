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

async function processa_cadastro_items() {
    const form_novo_items = document.getElementById('form_novo_item')
    const dados_novo_item = new FormData(form_novo_items)
    const corpo_novo_items = Object.fromEntries(dados_novo_item.entries())
    console.log(corpo_novo_items)

    await rota_api_novo_item(corpo_novo_items)
    
}


async function colocagen_de_item() {
    try {
        const dados = await rota_api_items();

        console.log(JSON.stringify(dados));

        const divItens = document.getElementById("items");

        divItens.innerHTML = `
            

<style>
    #items .tabela-container {
        width: 100%;
        overflow-x: auto;
        padding: 28px;
        box-sizing: border-box;
        background: rgba(22, 19, 43, 0.95);
        border: 1px solid rgba(168, 85, 247, 0.4);
        border-radius: 16px;
        box-shadow:
            0 10px 35px rgba(0, 0, 0, 0.25),
            0 0 20px rgba(168, 85, 247, 0.08);
        font-family: 'Nunito', Arial, sans-serif;
        position: relative;
    }

    #items .tabela-container::before {
        content: "";
        display: block;
        width: 85px;
        height: 3px;
        margin-bottom: 22px;
        border-radius: 5px;
        background: linear-gradient(90deg, #ff4fc8, #55e7ff);
        box-shadow: 0 0 12px rgba(255, 79, 200, 0.6);
    }

    #items .titulo {
        margin: 0 0 8px;
        color: #ff8cde;
        font-family: 'Orbitron', sans-serif;
        font-size: 24px;
        text-shadow: 0 0 14px rgba(255, 79, 200, 0.25);
    }

    #items .subtitulo {
        margin: 0 0 25px;
        color: #b4accb;
        font-size: 14px;
    }

    #items table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        font-size: 14px;
        color: #f8f4ff;
    }

    #items thead {
        background: rgba(168, 85, 247, 0.16);
    }

    #items th {
        padding: 16px;
        color: #55e7ff;
        font-family: 'Orbitron', sans-serif;
        font-size: 12px;
        letter-spacing: 1px;
        border-bottom: 1px solid #a855f7;
        white-space: nowrap;
    }

    #items td {
        padding: 16px;
        border-bottom: 1px solid rgba(168, 85, 247, 0.18);
        vertical-align: middle;
    }

    #items tbody tr {
        transition: background 0.25s ease;
    }

    #items tbody tr:nth-child(even) {
        background: rgba(255, 255, 255, 0.02);
    }

    #items tbody tr:hover {
        background: rgba(168, 85, 247, 0.13);
    }

    #items .tag {
        display: inline-block;
        margin: 3px;
        padding: 5px 10px;
        border-radius: 20px;
        border: 1px solid rgba(85, 231, 255, 0.3);
        background: rgba(85, 231, 255, 0.08);
        color: #78edff;
        font-size: 12px;
        font-weight: 700;
        transition: 0.2s ease;
    }

    #items .tag:hover {
        background: rgba(85, 231, 255, 0.18);
        box-shadow: 0 0 10px rgba(85, 231, 255, 0.15);
    }

    #items .link-foto {
        display: inline-block;
        padding: 9px 13px;
        background: linear-gradient(135deg, #7e22ce, #be2498);
        color: #ffffff;
        border: 1px solid rgba(255, 79, 200, 0.45);
        border-radius: 7px;
        text-decoration: none;
        font-weight: 800;
        white-space: nowrap;
        transition: 0.25s ease;
    }

    #items .link-foto:hover {
        transform: translateY(-2px);
        border-color: #55e7ff;
        box-shadow: 0 0 15px rgba(255, 79, 200, 0.3);
    }

    #items .nota {
        min-width: 150px;
        max-width: 300px;
        color: #c5bddb;
        overflow-wrap: anywhere;
        line-height: 1.7;
    }

    #items .vazio {
        text-align: center;
        padding: 28px;
        color: #b4accb;
    }

    #items strong {
        color: #ffffff;
    }

    @media (max-width: 720px) {
        #items .tabela-container {
            padding: 18px;
        }

        #items table {
            min-width: 580px;
        }

        #items .titulo {
            font-size: 20px;
        }
    }
</style>

<div class="tabela-container">
    <h2 class="titulo">✦ Lista de Itens</h2>

    <p class="subtitulo">
        🌸 Sua coleção de itens cadastrados
    </p>

    <table>
        <thead>
            <tr>
                <th>Título</th>
                <th>Foto</th>
                <th>Tags</th>
                <th>Notas</th>
            </tr>
        </thead>

        <tbody id="corpo-tabela">
            <tr>
                <td colspan="4" class="vazio">
                    ✨ Carregando sua coleção...
                </td>
            </tr>
        </tbody>
    </table>
</div>`

;

        const corpoTabela = divItens.querySelector("#corpo-tabela");

        if (!Array.isArray(dados) || dados.length === 0) {
            corpoTabela.innerHTML = `
                <tr>
                    <td colspan="4" class="vazio">
                        Nenhum item encontrado.
                    </td>
                </tr>
            `;
            return;
        }

        corpoTabela.innerHTML = dados.map(item => {
            const tags = Array.isArray(item.tags)
                ? item.tags
                : item.tags
                    ? [item.tags]
                    : [];

            const tagsHTML = tags.length
                ? tags.map(tag => `
                    <span class="tag">
                        ${escaparHTML(tag)}
                    </span>
                `).join("")
                : "Sem tags";

            const urlValida = typeof item.url === "string"
                && /^https?:\/\//i.test(item.url);

            const fotoHTML = urlValida
                ? `<a class="link-foto"
                     href="${escaparHTML(item.url)}"
                     target="_blank"
                     rel="noopener noreferrer">
                     Ver foto ↗
                   </a>`
                : "Sem foto";

            return `
                <tr>
                    <td>
                        <strong>
                            ${escaparHTML(item.title ?? "Sem título")}
                        </strong>
                    </td>

                    <td>${fotoHTML}</td>

                    <td>${tagsHTML}</td>

                    <td>
                        <div class="nota">
                            ${escaparHTML(item.notes ?? "Sem notas")}
                        </div>
                    </td>
                </tr>
            `;
        }).join("");

    } catch (erro) {
        console.error("Erro ao carregar itens:", erro);

        document.getElementById("items").innerHTML = `
            <p>Não foi possível carregar os itens.</p>
        `;
    }
}

function escaparHTML(valor) {
    return String(valor).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

colocagen_de_item();




