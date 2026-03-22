import { getActivePatients } from "@/services/dashboard/patient";

export async function getPatientsOptions() {
    const patients = await getActivePatients();
    return patients.map(p => ({
        label: `${p.name} ${p.surname} — ${p.city}/${p.uf}`,
        value: p.id,
    }));
}