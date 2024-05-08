import { Prescription } from "./prescription.interface";

export interface Doctor {

    id: number;
    name: string;
    lastName: string;
    cellphone: string;
    professionalId: string;
    prescriptions: Prescription[];
}