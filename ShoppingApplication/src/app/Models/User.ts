import { PathLocationStrategy } from '@angular/common';
import { Photo } from './photo';

export interface User {
    id: number;
    username: string;
    knownAs: string;
    age: string;
    gender: string;
    created: Date;
    lastActive: Date;
    photoUrl: string;
    city: string;
    country: string;
    interest?: string;
    introduction?: string;
    lookingFor?: string;
    photos?: Photo[];

}
