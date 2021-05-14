let hd = window.location.href.split('/');
let stdno = hd[hd.length - 1];
let donem = hd[hd.length - 2];

let xhr = new XMLHttpRequest();
xhr.open("GET", "###async_server###/service/get-kim101-sonuc?donem=" + donem + "&stdno=" + stdno, true);
xhr.send();
xhr.onload = function () {
    let r = JSON.parse(xhr.responseText);

    //student info
    document.getElementById("sno").innerHTML = r.std.no;
    document.getElementById("sname").innerHTML = r.std.adsoyad;
    document.getElementById("sdil").innerHTML = r.std.dil;
    document.getElementById("scrn").innerHTML = r.std.crn;

    //öğretim üyesi
    if (Object.keys(r.ouy).length > 0){
        let souy = document.getElementById("souy");
        let img = document.createElement("img");
        img.setAttribute("src", "###async_server###/userpics/t_" + r.ouy.resim);
        img.setAttribute("alt", r.ouy.name);
        img.style.maxHeight = "25px";
        img.classList.add("img-fluid", "me-2", "rounded-circle");
        souy.append(img);
        souy.append(document.createTextNode(r.ouy.name));
        let email = document.createElement("a");
        email.setAttribute("href", "mailto:" + r.ouy.eposta);
        email.classList.add("ms-auto", "card-link");
        email.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1.3em" viewBox="0 0 24 24" width="1.3em" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>';
        souy.append(email);
    }


    //sınav yeri bilgileri
    if (Object.keys(r.sinav_yeri).length > 0) {

        document.getElementById("locdonem").innerHTML = r.donem_tr;
        document.getElementById("locsy").innerHTML = r.sinav_yeri.derslik;
        document.getElementById("locgr").innerHTML = r.sinav_yeri.grup;
        document.getElementById("locsn").innerHTML = r.sinav_yeri.sira_no;

        document.getElementById("loc").classList.remove("d-none");
    }

    //sinav notları
    if (r.sinavlar.length > 0) {

        let tbnot = document.getElementById("tbnot");

        for (let s = 0; s < r.sinavlar.length; s++) {
            let sitem = r.sinavlar[s];

            let str = document.createElement("tr");

            let sth = document.createElement("th");
            sth.setAttribute("scope", "col");
            sth.innerHTML = sitem.sinav;

            let snotu = document.createElement("td");
            snotu.innerHTML=sitem.notu;

            let sgort = document.createElement("td");
            sgort.innerHTML=sitem.gort;

            let sdetay = document.createElement("td");
            sdetay.classList.add("text-end");
            let btn = document.createElement("button");
            btn.setAttribute("type", "button");
            btn.setAttribute("data-s", sitem.turu);
            btn.classList.add("btn", "btn-sm", "btn-outline-secondary");
            btn.append(document.createTextNode("Detaylar"));
            sdetay.append(btn);

            str.append(sth, snotu, sgort, sdetay);

            tbnot.append(str);
        }

        //show sinavlar card
        document.getElementById("osnCon").classList.remove("d-none");
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