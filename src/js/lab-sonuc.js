function ge(id) {
    return document.getElementById(id);
}

function ce(elem){
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
        ge("siNo").innerHTML = responseObject.std.no;
        ge("siName").innerHTML = responseObject.std.name;
        ge("siCrn").innerHTML = responseObject.std.crn;
        let siImg=ge("siImg");
        siImg.setAttribute("src","###async_server###/userpics/"+responseObject.std.facimg);
        siImg.setAttribute("alt", responseObject.std.facname);
        ge("siOuy").innerHTML=responseObject.std.facname;
        ge("siEmail").setAttribute("href", "mailto:" + responseObject.std.facemail);

        //lab
        ge("liLab").innerHTML = responseObject.std.lab;
        ge("liDay").innerHTML = responseObject.std.gun;
        ge("liHours").innerHTML = responseObject.std.saat;

        //experiment and grades
        Array.from(responseObject.cal).forEach(calItem => {
            let tr = ce("tr");

            let td1 = ce("th");
            td1.setAttribute("scope", "col");
            td1.className = "text-center";
            td1.innerHTML = calItem.week;
            let td2 = ce("td");
            td2.innerHTML = calItem.date;
            let td3 = ce("td");
            td3.className = "text-center";
            td3.innerHTML = calItem.expno;
            let td4 = ce("td");
            td4.innerHTML = calItem.exp;
            let td5 = ce("td");
            td5.className = "text-center";
            td5.innerHTML = calItem.expgrade;

            tr.append(td1, td2, td3, td4, td5);

            ge("egTB").append(tr);
        });

        //safety quiz
        let trq = ce("tr");
        let thq = ce("th");
        thq.setAttribute("colspan", "4");
        thq.classList.add("text-end");
        thq.innerHTML = "Safety Quiz";
        let tdq=ce("td");
        tdq.className = "text-center";
        tdq.innerHTML=responseObject.std.quiz;
        trq.append(thq, tdq);
        ge("egTB").append(trq);

        //asistanlar
        Array.from(responseObject.ast).forEach(ast => {

            let td1 = ce("td");
            td1.innerHTML=ast.expno;

            let td2 = ce("td");
            td2.innerHTML=ast.name;

            let td3 = ce("td");

            let eposta = ce("a");
            eposta.setAttribute("href", "mailto:" + ast.eposta);
            eposta.innerHTML = "Eposta";


            td3.append(eposta);

            let tr = ce("tr");
            tr.append(td1, td2, td3);

            ge("asTB").append(tr);
        });

    }
};