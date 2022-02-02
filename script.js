let btn = document.querySelector(".button");
let qr_code_element = document.querySelector(".qr-code");

// Button Function
btn.addEventListener("click", () => {
    let user_input = document.querySelector("#input_text");

    let input_color_1 = document.querySelector("#input_color_1");
    let input_color_2 = document.querySelector("#input_color_2");
    if (user_input.value != "") {
        if (qr_code_element.childElementCount == 0) {
            generate(user_input, input_color_1, input_color_2);
        } else {
            qr_code_element.innerHTML = "";
            generate(user_input, input_color_1, input_color_2);
        }
    } else {
        alert("โปรดกรอกสักตัวอักษรเพื่อสร้าง QR Code");
        qr_code_element.style.display = "none";
    }
})

// Generate QR Code
function generate(user_input, input_color_1, input_color_2) {
    qr_code_element.style = "";
    qr_code_element.style = "transform: scale(1.125);"
    setTimeout(() => {
        qr_code_element.style = "transform: scale(1);"
    }, 100)

    var qrcode = new QRCode(qr_code_element, {
        text: `${user_input.value}`,
        width: 180,
        height: 180,
        colorDark: `${input_color_1.value}`,
        colorLight: `${input_color_2.value}`,
        correctLevel: QRCode.CorrectLevel.H
    });

    let download = document.createElement("button");
    download.classList.add("download-btn")
    qr_code_element.appendChild(download);

    let download_link = document.createElement("a");
    download_link.setAttribute("download", "qr-code-generated-on-" + new Date().toUTCString() + ".png");
    download_link.innerText = "Download";
    
    download.appendChild(download_link)

    let qr_code_img = document.querySelector(".qr-code img");
    let qr_code_canvas = document.querySelector("canvas");

    if (qr_code_img.getAttribute("src") == null) {
        setTimeout(() => {
            download_link.setAttribute("href", `${qr_code_canvas.toDataURL()}`)
        }, 300);
    } else {
        setTimeout(() => {
            download_link.setAttribute("href", `${qr_code_img.getAttribute("src")}`)
        }, 300);
    }
}