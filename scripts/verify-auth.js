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

function signOut(){
    try {
        sessionStorage.removeItem(tokenName)
        window.location.href = 'index.html';
    }
    catch (err) {
        console.error('Não foi possível pegar o token: ' + err)
    }
}

function userAcceptsCookies(run=false){
    if(!run) return
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

userAcceptsCookies()
verifyAuth()
