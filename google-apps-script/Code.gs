/**
 * ================================================================
 *  KARYAH – Google Apps Script (Global Multi-System Real-Time Sync)
 *  Paste this ENTIRE file into Google Apps Script editor and deploy
 *  as a Web App (Execute as: Me, Access: Anyone).
 * ================================================================
 */

// Sheet names
var SHEET_REGISTRATIONS = 'Karyah Registrations';
var SHEET_COUNTS        = 'Karyah Live Counts';

// Column headers for registrations
var REG_HEADERS = [
  'Registration ID',
  'Profession',
  'Mobile Number',
  'Registration Date',
  'Status'
];

// Column headers for live counts
var COUNT_HEADERS = [
  'Profession Name',
  'Count',
  'Last Updated'
];

// ── GET: Global Live Count Sync for ALL Devices Worldwide ─────────────────────
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var counts = {};
    var totalRegistrations = 0;

    // 1. Tally registrations from the main sheet
    var regSheet = ss.getSheetByName(SHEET_REGISTRATIONS);
    if (regSheet && regSheet.getLastRow() > 1) {
      var numRows = regSheet.getLastRow() - 1;
      var data = regSheet.getRange(2, 2, numRows, 1).getValues();
      for (var i = 0; i < data.length; i++) {
        var prof = String(data[i][0]).trim();
        if (prof) {
          counts[prof] = (counts[prof] || 0) + 1;
          totalRegistrations++;
        }
      }
    }

    // 2. Check for manual adjustments in live counts tab
    var countSheet = ss.getSheetByName(SHEET_COUNTS);
    if (countSheet && countSheet.getLastRow() > 1) {
      var cRows = countSheet.getLastRow() - 1;
      var cData = countSheet.getRange(2, 1, cRows, 2).getValues();
      for (var j = 0; j < cData.length; j++) {
        var pName = String(cData[j][0]).trim();
        var val = parseInt(cData[j][1], 10);
        if (pName && !isNaN(val)) {
          // Manual count override takes precedence if defined
          counts[pName] = Math.max(0, val);
        }
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'ok',
        platform: 'Karyah Global Network',
        timestamp: new Date().toISOString(),
        totalRegistrations: totalRegistrations,
        counts: counts
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        error: err.message,
        counts: {}
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── POST: Registrations & Count Adjustments from Any Device ───────────────────
function doPost(e) {
  try {
    var contents = e.postData ? e.postData.contents : '';
    var data = {};
    if (contents) {
      try {
        data = JSON.parse(contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // ── ACTION A: Manual Count Adjustment (+ / -) ─────────────────────────────
    if (data.action === 'adjust_count' && data.professionName) {
      var cSheet = ss.getSheetByName(SHEET_COUNTS);
      if (!cSheet) {
        cSheet = ss.insertSheet(SHEET_COUNTS);
        cSheet.appendRow(COUNT_HEADERS);
        cSheet.getRange(1, 1, 1, COUNT_HEADERS.length).setFontWeight('bold').setBackground('#FF8A1F').setFontColor('#FFFFFF');
        cSheet.setColumnWidth(1, 260);
        cSheet.setColumnWidth(2, 120);
        cSheet.setColumnWidth(3, 200);
      }

      var profName = String(data.professionName).trim();
      var newCount = Math.max(0, parseInt(data.count, 10) || 0);
      var found = false;

      if (cSheet.getLastRow() > 1) {
        var range = cSheet.getRange(2, 1, cSheet.getLastRow() - 1, 1).getValues();
        for (var k = 0; k < range.length; k++) {
          if (String(range[k][0]).trim() === profName) {
            cSheet.getRange(k + 2, 2).setValue(newCount);
            cSheet.getRange(k + 2, 3).setValue(new Date().toISOString());
            found = true;
            break;
          }
        }
      }

      if (!found) {
        cSheet.appendRow([profName, newCount, new Date().toISOString()]);
      }

      return ContentService
        .createTextOutput(JSON.stringify({ success: true, action: 'adjust_count', profession: profName, count: newCount }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ── ACTION B: New User Registration ───────────────────────────────────────
    var sheet = ss.getSheetByName(SHEET_REGISTRATIONS);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_REGISTRATIONS);
    }

    // Write headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(REG_HEADERS);
      var headerRange = sheet.getRange(1, 1, 1, REG_HEADERS.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#FF8A1F');
      headerRange.setFontColor('#FFFFFF');
      headerRange.setFontSize(11);
      sheet.setColumnWidth(1, 160);
      sheet.setColumnWidth(2, 240);
      sheet.setColumnWidth(3, 180);
      sheet.setColumnWidth(4, 200);
      sheet.setColumnWidth(5, 120);
      sheet.setFrozenRows(1);
    }

    // Date formatting
    var dateStr = '';
    if (data.createdAt) {
      var d = new Date(data.createdAt);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      dateStr = d.getDate() + '-' + months[d.getMonth()] + '-' + d.getFullYear();
    } else {
      var now = new Date();
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      dateStr = now.getDate() + '-' + months[now.getMonth()] + '-' + now.getFullYear();
    }

    // Append registration row
    sheet.appendRow([
      data.regId          || '',
      data.professionName || '',
      "'" + (data.mobileNumber || ''),
      dateStr,
      'Active'
    ]);

    // Alternate row styling
    var row = sheet.getLastRow();
    var rowColor = row % 2 === 0 ? '#FFF9F2' : '#FFFFFF';
    sheet.getRange(row, 1, 1, REG_HEADERS.length).setBackground(rowColor);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, regId: data.regId }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
