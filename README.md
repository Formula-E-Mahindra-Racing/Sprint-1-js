# Sprint 1 Web Development

## Integrantes 👋
<ul>
    <li>Gabriel Barros (RM556309)</li>  
    <li>João Marcelo Furtado Romero (RM555199)</li>
    <li>Kayky Silva Stiliano (RM555148)</li>
    <li>Pedro Henrique Bizzo de Santana (RM557263)</li>
    <li>Pedro Henrique Mendes (RM555332)</li>
</ul>

## Explicando o Código

Para o arquivo `login.js` dentro de `scripts/` teremos algumas funções essenciais para fazer essa autenticação mocada inicial

```js
// Declarando variáveis para os nossos nodes no `DOM` e outras constantes
//como o SALT, email correto etc.
const emailInput = document.querySelector('input[type="email"]')
const passInput = document.querySelector('input[type="password"]')
const errorMsg = document.querySelector('.error-msg')

const SALT = '!woieq90u12340193uwqdhionfb;'

const correctEmail = 'email@email.email'
const correctPass = '123' + SALT


const helpEmail = document.querySelector('.help-email')
const helpPass = document.querySelector('.help-pass')

const tokenName = '@MahindraCoins:token'
```

Essa função vai limpar o campo de mensagem de erro do nosso formulário

```js
function focusInput() {
    errorMsg.textContent = ''
}
```

Essa função irá pegar os valores dos inputs atuais e comparar com o email correto e senha com SALT.
<br>
o SALT é um método de deixar a senha do usuário mais segura, mas pra isso sempre precisaremos fazer a comparação com o mesmo.


Logo se não estiver correto nós removemos o token de autenticação caso o usuário o tivesse, escrevemos nossa mensagem de erro 
e retornamos `false`, se o usuário fosse autenticado retorna `true` o motivo se encontra ao chamarmos essa função mais pra frente em nosso código.

```js
function sendForm() {
    if (emailInput.value === correctEmail && passInput.value + SALT === correctPass) return true

    try {
        sessionStorage.removeItem(tokenName)
    } catch (err) {
        console.error('Não foi possível deletar token: ' + err)
    }

    errorMsg.textContent = 'Usuário inválido!'
    return false
}
```

Essa função irá verificar para ver se o token existe no session storage do usuário (um dos locais de memória do browser que temos acesso),
se existe, significa que o usuário já foi autenticado então iremos o redirecionar para a página de conteúdo.

```js
function isAlreadyLogged() {
    try {
        const token = sessionStorage.getItem(tokenName)
        if (token) window.location.href = 'content.html'
    } catch (err) {
        console.error('Não foi possível pegar token: ' + err)
    }
}
```

Essa função existe somente para nos ajudar a escrever na tela de login um email e senha para que os usuários entrem como convidados.

```js
function printCorrectUser(email, pass) {
    const passWithoutSalt = `${pass[0]}${pass[1]}${pass[2]}`
    helpEmail.textContent += email
    helpPass.textContent += passWithoutSalt
}

```

Nessa função temos uma variável em um nível acima para que tenhamos essa mudança "definitiva" no decorrer da aplicação.

Aqui é somente para o usuário conseguir ver a senha que digita, mudaremos o tipo do input para isso e mudaremos o ícone ao lado desse mesmo input.

```js
let seePasswordFlag = false
const eye = document.querySelector('.see-password')

function seePassword() {
    seePasswordFlag = !seePasswordFlag

    if (seePasswordFlag) {
        passInput.type = 'text'
        eye.src = 'assets/icons/icon-eye.png'
    } else {
        passInput.type = 'password'
        eye.src = 'assets/icons/icon-eye-off.png'
    }
}

```

Aqui, nós colocamos um evento de `click` no nosso botão de enviar o formulário da página de login quando o conteúdo do `DOM` é carregado.

Chamaremos nossa função `sendForm` declarada anteriormente, se o retorno for falso, simplesmente não fazemos nada, pois significa que o usuário não consegui autenticar.
Porém se retorna verdadeiro, o direcionamos para a página de conteúdo.

```js
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('.send').addEventListener('click', () => {
        if (!sendForm()) return
        try {
            sessionStorage.setItem(tokenName, '0')
            window.location.href = 'content.html'
        } catch (err) {
            console.error('Não foi possível setar token: ' + err)
        }
    })
})

printCorrectUser(correctEmail, correctPass)

isAlreadyLogged()

alert("Seja bem vindo ao site oficial da Mahindra Coins")
```

<hr>

Para o arquivo `verify-auth.js` dentro de `scripts/` teremos algumas funções para verificar se o usuário continua autenticado.


Essa função verifica se o token existe, se ele não existe nós simplesmente o direcionaremos para a página de login.
Muito útil quando o usuário quer acessar uma página sem ter passado pela autenticação.
```js
const tokenName = '@MahindraCoins:token'

function verifyAuth() {
    try {
        const token = sessionStorage.getItem(tokenName)
        if (!token) return window.location.href = 'index.html';
    }
    catch (err) {
        console.error('Não foi possível pegar o token: ' + err)
    }
}
```

Essa função está atrelada ao clique de um botão `sign-out` diretamente no `content.html`.

Irá remover o token do usuário e redirecioná-lo para a página de login

```js
function signOut(){
    try {
        sessionStorage.removeItem(tokenName)
        window.location.href = 'index.html';
    }
    catch (err) {
        console.error('Não foi possível pegar o token: ' + err)
    }
}

```

Essa função simula o aceitar de cookies no sites. Perguntamos ao usuário através do método `prompt` e somente aceitamos
's' ou 'n' como resposta como evidenciado no `while loop` se o usuário não aceitar nós o redirecionamos para a página de login,
mas se o usuário aceitar o deixamos continuar na página de conteúdo.
```js
function userAcceptsCookies(){
    const didAcceptCookie = prompt('Gostaria que suas informações sejam salvas através do sistema de cookies? (s/n)')

    while (didAcceptCookie !== 's' && didAcceptCookie !== 'n'){
        alert('Por favor, responder com somente (s/n)')
        return userAcceptsCookies()
    }

    if(didAcceptCookie === 'n') {
        sessionStorage.removeItem(tokenName)
        window.location.href = 'index.html';
    }else{
        alert('Obrigado')
    }
}
```

<hr>

No arquivo `hamburger-menu.js` que se econtra em `scripts/` está todo o código ligado ao toggle do hamburger-menu para a versão mobile da aplicação.


Aqui, pegamos os elementos diretos do `DOM` que, nesse caso, respectivamente, são o ícone e o conteúdo em si.

Utilizamos um método `classList.toggle()` que irá em um elemento, tirar a classe se ela se encontra ou adicioná-la se não se econtra em tal elemento.
Essa classe não contém nada além de um `display: none` fazendo assim nosso conteúdo e ícone aparecerem e desaparecerem de acordo.

```js
const hamburgerIcon = document.querySelector('.hamburger-menu')
const hamburgerContent = document.querySelector('.hamburger-menu-tela')

function hamburgerMenu() {
    hamburgerContent.classList.toggle('no-show')
    hamburgerIcon.classList.toggle('no-show')
}
```

<hr>


No arquivo `add-to-cart.js` que se econtra em `scripts/` está todo o código relacionado ao adicionar compras ao carrinho.  


Primeiramente, nós declaramos o nome da `chave` do `session storage` que queremos trabalhar com.
<br>
Logo, pegamos o elemento que irá destacar quantos items temos na lista.
<br>
Em seguida, verificamos se já existe um valor no session storage que guardamos quantos items tem no carrinho.
Se não existir significa que temos nenhum item no carrinho e logo adicionamos 0 ao valor a ser visto para os nossos usuários.
Isso tudo ao entrar na página.


Dentro da função, iremos fazer o trabalho de um contador, toda vez que o usuário clica no botão para adicionar ao carrinho nosso contador aumenta, evidenciando uma adição que irá ser atualizada logo em seguida a cada chamada de função (ou seja a cada clique)



```js
const cartSessionName = '@MahindraCoins:cart'

const cartCounter = document.querySelector('header>nav>div>figure>small')

let totalAmountOfMCsNeeded = sessionStorage.getItem(cartSessionName)
if(!totalAmountOfMCsNeeded) totalAmountOfMCsNeeded = 0
cartCounter.textContent = totalAmountOfMCsNeeded 

function addToCart() {
    totalAmountOfMCsNeeded++
    sessionStorage.setItem(cartSessionName, totalAmountOfMCsNeeded)

    cartCounter.textContent = totalAmountOfMCsNeeded 
}
```


<hr>


Por fim, no arquivo `slider.js` que se econtra em `scripts/` se encontra toda a lógica dedicada para a funcionalidade do slider no website.


Pegamos alguns elementos do `DOM` e declaramos o index atual do slider. 


```js
const images = document.querySelectorAll('.slide');
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');
let currentIndex = 0;
```

Aqui, simplesmente passamos o index do slide atual como parâmetro para nossa função e fazemos o toggle de uma classe chamada `active`.

Igual anteriormente, com a diferença que faremos essa verificação num array de elementos declarado anteriormente (os slides em si).
Então mostrando o próximo slide através dessa classe e escondendo o restante, vendo então somente um slide por vez.

```js
function showImage(index) {
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}
```

Aqui, um evento é adicionado para a flecha da esquerda que simboliza o usuário querer ver o próxima slide da esquerda. 

Nesse caso, verificamos se o index atual é maior que zero, se for simplesmente diminuimos 1 index como esperado, caso contrário significa que o usuário
está no primeiro slide, então iremos devolver o último index para dar essa impressão que de slides infinitos.

```js
leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    showImage(currentIndex);
});
```

Aqui é a mesma lógica, verificaremos se o index não é o último, nesse caso, iremos adicionar e ir para direita, caso contrário, voltaremos para o começo (index 0) 

```js
rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    showImage(currentIndex);
});

// Iniciando para começar com alguma imagem, no nosso caso, a imagem "zero"
showImage(currentIndex);
```
