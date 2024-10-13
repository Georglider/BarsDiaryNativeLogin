if (window.location.pathname.includes('auth')) {
    const gosuslugiSection = document.getElementsByClassName("gosuslugi")[0]?.parentElement?.parentNode
    const form = document.createElement("form")
    form.style.backgroundColor = 'white'
    form.style.padding = '10px'
    form.style.color = 'black'
    form.style.display = 'grid'
    form.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))'
    form.style.gap = '4px'
    
    var loginLabel = document.createElement('label')
    loginLabel.textContent = 'Логин'
    loginLabel.setAttribute('for', 'login')
    var loginInput = document.createElement('input')
    loginInput.placeholder = 'Введите логин'
    loginInput.setAttribute('id', 'login')
    
    var passwordLabel = document.createElement('label')
    passwordLabel.textContent = 'Пароль'
    passwordLabel.setAttribute('for', 'pwd')
    var passwordInput = document.createElement('input')
    passwordInput.placeholder = 'Введите пароль'
    passwordInput.setAttribute('id', 'pwd')
    passwordInput.type = 'password'
    
    form.append(loginLabel, loginInput)
    form.append(passwordLabel, passwordInput)
    
    const button = document.createElement('button')
    button.textContent = 'Осуществить вход используя данные (расширение)'
    button.style.gridColumn = 'span 2 / span 2'
    
    form.append(button)
    if (gosuslugiSection) {
        gosuslugiSection.parentElement.insertBefore(form, gosuslugiSection)
    } else {
        alert('Расширению не удалось стандартный вариант входа. Нажмите 2 раза на элемент для его скрытия')
        form.style.position = 'fixed'
        form.style.left = '20px'
        form.style.top = '20px'
        var lastClickDate = 0
        form.ondblclick = (evt) => {
            if (evt.timeStamp - lastClickDate < 2750) {
                form.style.display = 'none'
            }
            lastClickDate = evt.timeStamp
        }
    }
    form.onsubmit = (evt) => {
        evt.preventDefault();
        const formdata = new FormData();
        formdata.append("login", loginInput.value);
        formdata.append("password", passwordInput.value);
        fetch('/rest/login', {
            method: "POST",
            body: formdata,
            redirect: "follow"
        }).then((resp) => resp.json()).then((json) => {
            console.log(json)
            if (!json.success) return Promise.reject()
            alert('Вход успешно выполнен!')
            window.location.href = window.location.origin
            return Promise.resolve()
        }).catch((err) => {
            console.log(err)
            alert('Вход не выполнен!')
        })
    }
}