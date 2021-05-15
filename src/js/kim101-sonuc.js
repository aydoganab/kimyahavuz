let hd = window.location.href.split('/');
let stdno = hd[hd.length - 1];
let donem = hd[hd.length - 2];

let xhr = new XMLHttpRequest();
xhr.open("GET", "###async_server###/service/get-kim101-sonuc?donem=" + donem + "&stdno=" + stdno, true);
xhr.send();
xhr.onload = function () {
    let responseObject = JSON.parse(xhr.responseText);

    //student info
    document.getElementById("sno").innerHTML = responseObject.std.no;
    document.getElementById("sname").innerHTML = responseObject.std.adsoyad;
    document.getElementById("sdil").innerHTML = responseObject.std.dil;
    document.getElementById("scrn").innerHTML = responseObject.std.crn;

    //öğretim üyesi
    if (Object.keys(responseObject.ouy).length > 0){
        let souy = document.getElementById("souy");
        let img = document.createElement("img");
        img.setAttribute("src", "###async_server###/userpics/t_" + responseObject.ouy.resim);
        img.setAttribute("alt", responseObject.ouy.name);
        img.style.maxHeight = "25px";
        img.classList.add("img-fluid", "me-2", "rounded-circle");
        souy.append(img);
        souy.append(document.createTextNode(responseObject.ouy.name));
        let email = document.createElement("a");
        email.setAttribute("href", "mailto:" + responseObject.ouy.eposta);
        email.classList.add("ms-auto", "card-link");
        email.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1.3em" viewBox="0 0 24 24" width="1.3em" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>';
        souy.append(email);
    }

    //sınav yeri bilgileri
    if (Object.keys(responseObject.sinav_yeri).length > 0) {

        document.getElementById("locdonem").innerHTML = responseObject.donem_tr;
        document.getElementById("locsy").innerHTML = responseObject.sinav_yeri.derslik;
        document.getElementById("locgr").innerHTML = responseObject.sinav_yeri.grup;
        document.getElementById("locsn").innerHTML = responseObject.sinav_yeri.sira_no;

        document.getElementById("loc").classList.remove("d-none");
    }

    //sinav notları
    if (responseObject.sinavlar.length > 0) {

        let tbnot = document.getElementById("tbnot");

        for (let s = 0; s < responseObject.sinavlar.length; s++) {
            let sitem = responseObject.sinavlar[s];

            let str = document.createElement("tr");

            let sth = document.createElement("th");
            sth.setAttribute("scope", "col");
            sth.innerHTML = sitem.sinav;

            let snotu = document.createElement("td");
            snotu.innerHTML=sitem.notu;

            let sgort = document.createElement("td");
            if(sitem.hasOwnProperty("sinav_ort")){
                sgort.innerHTML=sitem.sinav_ort;
            }

            let sdetay = document.createElement("td");
            sdetay.classList.add("text-end");
            if (sitem.hasOwnProperty("detay")) {
                let btn = document.createElement("button");
                btn.setAttribute("type", "button");
                btn.setAttribute("data-s", sitem.turu);
                btn.classList.add("btn", "btn-sm", "btn-outline-secondary", "btn-odev-detay");
                btn.append(document.createTextNode("Detaylar"));
                sdetay.append(btn);
            }

            str.append(sth, snotu, sgort, sdetay);

            tbnot.append(str);
        }

        //show sinavlar card
        document.getElementById("osnCon").classList.remove("d-none");
    }

    //genel ortalama ve notlar
    if (responseObject.grades.length > 0) {

        let cbGort = document.getElementById("cbgort");

        for (let g = 0; g < responseObject.grades.length; g++) {

            let grade = responseObject.grades[g];

            let rowGort = document.createElement("div");
            rowGort.classList.add("row", "gx-3", "mb-3", "align-items-center");

            let colInfo = document.createElement("div");
            colInfo.classList.add("col", "fw-bold")
            colInfo.innerHTML=grade.inf;

            let colGort = document.createElement("div");
            colGort.classList.add("col");
            colGort.innerHTML=grade.ort;

            let colGrade = document.createElement("div");
            colGrade.classList.add("col", "fw-bold", "ms-auto");
            colGrade.innerHTML = "Notu";

            let colNot = document.createElement("div");
            colNot.classList.add("col");
            colNot.innerHTML=grade.grade;

            rowGort.append(colInfo, colGort, colGrade, colNot);
            cbGort.append(rowGort);
        }

        document.getElementById("gort").classList.remove("d-none");

    }

    //harfli not aralıkları
    if (responseObject.harfli.length > 0) {

        let tbHarfli = document.getElementById("tbharfli");

        for (let h = 0; h < responseObject.harfli.length; h++) {
            let elemHarfli = responseObject.harfli[h];

            let trHarfli=document.createElement("tr");

            let thHarfli=document.createElement("th");
            thHarfli.setAttribute("scope", "col");
            thHarfli.innerHTML = elemHarfli.grade;

            let tdHarfli = document.createElement("td");
            tdHarfli.innerHTML=elemHarfli.ul+"&mdash;"+elemHarfli.al;

            trHarfli.append(thHarfli, tdHarfli);
            tbHarfli.append(trHarfli);
        }

        document.getElementById("harfli").classList.remove("d-none");

    }

    //detaylar on click
    let db = document.querySelectorAll(".btn-odev-detay");
    Array.from(db).forEach(btn => {
        btn.addEventListener('click', function (event) {
            let sinav = this.getAttribute("data-s");
            let xhr2 = new XMLHttpRequest();
            xhr2.open("GET", "###async_server###/service/get-kim101-ayva-detay?donem=" + donem + "&stdno=" + stdno + "&sinav=" + sinav, true);
            xhr2.send();
        });
    });
};