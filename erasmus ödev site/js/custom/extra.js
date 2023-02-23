
function register() {
    var kullanici = {
        mail: document.getElementById("inputMail").value,
        password: document.getElementById("inputPassword").value
    };

    var passwordConfirmation = document.getElementById("inputPasswordConfirmation").value;

    var yazi = document.getElementById("sonuc");
    var userListJson = sessionStorage.getItem("userList");
    if (!userListJson)
        userListJson = "[]";

    var userList = JSON.parse(userListJson);

    if (userList.filter(p => p.mail == kullanici.mail).length > 0) {
        alert("Bu Mail ile Zaten Kayıt Oluşturuldu");
        return;
    }


    if (kullanici.password == passwordConfirmation) {
        yazi.innerHTML = "Hesap Oluşturuldu, giriş sayfasına yönlendiriliyorsunuz.";
        yazi.style.color = "green";

        userList.push(kullanici);

        sessionStorage.setItem("userList", JSON.stringify(userList));

        setTimeout(() => {
            window.location.href = "signIn.html";
        }, 2500);
    }
    else {
        yazi.innerHTML = "Şİfreler Eşleşmiyor";
        yazi.style.color = "red";
    }
}


function getCountries() {
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "key i buraya yaz");

    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function getCities(countryCode) {
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "key i buraya yaz");

    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    var endpoint = "https://api.countrystatecity.in/v1/countries/" + countryCode + "/cities";

    fetch(endpoint, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}



// var kullanici = sessionStorage.getItem("user");

// kullanici = kullanici.split(",");

function hideItemsByClassName(classname) {
    var divsToHide = document.getElementsByClassName(classname);
    for (var i = 0; i < divsToHide.length; i++) {
        divsToHide[i].style.display = "none";
    }
}

function showItemsByClassName(classname) {
    var divsToHide = document.getElementsByClassName(classname);
    for (var i = 0; i < divsToHide.length; i++) {
        divsToHide[i].style.display = "block";
    }
}

function login() {
    var userListJson = sessionStorage.getItem("userList");
    if (!userListJson)
        userListJson = "[]";

    var userList = JSON.parse(userListJson);

    var mail = document.getElementById("floatingInput").value;
    var sifre = document.getElementById("floatingPassword").value;

    var yazi = document.getElementById("sonuc");
    console.log(userList)
    var user = userList.filter(p => p.mail == mail && p.password == sifre);
    console.log(user);

    if (user.length > 0) {
        yazi.innerHTML = "Giris bilgileri doğru, giriş sayfasına yönlendiriliyorsunuz... ";
        yazi.style.color = "green";
        sessionStorage.setItem("isLogin", true);

        // document.getElementById("header_sag").innerHTML = "kullanici: " + user[0].mail;


        setTimeout(() => {
            window.location.href = "index.html";
        }, 2500);
    }
    else {
        yazi.innerHTML = "Girilen bilgiler hatalı!";
        yazi.style.color = "red";
    }


}

function checkLogin() {
    var isLoggedIn = sessionStorage.getItem("isLogin");
    console.log(isLoggedIn);

    if (!isLoggedIn) {
        hideItemsByClassName("LoggedOut");
        showItemsByClassName("LoggedIn");
        if (location.href.includes("app.html")) {
            // location.href="signIn.html"
            document.getElementById("sendForm").disabled = true;
        }
    }
    else {
        hideItemsByClassName("LoggedIn");
        showItemsByClassName("LoggedOut");

    }
}


function logout() {
    sessionStorage.removeItem("isLogin");
    location.href = "signIn.html";
}


document.body.onload = function () {
    checkLogin();

}

function countryChange() {
    var countryCode = document.getElementById("country").value;
    fillCitieByCountry(countryCode);
    console.log(countryCode);
}

function fillCitieByCountry(countryCode) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8935f8e637msh5a483b3f97924c2p1f5791jsn3434f0b94c27',
            'X-RapidAPI-Host': 'countries-cities.p.rapidapi.com'
        }
    };

    fetch('https://countries-cities.p.rapidapi.com/location/country/' + countryCode + '/city/list', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    document.getElementById("il").innerHTML = "";
}