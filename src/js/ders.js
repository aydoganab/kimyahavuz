let xhr = new XMLHttpRequest();
xhr.open("GET", "###async_server###/service/get-kim101-page-data", true);
xhr.send();
xhr.onload = function () {
    if (xhr.status === 200) {

        let responseObject = JSON.parse(xhr.response);

        if (Object.keys(responseObject.kordinator).length > 0) {
            document.getElementById("kordonem").innerHTML = responseObject.donem_en
            document.getElementById("korimg").setAttribute("src", "###async_server###/userpics/" + responseObject.kordinator.resim);
            document.getElementById("korname").innerHTML = responseObject.kordinator.name;
            document.getElementById("koremail").setAttribute("href", "mailto:" + responseObject.kordinator.eposta);

            document.getElementById("kordinator").classList.remove("d-none");
        }

        //handle syllabuses
        if (responseObject.kim101_syllabus_ver !== "0") {
            let lnk = document.createElement("a");
            lnk.classList.add("list-group-item", "list-group-item-action", "list-group-item-primary");
            lnk.setAttribute("href", responseObject.kim101_syllabus_link);
            let fa = document.createElement("i");
            fa.classList.add("fa", "fa-fw", "fa-file-pdf");
            lnk.append(fa);
            lnk.append(document.createTextNode(responseObject.donem_tr + " dönemi KIM 101 müfredat dosyası"));
            let lgsyl = document.getElementById("lgsyl");
            lgsyl.prepend(lnk);
        }

        if (responseObject.kim101e_syllabus_ver !== "0") {
            let lnk = document.createElement("a");
            lnk.classList.add("list-group-item", "list-group-item-action", "list-group-item-primary");
            lnk.setAttribute("href", responseObject.kim101e_syllabus_link);
            let fa = document.createElement("i");
            fa.classList.add("fa", "fa-fw", "fa-file-pdf");
            lnk.append(fa);
            lnk.append(document.createTextNode(responseObject.donem_en + " semester KIM 101E syllabus file"));
            let lgsyl = document.getElementById("lgsyl");
            lgsyl.prepend(lnk);
        }

    }
};