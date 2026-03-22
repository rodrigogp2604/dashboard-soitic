import { Appointment } from '../../types/common/appointment';

export async function getAppointments() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`);

    if (!response.ok) throw new Error(`Erro ao acessar os dados: ${response.status}`);

    const dados = await response.json();
    return dados.data as Appointment[];
}

export async function storeAppointment(body: object) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`Erro ao criar agendamento: ${response.status}`);

    const data = await response.json();
    return data.data;
}