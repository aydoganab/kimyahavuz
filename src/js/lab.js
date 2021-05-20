let xhr = new XMLHttpRequest();
xhr.open("GET", "###async_server###/service/get-kim101el-calendar", true);
xhr.send();
xhr.onload = function () {
    let responseObject = JSON.parse(xhr.responseText);

    let thSes = document.getElementById("thSes");
    thSes.classList.add("text-center");
    thSes.setAttribute("colspan", responseObject.days.length);

    let trTH = document.getElementById("trTH");

    Array.from(responseObject.days).forEach(gun => {
        let th = document.createElement("th");
        th.innerHTML = gun;
        trTH.append(th);
    });

    let tbSes = document.getElementById("tbSes");
    Array.from(responseObject.calendar).forEach(tarihler => {
        let tr = document.createElement("tr");
        Array.from(tarihler).forEach(tarih => {
            let td = document.createElement("td");
            td.innerHTML = tarih;
            tr.append(td);
        });
        tbSes.append(tr);
    });

    if (Object.keys(responseObject.kordinator).length > 0) {
        document.getElementById("kordonem").innerHTML=responseObject.donem_tr
        document.getElementById("korimg").setAttribute("src", "###async_server###/userpics/" + responseObject.kordinator.resim);
        document.getElementById("korname").innerHTML=responseObject.kordinator.name;
        document.getElementById("koremail").setAttribute("href","mailto:"+responseObject.kordinator.eposta);

        document.getElementById("kordinator").classList.remove("d-none");
    }

};