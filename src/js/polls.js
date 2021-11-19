import '../css/polls.scss'

const forms = document.querySelectorAll('form')

forms.forEach(form => {
    const submitButton = form.querySelector('.main_sumbit-button')

    form.addEventListener('change', e => {
        e.preventDefault()
        submitButton.disabled = false
        submitButton.addEventListener('click', e => {
            e.preventDefault()
        })
    })
})
