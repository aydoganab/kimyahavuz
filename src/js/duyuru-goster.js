//get list type
let href = window.location.href.split('/');
let duyuruID = href[href.length - 1].split('.')[0];

let xhr = new XMLHttpRequest();
xhr.onload = function () {
    let r = JSON.parse(xhr.responseText);
    if (r.s) {
        document.getElementById("db").innerHTML = r.baslik;
        document.getElementById("dt").innerHTML = r.tarih;
        document.getElementById("dm").innerHTML = r.dm;
        document.getElementById("do").innerHTML = r.ekleyen;

        //make tables responsive in dm
        let dm = document.getElementById("dm");
        let tables = dm.getElementsByTagName("table");
        for (let i = 0; i < tables.length; i++) {
            tables[i].classList.add("duyuru-table", "table-responsive", "table-bordered");
        }

        //remove table class from figure tags
        let figs = document.getElementsByTagName("figure");
        for (let i = 0; i < figs.length; i++) {
            figs[i].classList.remove("table");
        }

        //ekler
        if (r.ekler.length > 0) {
            let de = document.getElementById("de");
            for (let i = 0; i < r.ekler.length; i++) {
                let ek = r.ekler[i];
                let lnk = document.createElement("a");
                lnk.setAttribute("href", "###async_server###/duyuruek/?" + ek.link);
                lnk.setAttribute("target", "_blank");
                lnk.classList.add("mt-2","text-decoration-none", "d-block");
                lnk.innerHTML=ek.dosya;
                de.append(lnk);
            }
            //set attachment indicator link
            let atHref = window.location.href.split("#");
            atHref = atHref[0] + "#duyuru-ekleri";
            document.getElementById("aattin").setAttribute("href", atHref);
            document.getElementById("attin").classList.remove("d-none");
            //ekleri göster
            document.getElementById("duyuru-ekleri").classList.remove("d-none");
        }

        //duyuruyu göster
        document.getElementById("dcon").classList.remove("d-none");

    }else {
        document.getElementById("dyok").classList.remove("d-none");
    }
};
xhr.open("GET", "###async_server###/service/duyuru-details?id=" + duyuruID, true);
xhr.send();