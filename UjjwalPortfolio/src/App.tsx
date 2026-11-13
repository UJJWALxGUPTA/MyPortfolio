import React, { useState } from 'react';
import { NetworkMeshCanvas } from './components/background/NetworkMeshCanvas';
import { CRTOverlay } from './components/background/CRTOverlay';
import { NocTelemetryBar } from './components/navigation/NocTelemetryBar';
import { Navbar } from './components/navigation/Navbar';
import { Hero } from './components/hero/Hero';
import { DiagnosticsMatrix } from './components/skills/DiagnosticsMatrix';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { CertificationsSection } from './components/credentials/CertificationsSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/navigation/Footer';
import { CredentialModal } from './components/credentials/CredentialModal';
import { ResumeModal } from './components/contact/ResumeModal';

export function App() {
  const [crtEnabled, setCrtEnabled] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-jet text-slate-100 font-sans relative selection:bg-crimson/30 selection:text-crimson">
      {/* Dynamic Network Canvas Mesh Grid & Ambient FX */}
      <NetworkMeshCanvas />

      {/* Optional CRT Scanlines Overlay */}
      <CRTOverlay enabled={crtEnabled} />

      {/* Top NOC Telemetry Bar */}
      <NocTelemetryBar
        crtEnabled={crtEnabled}
        onToggleCrt={() => setCrtEnabled(prev => !prev)}
      />

      {/* Sticky Main Navigation */}
      <Navbar
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 01. Hero & Interactive CLI Terminal */}
        <Hero
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
          onOpenVerifyModal={() => setIsVerifyModalOpen(true)}
        />

        {/* 02. Interactive Diagnostics Matrix (Skills) */}
        <DiagnosticsMatrix />

        {/* 03. Hardware Diagnostics & Work Experience (Oscilloscope) */}
        <ExperienceSection />

        {/* 04. Featured Projects & Dynamic Topology Visualizer */}
        <ProjectsSection />

        {/* 05. Certifications & Academic Foundations */}
        <CertificationsSection
          onOpenVerifyModal={() => setIsVerifyModalOpen(true)}
        />

        {/* 06. TCP 3-Way Handshake Contact Endpoint */}
        <ContactSection />
      </main>

      {/* NOC Terminal Footer */}
      <Footer
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onOpenVerifyModal={() => setIsVerifyModalOpen(true)}
      />

      {/* Interactive Modals */}
      <CredentialModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}

export default App;
