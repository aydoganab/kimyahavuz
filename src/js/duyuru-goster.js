//get list type
let a = window.location.href.split('/');
let b = a[a.length - 1].split('.')[0];

let xhr = new XMLHttpRequest();
xhr.onload = function () {
    let r = JSON.parse(xhr.responseText);
    if (r.s) {

        let baslik = document.createElement("h4");
        baslik.className = "text-dark";
        baslik.append(document.createTextNode(r.baslik));

        let tarih = document.createElement("h6");
        tarih.className="py-2";
        tarih.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon" height="1em" viewBox="0 0 24 24" width="1em" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>';
        tarih.append(document.createTextNode(r.tarih));

        let metin = document.createElement("div");
        metin.classList.add("p-3", "border", "shadow-sm", "rounded");
        metin.innerHTML = r.dm;

        let elem = document.getElementById("dc");
        dc.append(baslik);
        dc.append(tarih);
        dc.append(metin);

    }
};
xhr.open("GET", "###async_server###/service/duyuru-details?id=" + b, true);
xhr.send();