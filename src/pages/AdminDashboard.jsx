import React, { useState, useEffect, useCallback } from 'react';
import {
  X, Download, Search, Users, BarChart3, Calendar,
  LogOut, RefreshCw, ChevronLeft, ChevronRight,
  FileSpreadsheet, ShieldCheck, Link2, Check, ExternalLink,
  Trash2, AlertCircle, ArrowUpRight
} from 'lucide-react';
import {
  getRegistrations,
  getStats,
  exportToExcel,
  getScriptUrl,
  setScriptUrl,
  syncAllToGoogleSheet,
  clearRegistrations
} from '../services/store';

export default function AdminDashboard({ isOpen, onClose, onLogout }) {
  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState({ total: 0, today: 0, activeProfessions: 0, excelSynced: 0 });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [exporting, setExporting] = useState(false);

  // Google Sheet Link Config
  const [scriptUrlInput, setScriptUrlInput] = useState('');
  const [scriptSaved, setScriptSaved] = useState(false);
  const [syncingSheet, setSyncingSheet] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  const LIMIT = 15;

  const load = useCallback(() => {
    const result = getRegistrations({ page, limit: LIMIT, search });
    setRegistrations(result.registrations);
    setTotal(result.total);
    setTotalPages(result.totalPages);
    setStats(getStats());
    setScriptUrlInput(getScriptUrl());
  }, [page, search]);

  useEffect(() => {
    if (isOpen) load();
  }, [isOpen, load]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleExport = () => {
    setExporting(true);
    try {
      exportToExcel();
    } catch (err) {
      alert('Excel export failed: ' + err.message);
    } finally {
      setTimeout(() => setExporting(false), 800);
    }
  };

  const handleSaveScriptUrl = (e) => {
    e.preventDefault();
    setScriptUrl(scriptUrlInput);
    setScriptSaved(true);
    setTimeout(() => setScriptSaved(false), 2500);
  };

  const handleSyncAll = async () => {
    if (!scriptUrlInput) {
      alert('Please save a valid Google Sheet Apps Script link first.');
      return;
    }
    setSyncingSheet(true);
    setSyncMessage('');
    try {
      const count = await syncAllToGoogleSheet();
      setSyncMessage(`Successfully dispatched ${count} registrations to Google Sheet!`);
    } catch (err) {
      setSyncMessage(`Sync failed: ${err.message}`);
    } finally {
      setSyncingSheet(false);
      setTimeout(() => setSyncMessage(''), 4000);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all registrations? This cannot be undone.')) {
      clearRegistrations();
      load();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#FFF9F2] overflow-hidden">
      {/* ── Top Bar ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 sm:px-8 py-4 bg-white border-b border-[#EFE8DE] shadow-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <img src="/images/logo.webp" alt="Karyah" className="h-8 w-auto object-contain" />
          <div className="border-l border-[#EFE8DE] pl-3">
            <h2 className="text-sm sm:text-base font-extrabold text-[#202020]">Admin Portal</h2>
            <p className="text-[11px] text-[#77716B]">Live Registrations & Cloud Sync</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="p-2 rounded-xl text-[#77716B] hover:bg-[#FFF1E5] hover:text-[#FF8A1F] transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>{exporting ? 'Exporting...' : 'Download Excel (.xlsx)'}</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#77716B] hover:bg-[#F3ECE0] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#77716B] hover:bg-[#F3ECE0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── Stats Row ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-5 sm:px-8 py-4 bg-white border-b border-[#EFE8DE] flex-shrink-0">
        <Stat icon={Users} label="Total Registrations" value={stats.total} color="text-[#FF8A1F]" bg="bg-[#FFF1E5]" />
        <Stat icon={BarChart3} label="Professions Represented" value={stats.activeProfessions} color="text-blue-600" bg="bg-blue-50" />
        <Stat icon={Calendar} label="Signups Today" value={stats.today} color="text-emerald-600" bg="bg-emerald-50" />
        <Stat icon={FileSpreadsheet} label="Ready for Excel" value={stats.excelSynced} color="text-purple-600" bg="bg-purple-50" />
      </div>

      {/* ── Content Area ────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-auto px-5 sm:px-8 py-6 space-y-6">

        {/* ── Google Sheet Integration Card ─────────────────────────────── */}
        <div className="bg-white rounded-3xl p-5 border border-[#EFE8DE] shadow-soft">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Link2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#202020]">
                  Google Sheet / Web App Sync Script
                </h4>
                <p className="text-xs text-[#77716B] mt-0.5">
                  Paste your Google Apps Script Web App URL below to automatically stream every new registration directly into your Google Sheet.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={handleSyncAll}
                disabled={syncingSheet || !scriptUrlInput || stats.total === 0}
                className="px-3.5 py-2 rounded-xl bg-[#FFF1E5] text-[#FF8A1F] hover:bg-[#FF8A1F] hover:text-white text-xs font-bold transition-all disabled:opacity-40"
              >
                {syncingSheet ? 'Syncing...' : 'Sync All Records Now'}
              </button>
            </div>
          </div>

          <form onSubmit={handleSaveScriptUrl} className="mt-4 flex flex-col sm:flex-row gap-2">
            <input
              type="url"
              placeholder="https://script.google.com/macros/s/AKfycb.../exec"
              value={scriptUrlInput}
              onChange={(e) => setScriptUrlInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-[#E0D4C3] text-xs font-mono text-[#202020] focus:outline-none focus:border-[#FF8A1F] bg-[#FFFDF9]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#FF8A1F] hover:bg-[#E8750E] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              {scriptSaved ? <Check className="w-4 h-4" /> : null}
              <span>{scriptSaved ? 'Saved!' : 'Save Script Link'}</span>
            </button>
          </form>

          {syncMessage && (
            <p className="text-xs font-medium text-emerald-600 mt-2">{syncMessage}</p>
          )}
        </div>

        {/* ── Table Header / Search Bar ─────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-extrabold text-[#202020]">
              Registered Professionals
              <span className="ml-2 text-xs font-semibold text-[#77716B]">({total} records)</span>
            </h3>
            {stats.total > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1 hover:underline"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#77716B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search trade, phone, or ID..."
              value={search}
              onChange={handleSearch}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E0D4C3] text-xs text-[#202020] focus:outline-none focus:border-[#FF8A1F] bg-white"
            />
          </div>
        </div>

        {/* ── Table ─────────────────────────────────────────────────────── */}
        {registrations.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#EFE8DE] p-16 flex flex-col items-center justify-center text-center shadow-soft">
            <div className="w-16 h-16 rounded-2xl bg-[#FFF1E5] flex items-center justify-center mb-3">
              <Users className="w-8 h-8 text-[#FF8A1F]" />
            </div>
            <p className="text-base font-bold text-[#202020]">No registrations recorded yet</p>
            <p className="text-xs text-[#77716B] mt-1 max-w-sm">
              When visitors select a trade on the homepage and submit their mobile number, registrations will immediately appear here and sync to your Excel file.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-[#EFE8DE] shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[650px]">
                <thead className="bg-[#FFFBF7] border-b border-[#EFE8DE]">
                  <tr>
                    {['#', 'Registration ID', 'Profession Category', 'Mobile Number', 'Registration Time', 'Status'].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3.5 text-left text-xs font-bold text-[#77716B] uppercase tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3ECE0]">
                  {registrations.map((reg, idx) => (
                    <tr key={reg.id} className="hover:bg-[#FFFBF7] transition-colors">
                      <td className="px-5 py-3.5 text-xs text-[#77716B]">
                        {(page - 1) * LIMIT + idx + 1}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-xs font-bold text-[#FF8A1F] whitespace-nowrap">
                        {reg.regId}
                      </td>
                      <td className="px-5 py-3.5 font-bold text-[#202020] whitespace-nowrap">
                        {reg.professionName}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-xs font-semibold text-[#202020]">
                        +91 {reg.mobileNumber}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-[#77716B] whitespace-nowrap">
                        {reg.createdAt
                          ? new Date(reg.createdAt).toLocaleString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : '—'}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="px-5 py-3.5 border-t border-[#F3ECE0] flex items-center justify-between bg-[#FFFBF7]">
                <p className="text-xs text-[#77716B]">
                  Page {page} of {totalPages} &nbsp;·&nbsp; {total} total records
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2 rounded-xl hover:bg-[#F3ECE0] disabled:opacity-30 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-3 py-1 rounded-xl bg-[#FF8A1F] text-white text-xs font-bold">
                    {page}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-2 rounded-xl hover:bg-[#F3ECE0] disabled:opacity-30 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, color, bg }) {
  return (
    <div className="bg-white rounded-2xl border border-[#EFE8DE] p-4 shadow-sm flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div>
        <p className="text-xs text-[#77716B] font-medium">{label}</p>
        <p className={`text-2xl font-black ${color} leading-tight`}>{value}</p>
      </div>
    </div>
  );
}
