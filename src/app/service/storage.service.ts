import { Injectable } from "@angular/core";
import { LocalUser } from '../model/local.user';
import { STORAGE_KEYS } from '../utils/storage.keys';
import { Observable } from 'rxjs';

@Injectable()

export class StorageService {
    getLocalUser(): LocalUser {  
        let user = localStorage.getItem(STORAGE_KEYS.localUser);

        if (user != null){
            return JSON.parse(user);
        }
        return null;
    }

    setLocalUser(lUser: LocalUser) {
        if (lUser != null){
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(lUser));
        }else{
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
    }
}