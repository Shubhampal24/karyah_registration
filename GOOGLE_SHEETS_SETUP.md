# Karyah – Google Sheets Live Auto-Sync Setup

This connects your Karyah website directly to a Google Sheet. Every time someone enters their phone number and registers on the site, their registration is written into your Google Sheet in real time.

---

## 2-Minute Setup

### Step 1 – Create your Google Sheet
1. Open [sheets.google.com](https://sheets.google.com)
2. Click **+ Blank spreadsheet**
3. Name the spreadsheet: `Karyah Registrations`

---

### Step 2 – Paste the Apps Script
1. Inside your new Google Sheet, click **Extensions** $\rightarrow$ **Apps Script**.
2. Delete whatever is currently in the editor.
3. Open the file [google-apps-script/Code.gs](file:///c:/Users/DELL/Downloads/karyah_proffesion/google-apps-script/Code.gs) in this project.
4. Copy the entire code and paste it into the Apps Script editor.
5. Click 💾 **Save** (Ctrl + S).

---

### Step 3 – Deploy as Web App
1. At the top right, click **Deploy** $\rightarrow$ **New deployment**.
2. Click the gear icon ⚙️ next to "Select type" and select **Web app**.
3. Fill in:
   - **Description**: `Karyah Registration Sync`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` *(crucial so your website can send registrations)*
4. Click **Deploy**.
5. Click **Authorize access** $\rightarrow$ Select your Google account $\rightarrow$ Click **Allow**.
6. Copy the **Web app URL** (it ends with `/exec`).

---

### Step 4 – Connect to Karyah
You can connect it in either of two easy ways:

- **Via the Admin Dashboard**:
  On your website, press **`Ctrl + Shift + A`** (Password: `karyah2026`). Paste your Web App URL into the **Google Sheet / Web App Sync Script** field and click **Save Script Link**.

- **Via the `.env` file**:
  Open `.env` in the project root and paste your URL:
  ```env
  VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ACTUAL_ID/exec
  ```

---

## What Happens Next?
- The script automatically creates the `Karyah Registrations` worksheet.
- It styles the header row with Karyah orange (`#FF8A1F`) and white bold text.
- Every mobile registration immediately appends a new row with:
  `Registration ID | Profession | Mobile Number | Registration Date | Status`
- You can download the entire sheet as an Excel file anytime from Google Sheets:
  **File $\rightarrow$ Download $\rightarrow$ Microsoft Excel (.xlsx)**.
