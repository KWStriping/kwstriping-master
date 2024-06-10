import { appPrivateMetafields } from '../fixtures/tempo';
import { prepareGraphqlMetafields, tempoApi } from '../utils';

export const tempoHandlers = [
  tempoApi.query('PrivateMetafieldsInferred', (req, res, ctx) => {
    const { keys } = req.variables;

    if (!keys || typeof keys === 'string' || keys?.length === 0) {
      return res(
        ctx.errors([
          {
            message: 'Missing keys',
            errorType: 'TestError',
          },
        ])
      );
    }

    return res(
      ctx.data({
        app: {
          id: '123',
          privateMetafields: prepareGraphqlMetafields(keys, appPrivateMetafields),
        },
      })
    );
  }),
];
