//toggle div-donem display
let ders = document.getElementById("ders");
let donem = document.getElementById("donem");
let div_donem = document.getElementById("div-donem");
ders.onchange = function () {
    if (this.value === "kim101" && donem.length > 1) {
        div_donem.classList.remove("d-none");
    } else {
        div_donem.classList.add('d-none');
    }
};

//submit from
let sform = document.getElementById("sform");
let stdno = document.getElementById("stdno");
sform.onsubmit = function (ev) {
    ev.preventDefault();
    ev.stopPropagation();
    let stdno_val = stdno.value;
    if (stdno_val.length == 9) {
        if (this.checkValidity()) {
            let page = ders.value === "kim101" ? "kim101-sonuc" : "kim101el-sonuc";
            if (page == "kim101-sonuc") {
                document.location.href = "./" + page + "/" + donem.value + "/" + stdno_val;
            } else {
                document.location.href = "./" + page + "/" + stdno_val;
            }

        } else {
            this.classList.add("was-validated");
        }
    } else {
        stdno.classList.add("is-invalid");
    }
};

stdno.onkeyup = function () {
    let stdno_val = this.value;
    if (stdno_val.length == 9) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
    } else {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
    }
};

//guncel duyurular
let xhr = new XMLHttpRequest();
xhr.open("GET", "###async_server###/service/guncel-duyurular", true);
xhr.send();
xhr.onload = function () {

    if (xhr.status === 200) {

        let r = JSON.parse(xhr.responseText);


        //duyuru işlemleri
        let data = r.duyuru_data;
        if (data.length > 0) {
            //set bell

            let liyds = document.getElementById("li-yds");
            liyds.setAttribute("title", data.length + " güncel duyuru");
            liyds.classList.remove("d-none");
            document.getElementById("yds").append(document.createTextNode(data.length));

            //populate
            let yds = document.getElementById("yds");
            let ryds = document.getElementById("ryds");

            for (let i = 0; i < data.length; i++) {

                let duyuru = data[i];

                let colDuyuru = document.createElement("div");
                colDuyuru.className = "col-duyuru";

                let duyuruItem = document.createElement("div");
                duyuruItem.className = "duyuru-item";
                let spanDuyuru = document.createElement("span");
                spanDuyuru.className = "span-duyuru";
                spanDuyuru.append(document.createTextNode(duyuru.ilgi));

                let duyuruBody = document.createElement("div");
                duyuruBody.className = "duyuru-body";
                let duyuruP = document.createElement("p");
                duyuruP.className = "duyuru-p";
                duyuruP.append(document.createTextNode(duyuru.baslik));
                let duyuruDate = document.createElement("small");
                duyuruDate.className = "duyuru-date";
                duyuruDate.append(document.createTextNode(duyuru.sd));
                duyuruBody.append(duyuruP);
                duyuruBody.append(duyuruDate);

                let duyuruA = document.createElement("a");
                duyuruA.className = "duyuru-a";
                duyuruA.setAttribute("href", duyuru.url);

                duyuruItem.append(spanDuyuru);
                duyuruItem.append(duyuruBody);
                duyuruItem.append(duyuruA);

                colDuyuru.append(duyuruItem);

                ryds.append(colDuyuru);

                document.getElementById("guncel-duyurular").classList.remove("d-none");

            }
        }

        //kim101
        if (r.kim101_donemler.length > 0) {

            //ders option
            let option = document.createElement("option");
            option.setAttribute("value", "kim101");
            option.append(document.createTextNode("KIM 101/101E"));
            ders.append(option);

            //donemler
            for (let k = 0; k < r.kim101_donemler.length; k++) {
                let donem_data = r.kim101_donemler[k];
                let option = document.createElement("option");
                option.setAttribute("value", donem_data.donem);
                option.append(document.createTextNode(donem_data.donem_formatted_tr));
                donem.append(option);
            }
        }

        //kim101el
        if (r.kim101el_web_yayin > 0) {
            let option = document.createElement("option");
            option.setAttribute("value", "kim101el");
            option.append(document.createTextNode("KIM 101EL"));
            ders.append(option);
        }

        //sınav sonuç ilanı yok
        if (r.kim101_donemler.length > 0 || r.kim101el_web_yayin > 0) {
            document.getElementById("yeswy").classList.remove("d-none");
            document.getElementById("nowy").classList.add("d-none");
        }

    }

};