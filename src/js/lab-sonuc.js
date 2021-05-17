function kh_getElement(id) {
    return document.getElementById(id);
}

function kh_createElement(elem){
    return document.createElement(elem);
}

let hd = window.location.href.split('/');
let stdno = hd[hd.length - 1];

let xhr = new XMLHttpRequest();
xhr.open("GET", "###async_server###/service/get-kim101el-sonuc?stdno=" + stdno, true);
xhr.send();
xhr.onload = function () {
    let responseObject = JSON.parse(xhr.responseText);

    if (responseObject.s == 2) {

        //öğrenci
        kh_getElement("siNo").innerHTML = responseObject.std.no;
        kh_getElement("siName").innerHTML = responseObject.std.name;
        kh_getElement("siCrn").innerHTML = responseObject.std.crn;
        let siImg=kh_getElement("siImg");
        siImg.setAttribute("src","###async_server###/userpics/"+responseObject.std.facimg);
        siImg.setAttribute("alt", responseObject.std.facname);
        kh_getElement("siOuy").innerHTML=responseObject.std.facname;
        kh_getElement("siEmail").setAttribute("href", "mailto:" + responseObject.std.facemail);

        //lab
        kh_getElement("liLab").innerHTML = responseObject.std.lab;
        kh_getElement("liDay").innerHTML = responseObject.std.gun;
        kh_getElement("liHours").innerHTML = responseObject.std.saat;

        //experiment and grades
        Array.from(responseObject.cal).forEach(calItem => {
            let tr = kh_createElement("tr");

            let td1 = kh_createElement("th");
            td1.setAttribute("scope", "col");
            td1.className = "text-center";
            td1.innerHTML = calItem.week;
            let td2 = kh_createElement("td");
            td2.innerHTML = calItem.date;
            let td3 = kh_createElement("td");
            td3.className = "text-center";
            td3.innerHTML = calItem.expno;
            let td4 = kh_createElement("td");
            td4.innerHTML = calItem.exp;
            let td5 = kh_createElement("td");
            td5.className = "text-center";
            td5.innerHTML = calItem.expgrade;

            tr.append(td1, td2, td3, td4, td5);

            kh_getElement("egTB").append(tr);
        });

        //safety quiz
        let trq = kh_createElement("tr");
        let thq = kh_createElement("th");
        thq.setAttribute("colspan", "4");
        thq.classList.add("text-end");
        thq.innerHTML = "Safety Quiz";
        let tdq=kh_createElement("td");
        tdq.className = "text-center";
        tdq.innerHTML=responseObject.std.quiz;
        trq.append(thq, tdq);
        kh_getElement("egTB").append(trq);

        //asistanlar
        Array.from(responseObject.ast).forEach(ast => {

            let td1 = kh_createElement("th");
            td1.setAttribute("scope", "col");
            td1.innerHTML=ast.expno;

            let td2 = kh_createElement("td");
            let resim = kh_createElement("img");
            resim.setAttribute("src", "###async_server###/userpics/" + ast.resim);
            resim.setAttribute("alt", ast.name);
            resim.style.maxHeight = "25px";
            resim.classList.add("rounded-circle", "me-2");
            td2.append(resim);
            td2.append(document.createTextNode(ast.name));

            let td3 = kh_createElement("td");
            let eposta = kh_createElement("a");
            eposta.setAttribute("href", "mailto:" + ast.eposta);
            eposta.innerHTML = '<i class="fa fa-envelope-o fa-lg"></i>';


            td3.append(eposta);

            let tr = kh_createElement("tr");
            tr.append(td1, td2, td3);

            kh_getElement("asTB").append(tr);
        });

        kh_getElement("lsCon").classList.remove("d-none");

    }
};