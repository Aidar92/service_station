import { ResponsePromise } from 'ky';
import { ky } from '~/api/kyInstance';

export namespace Sto {
  export type Model = {
    id: number;
    uid: string;
    vehicleId: number;
    brand: string;
    model: string;
    regNumber: string;
    dkAutoTypeId: number;
    dkAutoTypeName: string;
    dkAutoTypeDescription: string;
    dkAutoTypeDuration: number;
    clientId: number;
    clientFio: string;
    clientPhone: string;
    clientEmail: string;
    clientCategoryId: number;
    clientCategory: string;
    stoId: number;
    stoName: string;
    mileage: number;
    dateCreated: string;
    dateReceiptStart: string;
    dateReceiptFinish: string;
    dateCheck: string;
    priceSto: number;
    priceClient: number;
    approvedStatusId: number;
    approvedStatusName: string;
    validity: number;
    agentId: number;
    agentName: string;
    staffId: number;
    staffFio: string;
    lineNumber: number;
    comment: string;
  };

  class Controller {
    readonly url: string;

    constructor(url: string) {
      this.url = url;
    }

    public getAll(): Promise<Model[]> {
      return ky.get(`${this.url}`).json();
    }

    public getOrderInfo(params: {
      date: string;
      days: number;
    }): Promise<Model[]> {
      const { date, days } = params;
      return ky
        .get(`${this.url}/order`, {
          searchParams: [
            ['date', date],
            ['days', days],
          ],
        })
        .json();
    }

    public getById(id: string): Promise<Model> {
      return ky.get(`${this.url}/${id}`).json();
    }

    public create(values: Partial<Model>): ResponsePromise {
      return ky.post(`${this.url}`, { json: values });
    }

    public update(id: string, values: Partial<Model>): ResponsePromise {
      return ky.patch(`${this.url}/${id}`, {
        json: values,
      });
    }

    public remove(id: string): ResponsePromise {
      return ky.delete(`${this.url}/${id}`);
    }
  }

  export const controller = new Controller('/api/dk/sto');
}
