'use client';

import { useState } from 'react';
import { formatDate, formatTime, perPageOptions } from '@/lib/common/utils';
import { paginateAppointments } from '@/lib/appointments/utils';
import AppointmentBadge from '@/components/generic/AppointmentBadge';
import { AppointmentListProps } from '@/types/dashboard/appointmentList';
import { typeLabels } from '@/lib/appointments/utils';
import { SkeletonRow } from '../generic/SkeletonRow';
import { PerPageOption } from '@/types/common/page';

export default function AppointmentList({ appointments, isLoading = false }: AppointmentListProps) {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState<PerPageOption>(10);

    const paginated = paginateAppointments(appointments, page, perPage);
    const totalPages = perPage === 'todos' ? 1 : Math.ceil(appointments.length / perPage);

    function handlePerPageChange(value: PerPageOption) {
        setPerPage(value);
        setPage(1);
    }

    if (isLoading) {
        return (
            <div className="flex flex-col gap-3">
                {Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
            </div>
        );
    }

    if (appointments.length === 0) {
        return (
            <div
                className="flex flex-col items-center justify-center py-16 rounded-2xl"
                style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
            >
                <span
                    className="material-symbols-outlined text-[48px] mb-4"
                    style={{ color: 'var(--color-outline)' }}
                >
                    calendar_today
                </span>
                <p className="font-headline font-semibold" style={{ color: 'var(--color-outline)' }}>
                    Nenhum agendamento encontrado
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="space-y-3">
                {paginated.map((appointment) => (
                    <div
                        key={appointment.id}
                        className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[2fr_1fr_1fr_auto] items-center gap-4 p-4 sm:p-5 rounded-2xl shadow-[0px_4px_12px_rgba(0,70,95,0.03)] transition-colors"
                        style={{ backgroundColor: 'var(--color-surface-container)' }}
                    >
                        <div className="flex items-center gap-4 min-w-0">
                            <div
                                className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm font-headline shrink-0"
                                style={{
                                    backgroundColor: 'var(--color-secondary-container)',
                                    color: 'var(--color-primary-container)',
                                }}
                            >
                                {appointment.patientName.charAt(0)}
                            </div>
                            <div className="min-w-0">
                                <p className="font-semibold font-headline text-sm truncate" style={{ color: 'var(--color-on-surface)' }}>
                                    {appointment.patientName}
                                </p>
                                <p className="text-[11px] mt-0.5 truncate" style={{ color: 'var(--color-outline)' }}>
                                    CPF não disponível
                                </p>
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <p className="font-semibold font-headline text-sm" style={{ color: 'var(--color-on-surface)' }}>
                                {typeLabels[appointment.type] ?? appointment.type}
                            </p>
                        </div>

                        <div className="hidden md:block">
                            <p className="font-semibold font-headline text-sm" style={{ color: 'var(--color-on-surface)' }}>
                                {formatTime(appointment.appointmentDate)}
                            </p>
                            <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-outline)' }}>
                                {formatDate(appointment.appointmentDate)}
                            </p>
                        </div>

                        <div className="flex justify-end">
                            <AppointmentBadge status={appointment.status} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-widest font-semibold" style={{ color: 'var(--color-outline)' }}>
                        Exibir
                    </span>
                    <div className="flex gap-1">
                        {perPageOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => handlePerPageChange(option)}
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold font-headline transition-all"
                                style={{
                                    backgroundColor: perPage === option ? 'var(--color-primary-container)' : 'var(--color-surface-container)',
                                    color: perPage === option ? 'var(--color-on-primary)' : 'var(--color-outline)',
                                }}
                            >
                                {option === 'todos' ? 'Todos' : option}
                            </button>
                        ))}
                    </div>
                </div>

                {perPage !== 'todos' && (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="p-1.5 rounded-lg transition-all disabled:opacity-30"
                            style={{ color: 'var(--color-primary-container)' }}
                        >
                            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                        </button>

                        <span className="text-sm font-semibold font-headline" style={{ color: 'var(--color-on-surface)' }}>
                            {page} / {totalPages}
                        </span>

                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="p-1.5 rounded-lg transition-all disabled:opacity-30"
                            style={{ color: 'var(--color-primary-container)' }}
                        >
                            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}