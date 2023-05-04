import { ResponsePromise } from 'ky';
import { ky } from '~/api/kyInstance';

export namespace Records {
  export type Model = {
    id: number;
    brand: string;
    model: string;
    regNumber: string;
    clientFio: string;
    clientPhone: string;
    clientEmail: string;
    individual: string;
    stoId: number;
    lineNumber: number;
    dkAutoType: number;
    dateReceiptStart: number;
    comment: string;
  };

  class Controller {
    readonly url: string;

    constructor(url: string) {
      this.url = url;
    }

    public getAll(): Promise<Model[]> {
      return ky.get(`${this.url}/getAll`).json();
    }

    public getById(id: string): Promise<Model> {
      return ky.get(`${this.url}/${id}`).json();
    }

    public create(values: Partial<Model>): ResponsePromise {
      return ky.post(`${this.url}/`, { json: values });
    }

    public update(id: string, values: Partial<Model>): ResponsePromise {
      return ky.patch(`${this.url}/${id}`, { json: values });
    }

    public remove(id: string): ResponsePromise {
      return ky.delete(`${this.url}/${id}`);
    }
  }

  export const controller = new Controller('/api/dk');
}
