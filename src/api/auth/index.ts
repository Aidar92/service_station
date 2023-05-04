import { Common } from '~types';

export namespace Auth {
  export type LogInParams = {
    credentials: { login: string; password: string };
  };

  export type UserPermissionDto = {
    description: string;
    id: Common.Permissions;
    shortId: string;
  };

  export type UserData = {
    isActive: boolean;
    login: string;
    name: string;
    permissions: UserPermissionDto[];
    roles: {
      id: string;
      isActive: boolean;
      name: string;
      permissions: UserPermissionDto[];
    }[];
  };

  export type Model = {
    expiresAt: number;
    subject: string;
    token: string;
  };

  class Controller {
    readonly url: string;

    constructor(url: string) {
      this.url = url;
    }

    public getUserData(): Promise<UserData> {
      return new Promise<Auth.UserData>((resolve) => {
        resolve({
          login: this.url,
          isActive: true,
          permissions: [],
          roles: [],
          name: 'sadasdda',
        });
      });
    }

    public logIn(params: LogInParams): Promise<Model> {
      return new Promise<Auth.Model>((resolve) => {
        if (params)
          resolve({
            token: 'gsfgsf',
            expiresAt: 123,
            subject: this.url,
          });
        else throw new Error('o_O');
      });
    }

    public renewToken(): Promise<Model> {
      return new Promise<Auth.Model>((resolve) => {
        resolve({
          token: 'gsfgsf',
          expiresAt: 123,
          subject: this.url,
        });
      });
    }
  }

  export const controller = new Controller('');
}
