let xhr = new XMLHttpRequest();
xhr.open("GET", "###async_server###/service/get-kim101-page-data", true);
xhr.send();
xhr.onload = function () {
    let responseObject = JSON.parse(xhr.responseText);

    //ders kitabı
    document.getElementById("text_book").innerHTML = responseObject.sp.text_book;
    document.getElementById("sup_book").innerHTML = responseObject.sp.sup_book;

    //program
    let ptb = document.getElementById("ptb");

    for (let i = 0; i < responseObject.p.length; i++) {
        let pr = responseObject.p[i];

        let tr = document.createElement("tr");

        let th = document.createElement("th");
        th.setAttribute("scope", "col");
        th.innerHTML = pr.hafta;

        let td = document.createElement("td");
        td.innerHTML = pr.tarih;

        let td2 = document.createElement("td");
        td2.innerHTML = pr.topics;

        tr.append(th, td, td2);

        ptb.append(tr);

    }

    document.getElementById("conk").classList.remove("d-none");

};