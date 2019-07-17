import {Log, User, UserManager} from 'oidc-client';

import {Constants} from '../helpers/Constants';

export class AuthService {
    public userManager: UserManager;

    constructor() {
        const settings = {
            client_id: 'cscorespa',
            redirect_uri: 'http://10.151.137.221:5100/#/callback',
            response_type: 'token id_token',
            scope: "openid profile CSCoreApi",
            authority: 'http://10.151.137.228:5000',
            silent_redirect_uri: 'http://10.151.137.221:5100/silentRenew.html',
            automaticSilentRenew: true,
            filterProtocolClaims: true,
            loadUserInfo: true,
            monitorSession: true
        };
        this.userManager = new UserManager(settings);

        Log.logger = console;
        Log.level = Log.INFO;
    }

    public getUser(): Promise<User | null> {
        return this.userManager.getUser();
    }

    public login(): Promise<void> {
        return this.userManager.signinRedirect();
    }

    public renewToken(): Promise<User> {
        return this.userManager.signinSilent();
    }

    public logout(): Promise<void> {
        return this.userManager.signoutRedirect();
    }
}
