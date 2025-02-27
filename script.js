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

const receivers = [
    "Sebastian Schmidt<br>Musterstraße 1<br>64354 Reinheim<br>Deutschland",
    "Fabio Müller<br>Musterstraße 2<br>64454 Gouwer<br>USA",
    "Susanne Meyer<br>Musterstraße 3<br>64554 Riemenstalden<br>Deutschland",
    "Marion Schulz<br>Petrusweg 7<br>64654 Fürth<br>Deutschland",
    "Herbert Schneider<br>Petrusweg 8<br>64754 Hesseneck<br>Deutschland",
    "Franziska Hoffmann<br>Petrusweg 9<br>64854 Eppertshausen<br>Deutschland",
    "Julia Becker<br>Petrusweg 10<br>64954 Tel Aviv-Jaffa<br>Israel",
    "Jeanette Fischer<br>Ringelstraße 54<br>65054 São Luís<br>Brasilien",
    "Jennifer Weber<br>Ringelstraße 55<br>65154 Võru<br>Estland",
    "Markus Wagner<br>Ringelstraße 56<br>65254 Vastseliina<br>Estland",
    "Emil Bauer<br>Ringelstraße 57<br>65354 Syracuse<br>USA",
    "Paul Lange<br>Ringelstraße 58<br>65454 Kelsterbach<br>Deutschland",
    "Jakob Wolf<br>Ringelstraße 59<br>65554 Limburg an der Lahn<br>Deutschland",
    "Lea Schäfer<br>Kannweg 3<br>65654 Nuevo León<br>Mexico",
    "Leo Koch<br>Kannweg 4<br>65754 Spokane<br>USA",
    "Samuel Richter<br>Kannweg 5<br>659540 Rebrikha<br>Russland",
    "David Klein<br>Kannweg 6<br>659540 Singapur<br>Singapur",
    "Linus Schröder<br>Kannweg 7<br>66054 Vasto<br>Italien",
    "Milan Neumann<br>Karpfangerstraße 13<br>66154 Blitar<br>Indonesien",
    "Finn Schwarz<br>Karpfangerstraße 14<br>66254 Rõuge<br>Estland",
    "Tim Zimmermann<br>Karpfangerstraße 15<br>66354 Colonia Infonavit la Huasteca<br>Mexico",
    "Jasper Braun<br>Karpfangerstraße 16<br>664540 Khomutovo<br>Russland",
    "Mika Krüger<br>Karpfangerstraße 17<br>66554 Randolph<br>USA",
    "Tobias Hartmann<br>Karpfangerstraße 18<br>66654 Oblast Kardschali<br>Bulgarien",
    "Luca Schmitt<br>Karpfangerstraße 19<br>66754 Mapleton<br>USA",
    "Lio Werner<br>Karpfangerstraße 20<br>66854 Perpignan<br>Frankreich"
];

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

function generateArticleBarcode(select) {
    const barcodeData = select.value;
    const svg = select.parentElement.nextElementSibling.querySelector('svg');
    JsBarcode(svg, barcodeData, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 50,
        displayValue: true
    });

    const artikelnameInput = select.parentElement.nextElementSibling.nextElementSibling.querySelector('input');
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
    `
        <select class="input-field artikelnummer" onchange="generateArticleBarcode(this)">
            <option value="Artikelnummer wählen...">Artikelnummer wählen...</option>
            ${Object.keys(articleNames).map(key => `<option value="${key}">${key}</option>`).join('')}
        </select>
    `;
    cell3.innerHTML = '<svg></svg>';
    cell4.innerHTML = '<input type="text" class="input-field artikelname" readonly>';
    cell5.innerHTML = '<input type="text" class="input-field">';
}

function printPickingList() {
    window.print();
}

function generateLieferschein() {
    document.getElementById('lieferschein').style.display = 'block';
    document.getElementById('generate-lieferschein-button').style.display = 'none';

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
        cell2.innerText = row.cells[1].querySelector('select').value;
        cell3.innerHTML = row.cells[2].innerHTML;
        cell4.innerText = row.cells[3].querySelector('input').value;
        const menge = parseInt(row.cells[4].querySelector('input').value) || 0;
                cell5.innerHTML = `<input type="text" class="input-field" value="${menge}" oninput="updateTotals()">`;
        totalAmount += menge;
    }

    updateTotals();

    const empfaengerInfo = document.getElementById('empfaenger-info').selectedOptions[0].text;
    const empfaengerDetails = receivers[document.getElementById('empfaenger-info').selectedIndex - 1];
    document.getElementById('empfaenger-info-display').innerHTML = empfaengerDetails;
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

function showReceiverInfo() {
    const select = document.getElementById('empfaenger-info');
    const receiverDetails = document.getElementById('receiver-details');
    const selectedIndex = select.value;
    if (selectedIndex > 0) {
        receiverDetails.innerHTML = receivers[selectedIndex - 1];
    } else {
        receiverDetails.innerHTML = '';
    }
}
