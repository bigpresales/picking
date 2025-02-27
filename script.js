const articleNames = {
    1001: "TD4550DNWBFC",
    1002: "TJ4121TN",
    1003: "PT-E560BT",
    1004: "RJ3250WB",
    1005: "RJ3035B",
    1006: "TJ-4121TN",
    1007: "QL1110NWBc",
    1008: "RJ-2035B",
    1009: "RJ-2055WB",
    1010: "RJ-3230BL",
    1011: "TD-4750TNWBR",
    1012: "TD-2350DNFC"
};

function generateBarcode(type) {
    const number = document.getElementById(`${type}-nr`).value;
    const date = document.getElementById('lieferungsdatum').value;
    const barcodeData = `${type}_${number};${date}`;
    JsBarcode(`#${type}-barcode`, barcodeData, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 50,
        displayValue: true
    });
}

function generateArticleBarcode(input) {
    const barcodeData = input.value;
    const svg = input.parentElement.nextElementSibling.querySelector('svg');
    JsBarcode(svg, barcodeData, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 50,
        displayValue: true
    });

    const artikelnameInput = input.parentElement.nextElementSibling.nextElementSibling.querySelector('input');
    artikelnameInput.value = articleNames[barcodeData] || "";
}

function addRow() {
    const table = document.getElementById('artikel-tabelle');
    const rowCount = table.rows.length + 1;
    const row = table.insertRow();

    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);

    cell1.innerHTML = rowCount;
    cell2.innerHTML = '<input type="text" class="input-field artikelnummer" oninput="generateArticleBarcode(this)">';
    cell3.innerHTML = '<svg></svg>';
    cell4.innerHTML = '<input type="text" class="input-field artikelname" readonly>';
    cell5.innerHTML = '<input type="text" class="input-field">';
}

    window.print();
}

function generateLieferschein() {
    document.getElementById('lieferschein').style.display = 'block';

    const number = document.getElementById('pickinglist-nr').value;
    const date = document.getElementById('lieferungsdatum').value;
    document.getElementById('lieferschein-nr-display').innerText = `lieferscheinnr_${number}`;
    document.getElementById('lieferungsdatum-display').innerText = date;

    const barcodeData = `lieferscheinnr_${number};${date}`;
    JsBarcode("#lieferschein-barcode", barcodeData, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 50,
        displayValue: true
    });

    const table = document.getElementById('artikel-tabelle');
    const lieferscheinTable = document.getElementById('lieferschein-artikel-tabelle');
    lieferscheinTable.innerHTML = '';
    let totalAmount = 0;
    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        const newRow = lieferscheinTable.insertRow();

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);

        cell1.innerText = row.cells[0].innerText;
        cell2.innerText = row.cells[1].querySelector('input').value;
        cell3.innerHTML = row.cells[2].innerHTML;
        cell4.innerText = row.cells[3].querySelector('input').value;
        const menge = parseInt(row.cells[4].querySelector('input').value) || 0;
        cell5.innerHTML = `<input type="text" class="input-field" value="${menge}" oninput="updateTotals()">`;
        totalAmount += menge;
    }

    updateTotals();

    const empfaengerInfo = document.getElementById('empfaenger-info').selectedOptions[0].text;
    document.getElementById('empfaenger-info-display').innerText = empfaengerInfo;
}

function updateTotals() {
    const table = document.getElementById('lieferschein-artikel-tabelle');
    let totalAmount = 0;
    for (let i = 0; i < table.rows.length; i++) {
        const menge = parseInt(table.rows[i].cells[4].querySelector('input').value) || 0;
        totalAmount += menge;
    }

    const anzahlDerPakete = totalAmount;
    const bruttoKg = totalAmount * 1.5;
    const volumenDm3 = totalAmount * 3;
    document.getElementById('anzahl-der-pakete').value = anzahlDerPakete;
    document.getElementById('brutto-kg').value = bruttoKg;
    document.getElementById('volumen-dm3').value = volumenDm3;

    generateVersandartBarcode();
}

function generateVersandartBarcode() {
    const geliefertVon = document.getElementById('geliefert-von').value;
    const barcodeData = `${geliefertVon}`;
    JsBarcode("#versandart-barcode", barcodeData, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 50,
        displayValue: true
    });
}

function printLieferschein() {
    window.print();
}

function updateFooter() {
    const date = document.getElementById('lieferungsdatum').value;
    const footerText = `Ab Lager Brother, Nippon, Mönchengladbach, den ${date}`;
    document.getElementById('footer-picking-list').innerText = footerText;
    document.getElementById('footer-lieferschein').innerText = footerText;
}

document.getElementById('lieferungsdatum').addEventListener('change', updateFooter);
