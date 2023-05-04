import { ky } from '~/api/kyInstance';

export namespace AutoType {
  export type Model = {
    id: number;
    name: string;
    description: string;
    duration: number;
    comment: string;
  };

  export class Controller {
    readonly url: string;

    constructor(url: string) {
      this.url = url;
    }

    public getAll(): Promise<Model[]> {
      return ky.get(`${this.url}`).json();
    }

    public getById(id: string): Promise<Model[]> {
      return ky.get(`${this.url}/${id}`).json();
    }
  }

  export const controller = new Controller('/api/dk/dkAutoType');
}
