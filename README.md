# Picking List und Lieferschein

This project generates a picking list and a delivery note (Lieferschein) with QR codes and allows for printing and saving as PDF. The application is designed to handle multiple pages if the content exceeds one A4 page.

## Table of Contents
- Features
- Installation
- Usage
- Functions
- User Manual

## Features
- Dropdown list for article codes (1001 to 1012)
- QR code generation for document numbers
- Limited options for `Versandart` (DHL, Hermes, DPD)
- Multi-page A4 formatting
- Print and save as PDF

## Installation
1. Clone the repository or download the files.
2. Ensure you have an internet connection to load external libraries (html2canvas, JsBarcode, jsPDF).

## Usage
1. Open `index.html` in a web browser.
2. Fill in the required fields and generate the picking list and delivery note.
3. Print or save the documents as PDF.

## Functions

### HTML Structure
- **Header**: Displays the logo and document title.
- **Sections**: Contains input fields for document numbers, dates, sender and receiver information, and article details.
- **Tables**: Lists articles to be picked or delivered.
- **Buttons**: Provides options to print, generate delivery note, and save as PDF.

### JavaScript Functions

#### `generateBarcode(type)`
Generates a QR code for the document number and date.
- **Parameters**: `type` (string) - either 'pickinglist' or 'deliverynote'.
- **Usage**: Called when the document number or date is input.

#### `generateArticleBarcode(input)`
Generates a barcode for the selected article number and fills in the article name.
- **Parameters**: `input` (HTMLInputElement) - the input element for the article number.
- **Usage**: Called when an article number is selected.

#### `addRow()`
Adds a new row to the article table.
- **Usage**: Called when the "Weitere Artikel hinzufügen" button is clicked.

#### `printPickingList()`
Prints the picking list.
- **Usage**: Called when the "Send to Print" button is clicked.

#### `generateLieferschein()`
Generates the delivery note based on the picking list details.
- **Usage**: Called when the "Generate Lieferschein" button is clicked.

#### `updateTotals()`
Updates the total number of packages, weight, and volume.
- **Usage**: Called when the quantity of an article is changed.

#### `generateVersandartBarcode()`
Generates a QR code for the shipping details.
- **Usage**: Called when the shipping method or other shipping details are changed.

#### `printLieferschein()`
Prints the delivery note.
- **Usage**: Called when the "Send to Print" button is clicked.

#### `savePickingListPDF()`
Saves the picking list as a PDF.
- **Usage**: Called when the "Save Picking List to PDF" button is clicked.

#### `saveLieferscheinPDF()`
Saves the delivery note as a PDF.
- **Usage**: Called when the "Save Lieferschein to PDF" button is clicked.

#### `updateFooter()`
Updates the footer with the delivery date.
- **Usage**: Called when the delivery date is changed.

## User Manual

1. **Open the Application**: Open `index.html` in your web browser.
2. **Fill in Details**:
   - **Picking List Number**: Enter the picking list number.
   - **Delivery Date**: Select the delivery date.
   - **Sender Information**: This is pre-filled with the sender's details.
   - **Receiver Information**: This is pre-filled with the receiver's details.
3. **Add Articles**:
   - Select an article number from the dropdown list.
   - The article name will be filled automatically.
   - Enter the quantity of the article.
   - Click "Weitere Artikel hinzufügen" to add more articles.
4. **Generate QR Codes**: QR codes for the document number and articles will be generated automatically.
5. **Generate Delivery Note**: Click "Generate Lieferschein" to create the delivery note based on the picking list details.
6. **Print Documents**: Click "Send to Print" to print the picking list or delivery note.
7. **Save as PDF**: Click "Save Picking List to PDF" or "Save Lieferschein to PDF" to save the documents as PDF files.

Enjoy using the application!
