let hd = window.location.href.split('/');
let stdno = hd[hd.length - 1];
let donem = hd[hd.length - 2];

let xhr = new XMLHttpRequest();
xhr.open("GET", "###async_server###/service/get-kim101-sonuc?donem=" + donem + "&stdno=" + stdno, true);
xhr.send();
xhr.onload = function () {
    let r = JSON.parse(xhr.responseText);

    //student info
    let s = r.student;
    document.getElementById("sno").innerHTML = s.no;
    document.getElementById("sname").innerHTML = s.adsoyad;
    document.getElementById("sdil").innerHTML = s.dil;
    document.getElementById("scrn").innerHTML = s.crn;

    let ouy = document.getElementById("souy");
    let img = document.createElement("img");
    img.setAttribute("src", "###async_server###/userpics/t_" + s.resim);
    img.setAttribute("alt", s.ouyname);
    img.style.maxHeight = "25px";
    img.classList.add("img-fluid", "me-2", "rounded-circle");
    ouy.append(img);
    ouy.append(document.createTextNode(s.ouyname));
    let email = document.createElement("a");
    email.setAttribute("href", "mailto:" + s.eposta);
    email.classList.add("ms-auto", "card-link");
    email.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1.3em" viewBox="0 0 24 24" width="1.3em" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>';
    ouy.append(email);

    //sınav yeri bilgileri
    if (s.sinav_yeri != "") {

        document.getElementById("locdonem").innerHTML = r.donem_tr;
        document.getElementById("locsy").innerHTML = s.sinav_yeri;
        document.getElementById("locgr").innerHTML = s.grup;
        document.getElementById("locsn").innerHTML = s.derslik_sira_no;

        document.getElementById("loc").classList.remove("d-none");
    }

    let osnCon = document.getElementById("osn-con");

    //ödev notları
    if (r.sd.odev_sayisi > 0) {

        for (let i = 1; i <= r.sd.odev_sayisi; i++) {

            let div1 = document.createElement("div");
            div1.classList.add("row", "align-items-center", "mb-3", "gx-3");

            let div2 = document.createElement("div");
            div2.classList.add("col", "fw-bold");
            div2.append(document.createTextNode("Ödev " + i));

            let div3 = document.createElement("div");
            div3.classList.add("col");
            div3.innerHTML = eval("s.o" + i);

            let div3_2 = document.createElement("div");
            div3_2.classList.add("col");

            let div4 = document.createElement("div");
            div4.classList.add("col-auto");

            let btn = document.createElement("button");
            btn.setAttribute("type", "button");
            btn.setAttribute("data-s", "o" + i);
            btn.setAttribute("title", "Ödev " + i + " detayları");
            btn.classList.add("btn", "btn-xs", "btn-outline-secondary", "rounded-pill", "btn-odev-detay");
            btn.innerHTML = "Detaylar";
            div4.append(btn);

            div1.append(div2, div3, div3_2, div4);
            osnCon.append(div1);

        }

    }

    //arasınav notları
    if (r.sd.as_sayisi > 0) {

        for (let i = 1; i <= r.sd.as_sayisi; i++) {

            let div1 = document.createElement("div");
            div1.classList.add("row", "align-items-center", "mb-3", "gx-3");

            let div2 = document.createElement("div");
            div2.classList.add("col", "fw-bold");
            div2.append(document.createTextNode("Arasınav " + i));

            let div3 = document.createElement("div");
            div3.classList.add("col");
            div3.innerHTML = eval("s.as" + i + "s1");

            let div3_2 = document.createElement("div");
            div3_2.classList.add("col");

            let div4 = document.createElement("div");
            div4.classList.add("col-auto");

            let btn = document.createElement("button");
            btn.setAttribute("type", "button");
            btn.setAttribute("data-s", "as" + i);
            btn.setAttribute("title", "Ara sınav " + i + " detayları");
            btn.classList.add("btn", "btn-xs", "btn-outline-secondary", "rounded-pill", "btn-odev-detay");
            btn.innerHTML = "Detaylar";
            div4.append(btn);

            div1.append(div2, div3, div3_2, div4);
            osnCon.append(div1);

        }

    }

    //final sınavı notu
    let div1 = document.createElement("div");
    div1.classList.add("row", "align-items-center", "mb-3", "gx-3");

    let div2 = document.createElement("div");
    div2.classList.add("col", "fw-bold");
    div2.append(document.createTextNode("Final sınavı "));

    let div3 = document.createElement("div");
    div3.classList.add("col");
    div3.innerHTML = s.fss1;

    let div3_2 = document.createElement("div");
    div3_2.classList.add("col");

    let div4 = document.createElement("div");
    div4.classList.add("col-auto");

    let btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("data-s", "fs");
    btn.setAttribute("title", "Final sınavı detayları");
    btn.classList.add("btn", "btn-xs", "btn-outline-secondary", "rounded-pill", "btn-odev-detay");
    btn.innerHTML = "Detaylar";
    div4.append(btn);

    div1.append(div2, div3, div3_2, div4);
    osnCon.append(div1);

    //show sinavlar card
    document.getElementById("osn").classList.remove("d-none");

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