import { getLast6MonthsData } from "@/lib/appointments/utils";
import { AppointmentChartProps } from "@/types/dashboard/appointmentChartProps";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AppointmentChart({ appointments }: AppointmentChartProps) {
    const data = getLast6MonthsData(appointments);

    return (
        <div
            className="p-6 rounded-2xl shadow-[0px_4px_12px_rgba(0,70,95,0.04)]"
            style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
        >
            <div className="mb-6">
                <h2 className="font-headline text-xl font-bold" style={{ color: 'var(--color-on-surface)' }}>
                    Evolução de Agendamentos
                </h2>
                <p className="text-[11px] uppercase tracking-widest font-semibold mt-0.5" style={{ color: 'var(--color-outline)' }}>
                    Últimos 6 meses
                </p>
            </div>

            <ResponsiveContainer width="100%" height={220}>
                <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-outline-variant)" opacity={0.4} />
                    <XAxis dataKey="mes" tick={{ fontSize: 11, fill: 'var(--color-outline)', fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: 'var(--color-outline)', fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--color-surface-container-lowest)',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0px 4px 12px rgba(0,70,95,0.08)',
                            fontFamily: 'Inter',
                            fontSize: '12px',
                            color: 'var(--color-on-surface)',
                        }}
                        labelStyle={{ color: 'var(--color-outline)', fontWeight: 600 }}
                        formatter={(value) => [value ?? 0, 'Agendamentos']}
                    />
                    <Line
                        type="monotone"
                        dataKey="agendamentos"
                        stroke="var(--color-primary-container)"
                        strokeWidth={2.5}
                        dot={{ fill: 'var(--color-primary-container)', r: 4, strokeWidth: 0 }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}