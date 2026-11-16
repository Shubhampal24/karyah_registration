/**
 * Karyah Registration Store (Pure Frontend + Google Sheet / Excel)
 * ───────────────────────────────────────────────────────────────
 * • Direct local persistence via localStorage
 * • Live Excel (.xlsx) generation & download via SheetJS
 * • Live sync to Google Sheets via Web App link/script
 * • Zero backend server requirement
 */
import * as XLSX from 'xlsx';

const STORAGE_KEY = 'karyah_registrations';
const COUNTER_KEY = 'karyah_reg_counter';
const SCRIPT_URL_KEY = 'karyah_script_url';
const COUNTS_MAP_KEY = 'karyah_counts_map';

function getCountsMap() {
  try {
    return JSON.parse(localStorage.getItem(COUNTS_MAP_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveCountsMap(counts) {
  localStorage.setItem(COUNTS_MAP_KEY, JSON.stringify(counts));
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function getAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveAll(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function nextRegId() {
  const n = parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10) + 1;
  localStorage.setItem(COUNTER_KEY, String(n));
  return `REG-${String(n).padStart(4, '0')}`;
}

const DEFAULT_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw0RpA9MAHMcDMnwSbLg189obw9P62zTGs767yJe5kFRrgY4o0x9zIA_L5rSvwRps0_/exec';

// ── Google Sheets Script URL Config ──────────────────────────────────────────
export function getScriptUrl() {
  return (
    localStorage.getItem(SCRIPT_URL_KEY) ||
    import.meta.env.VITE_GOOGLE_SCRIPT_URL ||
    DEFAULT_SCRIPT_URL
  );
}

export function setScriptUrl(url) {
  if (!url) {
    localStorage.removeItem(SCRIPT_URL_KEY);
  } else {
    localStorage.setItem(SCRIPT_URL_KEY, url.trim());
  }
}

// ── Sync to Google Sheet ─────────────────────────────────────────────────────
async function postToGoogleSheet(registration, scriptUrl) {
  if (!scriptUrl || scriptUrl.includes('YOUR_DEPLOYMENT_ID_HERE')) return;
  try {
    // mode: 'no-cors' allows sending to Google Apps Script without CORS blockage
    await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(registration),
    });
    console.log('[GoogleSheet] Registration payload dispatched:', registration.regId);
  } catch (err) {
    console.warn('[GoogleSheet] Sync warning (data remains safely in local storage):', err);
  }
}

// ── Public API ────────────────────────────────────────────────────────────────
// Global Cloud Counts Sync for ALL devices & visitors
export async function fetchGlobalCounts(professionsList = []) {
  const url = getScriptUrl();
  if (!url || url.includes('YOUR_DEPLOYMENT_ID_HERE')) {
    return getProfessionCounts();
  }

  try {
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    if (data && data.status === 'ok' && data.counts) {
      const incoming = data.counts; // e.g. { "Civil Contractor": 5, "Building Architect": 3 }
      const counts = getCountsMap();

      for (const [profKey, val] of Object.entries(incoming)) {
        const num = parseInt(val, 10);
        if (isNaN(num)) continue;

        counts[profKey] = num;

        // Match against provided professions list
        const match = professionsList.find(
          (p) =>
            p.id === profKey ||
            p.name.toLowerCase() === profKey.toLowerCase() ||
            p.slug.toLowerCase() === profKey.toLowerCase()
        );
        if (match) {
          counts[match.id] = num;
        }
      }

      saveCountsMap(counts);
      return counts;
    }
  } catch (err) {
    console.warn('[GlobalSync] Could not reach Google Sheet live counts, using cached local counts:', err);
  }

  return getProfessionCounts();
}

export function saveRegistration({ professionId, professionName, mobileNumber, countryCode = '+91' }) {
  const records = getAll();

  // Duplicate check: same mobile + same profession
  const dup = records.find(
    (r) => r.mobileNumber === mobileNumber && r.professionId === professionId
  );
  if (dup) {
    throw new Error(
      `Mobile number +91 ${mobileNumber} is already registered as "${professionName}". Each number can register once per profession.`
    );
  }

  const registration = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    regId: nextRegId(),
    professionId,
    professionName,
    mobileNumber,
    countryCode,
    registrationStatus: 'active',
    createdAt: new Date().toISOString(),
  };

  records.push(registration);
  saveAll(records);

  // Immediately increment and persist count
  const currentCounts = getProfessionCounts();
  currentCounts[professionId] = (currentCounts[professionId] || 0) + 1;
  saveCountsMap(currentCounts);

  // Background dispatch to Google Sheet script if connected
  const url = getScriptUrl();
  if (url) {
    postToGoogleSheet(registration, url);
  }

  return registration;
}

export function getRegistrations({ page = 1, limit = 20, search = '' } = {}) {
  let records = getAll();

  if (search) {
    const q = search.toLowerCase();
    records = records.filter(
      (r) =>
        r.professionName?.toLowerCase().includes(q) ||
        r.mobileNumber?.includes(q) ||
        r.regId?.toLowerCase().includes(q)
    );
  }

  records = [...records].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const total = records.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return {
    registrations: records.slice((page - 1) * limit, page * limit),
    total,
    totalPages,
  };
}

export function getStats() {
  const records = getAll();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return {
    total: records.length,
    today: records.filter((r) => new Date(r.createdAt) >= today).length,
    activeProfessions: new Set(records.map((r) => r.professionId)).size,
    excelSynced: records.length,
  };
}

export function getProfessionCounts() {
  const records = getAll();
  const counts = {};

  // Exact live tally matching actual registrations
  for (const r of records) {
    if (r.professionId) {
      counts[r.professionId] = (counts[r.professionId] || 0) + 1;
    }
  }

  return counts;
}

export function adjustProfessionCount(professionId, delta, professionName = '') {
  const currentCounts = getProfessionCounts();
  const current = currentCounts[professionId] || 0;
  const next = Math.max(0, current + delta);
  currentCounts[professionId] = next;

  // Persist directly to localStorage
  saveCountsMap(currentCounts);

  // If reducing count and we have actual stored records for this profession, remove the most recent one
  if (delta < 0) {
    const records = getAll();
    for (let i = records.length - 1; i >= 0; i--) {
      if (records[i].professionId === professionId) {
        records.splice(i, 1);
        saveAll(records);
        break;
      }
    }
  }

  // Sync adjustment to Google Sheet cloud in background so all systems receive it
  const url = getScriptUrl();
  if (url && (professionName || professionId)) {
    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        action: 'adjust_count',
        professionId: professionId,
        professionName: professionName || professionId,
        count: next,
      }),
    }).catch((e) => console.warn('[GlobalSync] Cloud adjustment note:', e));
  }

  return next;
}

export function clearRegistrations() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(COUNTER_KEY);
  localStorage.removeItem(COUNTS_MAP_KEY);
}

// ── Batch Sync All to Google Sheet ───────────────────────────────────────────
export async function syncAllToGoogleSheet() {
  const url = getScriptUrl();
  if (!url) throw new Error('No Google Sheet script link configured yet.');
  const records = getAll();
  for (const reg of records) {
    await postToGoogleSheet(reg, url);
  }
  return records.length;
}

// ── Excel (.xlsx) Generator ──────────────────────────────────────────────────
export function exportToExcel() {
  const records = [...getAll()].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  const rows =
    records.length === 0
      ? [
          {
            'Registration ID': '—',
            Profession: 'No registrations yet',
            'Mobile Number': '—',
            'Registration Date': '—',
            Status: '—',
          },
        ]
      : records.map((r, i) => ({
          'Registration ID': r.regId || `REG-${String(i + 1).padStart(4, '0')}`,
          Profession: r.professionName,
          'Mobile Number': r.mobileNumber, // Clean mobile string
          'Registration Date': r.createdAt
            ? new Date(r.createdAt).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })
            : '—',
          Status: 'Active',
        }));

  const ws = XLSX.utils.json_to_sheet(rows);
  ws['!cols'] = [
    { wch: 18 }, // Registration ID
    { wch: 30 }, // Profession
    { wch: 20 }, // Mobile Number
    { wch: 24 }, // Registration Date
    { wch: 14 }, // Status
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Karyah Registrations');

  const filename = `karyah-registrations-${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, filename);
}
