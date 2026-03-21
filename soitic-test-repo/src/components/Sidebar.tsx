'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAppointmentModal } from './appointments/AppointmentModalContext';

const navItems = [
  { label: 'Visão Geral', icon: 'dashboard', href: '/' },
  { label: 'Agendamentos', icon: 'calendar_today', href: '/agendamentos' },
  { label: 'Pacientes', icon: 'group', href: '/pacientes' },
  { label: 'Análises', icon: 'analytics', href: '/analises' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { open: openModal } = useAppointmentModal();

  const sidebarContent = (
    <>
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
          style={{ backgroundColor: 'var(--color-primary-container)' }}
        >
          <span className="material-symbols-outlined">medical_services</span>
        </div>
        <div>
          <h1 className="font-headline text-lg font-bold" style={{ color: 'var(--color-primary-container)' }}>
            Clínica Médica
          </h1>
          <p className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: 'var(--color-outline)' }}>
            Suíte Médica
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all active:scale-95 font-headline font-semibold text-sm"
              style={{
                backgroundColor: isActive ? 'var(--color-surface-container)' : 'transparent',
                color: isActive ? 'var(--color-primary-container)' : 'var(--color-outline)',
              }}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={openModal}
        className="mb-8 w-full py-4 text-white rounded-xl font-headline font-semibold text-sm shadow-lg active:scale-95 transition-transform"
        style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-container))' }}
      >
        Novo Agendamento
      </button>

      <div className="space-y-2 pt-6" style={{ borderTop: '1px solid var(--color-outline-variant)' }}>
        {[
          { label: 'Configurações', icon: 'settings' },
          { label: 'Suporte', icon: 'help_outline' },
        ].map((item) => (
          <Link
            key={item.label}
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-headline"
            style={{ color: 'var(--color-outline)' }}
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </>
  );

  return (
    <>
      <aside
        className="hidden lg:flex fixed left-0 top-0 h-full w-64 flex-col p-6 z-50 backdrop-blur-xl shadow-[0px_12px_32px_rgba(0,70,95,0.06)]"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        {sidebarContent}
      </aside>

      <button
        className="lg:hidden fixed top-5 left-4 z-[60] p-2 rounded-xl shadow-md"
        style={{ backgroundColor: 'var(--color-surface-container-lowest)', color: 'var(--color-primary-container)' }}
        onClick={() => setMenuOpen(true)}
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside
        className={`lg:hidden fixed left-0 top-0 h-full w-72 flex flex-col p-6 z-[60] shadow-2xl transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        <button
          className="absolute top-4 right-4 p-2 rounded-xl"
          style={{ color: 'var(--color-outline)' }}
          onClick={() => setMenuOpen(false)}
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {sidebarContent}
      </aside>
    </>
  );
}