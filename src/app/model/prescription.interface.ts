import { Doctor } from "./doctor.interface";
import { Pet } from "./pet.interface";
import { PetOwner } from "./petOwner.interface";

export interface Prescription {

    id: number;
    ailment: string;
    dayAndHour: Date;
    petOwner: PetOwner;
    pet: Pet;
    doctor: Doctor;
}

