import React, { useCallback, useState } from 'react';
import { Button } from 'devextreme-react/ui/button';
import { bemHelper } from '~libs';
import './styles.scss';

const cn = bemHelper({ name: 'error-info', prefix: 'error-boundary-' });

type TErrorInfo = {
  componentStack: string;
  error: string;
};

export const ErrorInfo: React.FC<TErrorInfo> = (props) => {
  const { error, componentStack } = props;

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const reloadPage = useCallback(() => {
    window.location.reload();
  }, []);

  const toggleDetails = useCallback(() => {
    setIsDetailsOpen((prevState) => !prevState);
  }, [setIsDetailsOpen]);

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <div className={cn('notification')}>
          Во время работы приложения произошла непредвиденная ошибка. Попробуйте
          <Button
            className={cn('reload-button')}
            onClick={reloadPage}
            text="обновить"
          />
          страницу.
          <br />
          Если ошибка повторяется, пожалуйста, обратитесь в техподдержку сообщив
          следующие детали:
        </div>
        <Button
          className={cn('details-button')}
          onClick={toggleDetails}
          stylingMode="outlined"
          text={
            isDetailsOpen ? 'Скрыть детали ошибки' : 'Показать детали ошибки'
          }
          type="danger"
        />
        {isDetailsOpen && (
          <div className={cn('details')}>
            <p>{error}</p>
            <pre className={cn('details-wrap')}>{componentStack}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
