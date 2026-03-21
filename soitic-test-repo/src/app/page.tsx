'use client';

import { useState } from 'react';
import { getAppointments } from '@/services/dashboard/appointment';
import { filterByStatus, sortByDateDesc } from '@/lib/appointments/utils';
import { AppointmentStatus } from '@/types/common/appointment';
import StatsCards from '@/components/dashboard/StatsCards';
import AppointmentList from '@/components/dashboard/AppointmentList';
import AppointmentFilter from '@/components/dashboard/AppointmentFilter';
import AppointmentChart from '@/components/dashboard/AppointmentChart';

const appointments = sortByDateDesc(getAppointments());

export default function Home() {
  const [filter, setFilter] = useState<AppointmentStatus | 'todos'>('todos');

  const filtered = filter === 'todos'
    ? appointments
    : filterByStatus(appointments, filter);

  return (
    <div className="flex flex-col gap-8">
      <div className="pt-12 lg:pt-0">
        <h1
          className="font-headline text-3xl font-bold"
          style={{ color: 'var(--color-primary-container)' }}
        >
          Visão Geral
        </h1>
        <p
          className="text-sm mt-1"
          style={{ color: 'var(--color-outline)' }}
        >
          Acompanhe os agendamentos e métricas da clínica
        </p>
      </div>

      {/* Cards de métricas */}
      <StatsCards appointments={appointments} />

      {/* Gráfico de agendamentos */}
      <AppointmentChart appointments={appointments} />

      {/* Agendamentos */}
      <div
        className="p-6 rounded-2xl shadow-[0px_4px_12px_rgba(0,70,95,0.04)]"
        style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
      >
        {/* Header da seção */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2
              className="font-headline text-xl font-bold"
              style={{ color: 'var(--color-on-surface)' }}
            >
              Agendamentos
            </h2>
            <p
              className="text-[11px] uppercase tracking-widest font-semibold mt-0.5"
              style={{ color: 'var(--color-outline)' }}
            >
              {filtered.length} {filtered.length === 1 ? 'registro' : 'registros'}
            </p>
          </div>
          <AppointmentFilter selected={filter} onChange={setFilter} />
        </div>

        {/* Lista */}
        <AppointmentList key={filter} appointments={filtered} />
      </div>

    </div>
  );
}