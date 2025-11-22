const loginOptionsCancelContainer = document.getElementById('loginOptionCancelContainer')
const loginOptionMicrosoft = document.getElementById('loginOptionMicrosoft')
const loginOptionMojang = document.getElementById('loginOptionMojang')
const loginOptionsCancelButton = document.getElementById('loginOptionCancelButton')
const loginOptionOffline = document.getElementById('loginOptionOffline') // <--- ADICIONADO

let loginOptionsCancellable = false

let loginOptionsViewOnLoginSuccess
let loginOptionsViewOnLoginCancel
let loginOptionsViewOnCancel
let loginOptionsViewCancelHandler

function loginOptionsCancelEnabled(val){
    if(val){
        $(loginOptionsCancelContainer).show()
    } else {
        $(loginOptionsCancelContainer).hide()
    }
}

loginOptionMicrosoft.onclick = (e) => {

    // DESATIVA MODO OFFLINE QUANDO CLICA MICROSOFT
    if(window.loginSetupOffline) window.loginSetupOffline(false)

    switchView(getCurrentView(), VIEWS.waiting, 500, 500, () => {
        ipcRenderer.send(
            MSFT_OPCODE.OPEN_LOGIN,
            loginOptionsViewOnLoginSuccess,
            loginOptionsViewOnLoginCancel
        )
    })
}

loginOptionMojang.onclick = (e) => {

    // DESATIVA MODO OFFLINE QUANDO CLICA MOJANG
    if(window.loginSetupOffline) window.loginSetupOffline(false)

    switchView(getCurrentView(), VIEWS.login, 500, 500, () => {
        loginViewOnSuccess = loginOptionsViewOnLoginSuccess
        loginViewOnCancel = loginOptionsViewOnLoginCancel
        loginCancelEnabled(true)
    })
}

// NOVO BOTÃO "ENTRAR OFFLINE"
loginOptionOffline.onclick = (e) => {
    switchView(getCurrentView(), VIEWS.login, 500, 500, () => {
        loginViewOnSuccess = loginOptionsViewOnLoginSuccess
        loginViewOnCancel = loginOptionsViewOnLoginCancel
        loginCancelEnabled(true)

        // ATIVA MODO OFFLINE
        if(window.loginSetupOffline) {
            window.loginSetupOffline(true)
        }
    })
}

loginOptionsCancelButton.onclick = (e) => {
    switchView(getCurrentView(), loginOptionsViewOnCancel, 500, 500, () => {
        // Clear login values (Mojang login)
        loginUsername.value = ''
        loginPassword.value = ''

        if(loginOptionsViewCancelHandler != null){
            loginOptionsViewCancelHandler()
            loginOptionsViewCancelHandler = null
        }
    })
}
