export interface Patient {
    id: number;
    name: string;
    surname: string;
    cpf: string;
    birth_date: string;
    city: string;
    uf: string;
    active: 1 | 0;
    createdAt: string;
    updatedAt: string;
}