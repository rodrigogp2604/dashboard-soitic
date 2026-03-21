import dados from '@/data/patients.json'
import { Patient } from '@/types/common/patient'

export function getPatients(): Patient[] {
    return dados as Patient[];
}

export function getActivePatients(): Patient[] {
    const patients = getPatients();
    return patients.filter(patient => patient.active === 1);
}