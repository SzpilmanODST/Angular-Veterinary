import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import('./appointment/appointment-list/appointment-list.component')
    },
    {
        path: "newAppointment",
        loadComponent: () => import('./appointment/appointment-form/appointment-form.component')
    },
    {
        path: ":id/editAppointment",
        loadComponent: () => import('./appointment/appointment-form/appointment-form.component') 
    },
    {
        path: "petOwnerList",
        loadComponent: () => import('./pet-owner/pet-owner-list/pet-owner-list.component')
    },
    {
        path: "newPetOwner",
        loadComponent: () => import('./pet-owner/pet-owner-form/pet-owner-form.component')
    },
    {
        path: ":id/editPetOwner",
        loadComponent: () => import('./pet-owner/pet-owner-form/pet-owner-form.component')
    },
    {
        path: ":id/detailsPetOwner",
        loadComponent: () => import('./pet-owner/pet-owner-details/pet-owner-details.component')
    },
    {
        path: ":id/detailsPetOwner-Appointments",
        loadComponent: () => import('./pet-owner/pet-owner-details/pet-owner-details.component')
    },
    {
        path: ":id/detailsPetOwner-Pets",
        loadComponent: () => import('./pet-owner/pet-owner-details/pet-owner-details.component')
    },
    {
        path: "petList",
        loadComponent: () => import('./pet/pet-list/pet-list.component')
    },
    {
        path: "newPet",
        loadComponent: () => import('./pet/pet-form/pet-form.component')
    },
    {
        path: ":id/editPet",
        loadComponent: () => import('./pet/pet-form/pet-form.component')
    },
    {
        path: ":id/detailsPet",
        loadComponent: () => import('./pet/pet-details/pet-details.component')
    },
    {
        path: "doctorList",
        loadComponent: () => import('./doctor/doctor-list/doctor-list.component')
    },
    {
        path: "newDoctor",
        loadComponent: () => import('./doctor/doctor-form/doctor-form.component')
    },
    {
        path: ":id/editDoctor",
        loadComponent: () => import('./doctor/doctor-form/doctor-form.component')
    },
    {
        path: ":id/detailsDoctor",
        loadComponent: () => import('./doctor/doctor-details/doctor-details.component')
    },
    {
        path: "prescriptionList",
        loadComponent: () => import('./prescription/prescription-list/prescription-list.component')
    },
    {
        path: ":id/editPrescription",
        loadComponent: () => import('./prescription/prescription-form/prescription-form.component')
    },
    {
        path: ":id/detailsPrescription",
        loadComponent: () => import('./prescription/prescription-details/prescription-details.component')
    }
];
