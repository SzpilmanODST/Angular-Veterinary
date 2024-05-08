import { PetOwner } from "./petOwner.interface";
import { Prescription } from "./prescription.interface";

export interface Pet {

    id: number;
    name: string;
    gender: string;
    species: string;
    breed: string;
    age: number;
    weight: number;
    petOwner: PetOwner;
    prescriptions: Prescription[];

}