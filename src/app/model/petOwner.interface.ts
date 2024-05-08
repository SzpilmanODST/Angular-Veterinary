import { Appointment } from "./appointment.interface";
import { Pet } from "./pet.interface";


export interface PetOwner {

    id: number;
    name: string;
    lastName: string;
    cellphone: string;
    email: string;
    appointments: Appointment[];
    pets: Pet[];
}

