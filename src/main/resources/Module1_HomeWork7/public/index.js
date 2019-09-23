const apiGET = url => {
    return new Promise((reselve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => {
            const response = JSON.parse(xhr.responseText);
            reselve(response);
        }
        xhr.onerror = () => {
            const err = JSON.parse(xhr.responseText);;
            reject(err)
        }
        xhr.send()
    });
}

const apiPOST = (url, body) => {
    return new Promise((reselve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = () => {
            const response = JSON.parse(xhr.responseText);
            reselve(response);
        }
        xhr.onerror = () => {
            const err = JSON.parse(xhr.responseText);;
            reject(err)
        }
        xhr.send(JSON.stringify(body))
    });
}

const apiGETByParams = (url, param) => {
    return apiGET(`${url}/${param}`)
}

//////////////////////////// using api methods //////////////////////////

apiGET('/users').then(reselve => {
    console.log(reselve)
});

apiPOST('/users', {name: 'adsads', surname: 'asdasd'}).then(reselve => {
    console.log(reselve)
});

apiGETByParams('/users', 'petya').then(reselve => {
    console.log(reselve)
});