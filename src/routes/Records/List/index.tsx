import React, { useCallback } from 'react';
import {
  ISchedulerOptions,
  Resource,
  Scheduler,
} from 'devextreme-react/scheduler';
import { useTranslation } from 'react-i18next';
import { createCustomStore } from '~/custom-data-sources';
import { AutoType, Records, Sto } from '~api';

const dataSource = {
  records: {
    store: createCustomStore({
      key: 'id',
      load: async (loadOptions) => {
        const startDate = new Date(loadOptions.filter[0][0][0][2]);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(loadOptions.filter[0][0][1][2]);
        endDate.setHours(0, 0, 0, 0);
        const data = await Sto.controller.getOrderInfo({
          days: Math.abs(endDate.getDate() - startDate.getDate()) + 1,
          date: new Date(loadOptions.filter[0][0][0][2])
            .toISOString()
            .split('T')[0],
        });
        return { data };
      },
      byKey: (key) => Records.controller.getById(key),
      insert: (values) => {
        delete values.text;
        delete values.allDay;
        delete values.dateReceiptFinish;
        return Records.controller.create(values);
      },
      update: (key, values) => Records.controller.update(key, values),
      remove: (key) => Records.controller.remove(key),
    }),
  },
  priorities: [
    {
      id: 1,
      title: 'Линия 1',
    },
    {
      id: 2,
      title: 'Линия 2',
    },
    {
      id: 3,
      title: 'Линия 3',
    },
    {
      id: 4,
      title: 'Линия 4',
    },
  ],
  dkAutoType: createCustomStore({
    key: 'id',
    load: async () => {
      const data = await AutoType.controller.getAll();
      return { data };
    },
  }),
  sto: createCustomStore({
    key: 'id',
    load: async () => {
      const data = await Sto.controller.getAll();
      return { data };
    },
  }),
};

const currentDate = new Date();

export const RecordsList: React.FC = () => {
  const { t } = useTranslation('records');

  const appointmentFormOpeningHandle = useCallback<
    NonNullable<ISchedulerOptions['onAppointmentFormOpening']>
  >(
    (evt) => {
      evt.form.option('items', [
        {
          label: {
            text: t('brand'),
          },
          dataField: 'brand',
          editorType: 'dxTextBox',
          editorOptions: {
            width: '100%',
          },
        },
        {
          label: {
            text: t('model'),
          },
          dataField: 'model',
          editorType: 'dxTextBox',
          editorOptions: {
            width: '100%',
          },
        },
        {
          label: {
            text: t('regNumber'),
          },
          dataField: 'regNumber',
          editorType: 'dxTextBox',
          editorOptions: {
            width: '100%',
          },
        },
        {
          label: {
            text: t('clientFio'),
          },
          dataField: 'clientFio',
          editorType: 'dxTextBox',
          editorOptions: {
            width: '100%',
          },
        },
        {
          label: {
            text: t('clientPhone'),
          },
          dataField: 'clientPhone',
          editorType: 'dxTextBox',
          editorOptions: {
            width: '100%',
          },
        },
        {
          label: {
            text: t('clientEmail'),
          },
          dataField: 'clientEmail',
          editorType: 'dxTextBox',
          editorOptions: {
            width: '100%',
          },
        },
        {
          label: {
            text: t('individual'),
          },
          dataField: 'individual',
          editorType: 'dxNumberBox',
          editorOptions: {
            width: '100%',
          },
        },
        {
          label: {
            text: t('sto'),
          },
          dataField: 'stoId',
          editorType: 'dxSelectBox',
          editorOptions: {
            dataSource: dataSource.sto,
            displayExpr: 'name',
            valueExpr: 'id',
          },
        },
        {
          label: {
            text: t('dkAutoType'),
          },
          dataField: 'dkAutoTypId',
          editorType: 'dxSelectBox',
          editorOptions: {
            dataSource: dataSource.dkAutoType,
            displayExpr: 'name',
            valueExpr: 'id',
          },
        },
        {
          label: {
            text: t('dateReceiptStart'),
          },
          dataField: 'dateReceiptStart',
          editorType: 'dxDateBox',
          editorOptions: {
            width: '100%',
          },
        },
        {
          label: {
            text: t('comment'),
          },
          dataField: 'comment',
          editorType: 'dxTextArea',
          editorOptions: {
            width: '100%',
          },
        },
      ]);
    },
    [t]
  );

  return (
    <Scheduler
      crossScrollingEnabled
      dataSource={dataSource.records}
      defaultCurrentDate={currentDate}
      endDateExpr="dateReceiptFinish"
      groups={['lineNumber']}
      height="100%"
      onAppointmentFormOpening={appointmentFormOpeningHandle}
      remoteFiltering
      startDateExpr="dateReceiptStart"
      textExpr="agentName"
      width="100%"
    >
      <Resource
        allowMultiple="false"
        dataSource={dataSource.priorities}
        displayExpr="title"
        fieldExpr="lineNumber"
        label={t('lineNumber')}
      />
      <Resource
        allowMultiple="false"
        dataSource={dataSource.sto}
        displayExpr="name"
        fieldExpr="stoId"
        label={t('sto')}
      />
    </Scheduler>
  );
};
