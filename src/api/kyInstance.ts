import kyVanilla from 'ky';
import { authTokenStorage } from '~libs';
import { Browser } from '~types';

type ApiError = {
  message?: string;
  messages?: string[];
  status?: number;
};

/**
 * API can provide error in JSON format
 */
const parseApiError = async (
  res: Response
): Promise<{ message: string; status: number }> => {
  try {
    const { message, messages }: ApiError = await res.json();
    let errorMessage = 'Error message not provided';

    if (message) {
      errorMessage = message;
    }

    if (messages && messages.length) {
      errorMessage = messages.join('\n');
    }

    return { message: errorMessage, status: res.status };
  } catch {
    // eslint-disable-next-line no-console
    console.warn('API error response is not in JSON format');
    return { message: res.statusText, status: res.status };
  }
};

export const ky = kyVanilla.extend({
  retry: {
    limit: 1,
  },
  timeout: false,
  hooks: {
    afterResponse: [
      async (req, options, res) => {
        if (res.ok) {
          return;
        }

        if (
          res.status === Browser.HttpStatusCode.UNAUTHORIZED &&
          document.location.pathname !== '/auth'
        ) {
          authTokenStorage.remove();
          document.location.reload();
          return;
        }

        const { message, status } = await parseApiError(res);

        throw new Error(`(${status}) ${message}`);
      },
    ],
    beforeRequest: [
      (request) => {
        const token = authTokenStorage.get();
        if (token) {
          request.headers.set('Authorization', token);
        }
      },
    ],
  },
});
