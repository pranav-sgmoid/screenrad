const postMessage = e => {

    e.preventDefault()

    const form = document.getElementById('form')
    const data = new FormData(form)

    const url = 'https://asia-south1-amar-250808.cloudfunctions.net/screenradGateway'

    axios.options(url).then(() => {
        axios.post(url, data).then(res => {
            const report = document.getElementById('report')
            report.style.visibility = 'visible';

            const data = res.data

            document.getElementById('referable').innerText = data['Referable'] || ''

            document.getElementById('medicalImage').innerText = data['Usable fundus image'] || ''

            document.getElementById('imageQuality').innerText = data['Quality'] || ''

            document.getElementById('imageQualityReason').innerText = data['Poor quality reason'] || ''

            document.getElementById('dr').innerText = data['Diabetic Retinopathy'] || ''

            document.getElementById('drGrade').innerText = data['Diabetic Retinopathy grade'] || ''

            document.getElementById('drConfidence').innerText = data['Diabetic Retinopathy confidence'] || ''

            document.getElementById('dme').innerText = data['DME'] || ''



            const spinner = document.getElementById('spinner')
            spinner.style.visibility = 'hidden'
        }).catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })
}

const validateForm = () => {
    // check if the username has @lvpei.org
    return true
}


submitButton = document.getElementById('submit')
submitButton.addEventListener('click', (e) => {
    if (validateForm()) {
        const report = document.getElementById('report')
        report.style.visibility = 'hidden'
        const spinner = document.getElementById('spinner')
        spinner.style.visibility = 'visible'
        postMessage(e)
    }
})
