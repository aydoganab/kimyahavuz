let xhr = new XMLHttpRequest();
xhr.open("GET", "###async_server###/service/get-kim101-page-data", true);
xhr.send();
xhr.onload = function () {
    if (xhr.status === 200) {

        let responseObject = JSON.parse(xhr.response);

        if (Object.keys(responseObject.kordinator).length > 0) {
            document.getElementById("kordonem").innerHTML=responseObject.donem_tr
            document.getElementById("korimg").setAttribute("src", "###async_server###/userpics/" + responseObject.kordinator.resim);
            document.getElementById("korname").innerHTML=responseObject.kordinator.name;
            document.getElementById("koremail").setAttribute("href","mailto:"+responseObject.kordinator.eposta);

            document.getElementById("kordinator").classList.remove("d-none");
        }

    }
};