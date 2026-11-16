import React, { useState, useRef, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import ProfessionSelection from '../sections/ProfessionSelection';
import Footer from '../components/Footer';
import RegistrationModal from '../components/RegistrationModal';
import SuccessModal from '../components/SuccessModal';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import { useProfessions } from '../hooks/useProfessions';
import { useRegistration } from '../hooks/useRegistration';
import { getProfessionCounts, adjustProfessionCount, fetchGlobalCounts } from '../services/store';
import { SECTORS } from '../data/professions';

export default function Home() {
  const { professions, loading } = useProfessions();
  const { register, submitting, error, successData, reset } = useRegistration();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [counts, setCounts] = useState({});
  const [showRegistration, setShowRegistration] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  const professionRef = useRef(null);

  // Load initial counts from stored registrations & fetch global cloud counts
  useEffect(() => {
    // 1. Instant local load
    setCounts(getProfessionCounts());

    // 2. Fetch live global counts from Google Sheets for multi-device sync
    fetchGlobalCounts(professions).then((cloudCounts) => {
      if (cloudCounts && Object.keys(cloudCounts).length > 0) {
        setCounts({ ...cloudCounts });
      }
    });

    // 3. Periodically sync with Google Sheets (every 25 seconds)
    const interval = setInterval(() => {
      fetchGlobalCounts(professions).then((cloudCounts) => {
        if (cloudCounts && Object.keys(cloudCounts).length > 0) {
          setCounts({ ...cloudCounts });
        }
      });
    }, 25000);

    // Secret Admin Shortcut (Ctrl + Shift + A) to open admin dashboard if needed
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        setShowAdminLogin(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [professions]);

  // Real-time filtering across multi-sectors and keywords
  const filteredProfessions = useMemo(() => {
    return professions.filter((prof) => {
      const matchesSector = selectedSector === 'All' || prof.sector === selectedSector;
      if (!matchesSector) return false;

      if (!searchTerm.trim()) return true;

      const q = searchTerm.toLowerCase().trim();
      return (
        prof.name.toLowerCase().includes(q) ||
        (prof.sector && prof.sector.toLowerCase().includes(q)) ||
        (prof.badge && prof.badge.toLowerCase().includes(q)) ||
        (prof.gear && prof.gear.toLowerCase().includes(q)) ||
        (prof.animal && prof.animal.toLowerCase().includes(q))
      );
    });
  }, [professions, selectedSector, searchTerm]);

  const handleSelectProfession = (profession) => {
    reset();
    setSelectedProfession(profession);
    setShowRegistration(true);
  };

  const handleRegistrationSubmit = (formData) => {
    const result = register(formData);
    if (result.success) {
      setCounts(getProfessionCounts());
      setShowRegistration(false);
      setShowSuccess(true);
    }
  };

  const handleCloseRegistration = () => {
    setShowRegistration(false);
    setSelectedProfession(null);
    reset();
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setSelectedProfession(null);
    reset();
  };

  const handleAdjustCount = (professionId, delta) => {
    const prof = professions.find((p) => p.id === professionId);
    adjustProfessionCount(professionId, delta, prof?.name || '');
    setCounts(getProfessionCounts());
  };

  const handleAdminLoginSuccess = () => {
    setShowAdminLogin(false);
    setShowAdminDashboard(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2] flex flex-col justify-between">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        matchCount={filteredProfessions.length}
        totalCount={professions.length}
      />

      <main className="flex-1" ref={professionRef}>
        <ProfessionSelection
          professions={filteredProfessions}
          counts={counts}
          loading={loading}
          selectedSector={selectedSector}
          onSelectSector={setSelectedSector}
          sectors={SECTORS}
          searchTerm={searchTerm}
          onClearSearch={() => {
            setSearchTerm('');
            setSelectedSector('All');
          }}
          onAdjustCount={handleAdjustCount}
          onSelectProfession={handleSelectProfession}
        />
      </main>

      <Footer />

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={showRegistration}
        profession={selectedProfession}
        onClose={handleCloseRegistration}
        onSubmit={handleRegistrationSubmit}
        isSubmitting={submitting}
        errorMessage={error}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        data={successData}
        professionName={selectedProfession?.name}
        onClose={handleCloseSuccess}
      />

      {/* Admin Authentication (Accessible via Ctrl+Shift+A) */}
      <AdminLogin
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={showAdminDashboard}
        onClose={() => {
          setShowAdminDashboard(false);
          setCounts(getProfessionCounts());
        }}
        onLogout={() => {
          setShowAdminDashboard(false);
          setCounts(getProfessionCounts());
        }}
      />
    </div>
  );
}
