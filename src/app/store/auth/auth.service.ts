import { Injectable } from '@angular/core';
import { UtilsService } from 'src/app/modules/shared/services/global/utils.service';
import { of, from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private utilsService: UtilsService) {}

    login(username: string) {
        // Simulating request to a server
        const requestToServer = this.utilsService.sleep(1500);
        return from(requestToServer);
    }
}
