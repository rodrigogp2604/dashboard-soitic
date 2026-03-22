import dados from '@/data/patients.json'
import { Patient } from '@/types/common/patient'

export async function getPatients(): Promise<Patient[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patients`);
    
     if (!response.ok) throw new Error(`Erro ao acessar os dados: ${response.status}`);

     const dados = await response.json();
     return dados.data as Patient[];
}

export async function getActivePatients(): Promise<Patient[]> {
    const patients = await getPatients();
    return patients.filter(patient => patient.active === 1);
}