const emailInput = document.querySelector('input[type="email"]')
const passInput = document.querySelector('input[type="password"]')
const errorMsg = document.querySelector('.error-msg')

const correctEmail = 'email@email.email'
const correctPass = '123'

const helpEmail = document.querySelector('.help-email')
const helpPass = document.querySelector('.help-pass')

const tokenName = '@MahindraCoins:token'

function focusInput() {
    errorMsg.textContent = ''
}

function sendForm() {
    if (emailInput.value === correctEmail && passInput.value === correctPass) return true

    try {
        sessionStorage.removeItem(tokenName)
    } catch (err) {
        console.error('Não foi possível deletar token: ' + err)
    }

    errorMsg.textContent = 'Usuário inválido!'
    return false
}

function isAlreadyLogged() {
    try {
        const token = sessionStorage.getItem(tokenName)
        if (token) window.location.href = 'content.html'
    } catch (err) {
        console.error('Não foi possível pegar token: ' + err)
    }
}

function printCorrectUser(email, pass) {
    helpEmail.textContent += email
    helpPass.textContent += pass
}

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


