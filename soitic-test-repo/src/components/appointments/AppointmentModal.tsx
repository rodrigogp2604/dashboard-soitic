'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/generic/Modal';
import Input from '@/components/generic/Input';
import Select from '@/components/generic/Select';
import { AppointmentStatus, AppointmentType } from '@/types/common/appointment';
import { statusConfig, statusOptions, typeOptions } from '@/lib/appointments/utils';
import { getPatientsOptions } from '@/lib/patients/utils';
import { useAppointmentModal } from '@/components/appointments/AppointmentModalContext';
import { storeAppointment } from '@/services/dashboard/appointment';
import { SelectOption } from '@/types/generics';

export default function AppointmentModal() {
    const { isOpen, close, notifyCreated } = useAppointmentModal();

    const [patients, setPatients] = useState<SelectOption[]>([]);
    const [patientId, setPatientId] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [type, setType] = useState<AppointmentType>('primeira consulta');
    const [status, setStatus] = useState<AppointmentStatus>('confirmado');

    useEffect(() => {
        async function loadPatients() {
            const options = await getPatientsOptions();
            setPatients(options);
        }
        loadPatients();
    }, []);

    async function handleSubmit() {
        if (!patientId || !date || !time) return;

        const data = await storeAppointment({
            patient_id: parseInt(patientId),
            appointment_date: `${date} ${time}:00`,
            status,
            type,
        });

        if (data.status) {
            notifyCreated();
            handleClose();
        }
    }

    function handleClose() {
        setPatientId('');
        setDate('');
        setTime('');
        setType('primeira consulta');
        setStatus('confirmado');
        close();
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Novo Agendamento">
            <div className="flex flex-col gap-5">

                <Select
                    label="Paciente"
                    value={patientId}
                    onChange={setPatientId}
                    options={patients}
                    placeholder="Selecione um paciente"
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input label="Data" type="date" value={date} onChange={setDate} />
                    <Input label="Horário" type="time" value={time} onChange={setTime} />
                </div>

                <Select
                    label="Tipo"
                    value={type}
                    onChange={(v) => setType(v as AppointmentType)}
                    options={typeOptions}
                />

                <div className="flex flex-col gap-1.5">
                    <label
                        className="text-[11px] uppercase tracking-widest font-semibold font-label"
                        style={{ color: 'var(--color-outline)' }}
                    >
                        Status
                    </label>
                    <div className="flex gap-2">
                        {statusOptions.map(o => {
                            const isActive = status === o.value;
                            const config = statusConfig[o.value];
                            return (
                                <button
                                    key={o.value}
                                    onClick={() => setStatus(o.value)}
                                    className="cursor-pointer flex-1 py-2.5 rounded-xl text-xs font-semibold font-headline transition-all flex items-center justify-center gap-1.5"
                                    style={{
                                        backgroundColor: isActive ? config.bg : 'var(--color-surface-container)',
                                        color: isActive ? config.color : 'var(--color-outline)',
                                        border: isActive ? `1.5px solid ${config.color}` : '1.5px solid transparent',
                                    }}
                                >
                                    <span className="material-symbols-outlined text-[14px]">{config.icon}</span>
                                    {o.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex gap-3 mt-2">
                    <button
                        onClick={handleClose}
                        className="cursor-pointer flex-1 py-3 rounded-xl font-headline font-semibold text-sm transition-all"
                        style={{
                            backgroundColor: 'var(--color-surface-container)',
                            color: 'var(--color-outline)',
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!patientId || !date || !time}
                        className="cursor-pointer flex-1 py-3 rounded-xl font-headline font-semibold text-sm text-white transition-all disabled:opacity-40"
                        style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-container))' }}
                    >
                        Confirmar
                    </button>
                </div>

            </div>
        </Modal>
    );
}