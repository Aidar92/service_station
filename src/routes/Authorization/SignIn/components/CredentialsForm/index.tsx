import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Form,
  ButtonItem,
  SimpleItem,
  RequiredRule,
} from 'devextreme-react/form';

type Props = {
  authInProgress: boolean;
  onSubmit: (credentials: { login: string; password: string }) => void;
};

export const CredentialsForm: React.FC<Props> = (props) => {
  const { authInProgress, onSubmit } = props;

  const { t } = useTranslation('sign-in');

  const [formFields] = useState({
    login: '',
    password: '',
  });

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit(formFields);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Form formData={formFields}>
        <SimpleItem
          dataField="login"
          editorOptions={{
            disabled: authInProgress,
          }}
          editorType="dxTextBox"
          label={{ text: t('CredentialsForm.Login') }}
        >
          <RequiredRule message={t('CredentialsForm.Login required')} />
        </SimpleItem>
        <SimpleItem
          dataField="password"
          editorOptions={{
            disabled: authInProgress,
            mode: 'password',
          }}
          editorType="dxTextBox"
          label={{ text: t('CredentialsForm.Password') }}
        >
          <RequiredRule message={t('CredentialsForm.Password required')} />
        </SimpleItem>
        <ButtonItem
          buttonOptions={{
            disabled: authInProgress,
            text: t('Sign in'),
            useSubmitBehavior: true,
          }}
        />
      </Form>
    </form>
  );
};
