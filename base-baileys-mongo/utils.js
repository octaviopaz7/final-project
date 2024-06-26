const { google } = require('googleapis');
const auth = new google.auth.GoogleAuth({
    keyFile: './google.json',  
    scopes: ['https://www.googleapis.com/auth/spreadsheets']  
});

const spreadsheetId = '1G1I6pW_a-2rqc_yfHdpYmVVoM6UFA6BUDfnS5-pCVMg';

async function appendToSheet(values) {
    const sheets = google.sheets({ version: 'v4', auth }); // Crea instacia de api a sheets.
    const range = 'Sheet1!A1'; // Rango de hoja
    const valueInputOption = 'USER_ENTERED';

    const resource = { values: values };

    try {
        const res = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption,
            resource,
        });
        return res; // Devuelve la reponse de api
    } catch (error) {
        console.error('error', error); // clog de errores
    }
}


module.exports = {appendToSheet};