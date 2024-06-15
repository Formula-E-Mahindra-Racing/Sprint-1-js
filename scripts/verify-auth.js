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

verifyAuth()
