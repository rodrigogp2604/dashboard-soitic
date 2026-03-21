import { getActivePatients } from "@/services/dashboard/patient";

export function getPatientsOptions() {
    return getActivePatients().map(p => ({
        label: `${p.name} ${p.surname} — ${p.city}/${p.uf}`,
        value: p.id,
    }));
}