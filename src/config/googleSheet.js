/**
 * Karyah – Google Sheets connection config
 *
 * Replace VITE_GOOGLE_SCRIPT_URL in your .env with the URL you get
 * after deploying your Google Apps Script as a Web App.
 *
 * Example:
 *   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
 */

export const GOOGLE_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

export const isSheetConnected = () => !!GOOGLE_SCRIPT_URL;
