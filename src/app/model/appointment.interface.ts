import { PetOwner } from "./petOwner.interface";

export interface Appointment {

    id: number;
    dayAndHour: Date;
    petOwner: PetOwner;
    prescription: any;
}