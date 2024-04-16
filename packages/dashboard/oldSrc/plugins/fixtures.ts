import { ConfigurationTypeFieldEnum } from '@core/api/constants';
import type { PluginBaseFragment, PluginsDetailsFragment } from '@core/api/graphql';

export const pluginList: PluginBaseFragment[] = [
  {
    __typename: 'Plugin',
    globalConfiguration: null,
    channelConfigurations: [
      {
        __typename: 'PluginConfiguration',
        active: true,
        channel: {
          __typename: 'Channel',
          id: 'channel-1',
          name: 'channel 1',
          slug: 'channel-1',
        },
      },
    ],
    description:
      'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. Ut molestie a, ultricies porta urna. Vestibulum commodo volutpat a, convallis ac, laoreet enim. Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna.',
    id: 'Jzx123sEt==',
    name: 'Avalara',
  },
  {
    __typename: 'Plugin',
    globalConfiguration: null,
    channelConfigurations: [
      {
        __typename: 'PluginConfiguration',
        active: true,
        channel: {
          __typename: 'Channel',
          id: 'channel-1',
          name: 'channel 1',
          slug: 'channel-1',
        },
      },
    ],
    description:
      'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. Ut molestie a, ultricies porta urna. Vestibulum commodo volutpat a, convallis ac, laoreet enim. Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna.',
    id: 'Jzx123sEt==',
    name: 'VatLayer',
  },
];
export const plugin: PluginsDetailsFragment = {
  __typename: 'Plugin',
  globalConfiguration: null,
  channelConfigurations: [
    {
      __typename: 'PluginConfiguration',
      active: true,
      channel: {
        __typename: 'Channel',
        id: 'channel-1',
        name: 'channel 1',
        slug: 'channel-1',
      },
      configuration: [
        {
          __typename: 'ConfigurationItem',
          helpText: 'Provide user or account details',
          label: 'Username or account',
          name: 'Username or account',
          type: ConfigurationTypeFieldEnum.String,
          value: 'avatax_user',
        },
        {
          __typename: 'ConfigurationItem',
          helpText: 'Provide password or license details',
          label: 'Password or license',
          name: 'Password or license',
          type: ConfigurationTypeFieldEnum.String,
          value: 'TEM8S2-2ET83-CGKP1-DPSI2-EPZO1',
        },
        {
          __typename: 'ConfigurationItem',
          helpText: 'This key will enable you to connect to Avatax API',
          label: 'API key',
          name: 'apiKey',
          type: ConfigurationTypeFieldEnum.Secret,
          value: '9ab9',
        },
        {
          __typename: 'ConfigurationItem',
          helpText: '',
          label: 'Password',
          name: 'password',
          type: ConfigurationTypeFieldEnum.Password,
          value: '',
        },
        {
          __typename: 'ConfigurationItem',
          helpText: '',
          label: 'Empty Password',
          name: 'password-not-set',
          type: ConfigurationTypeFieldEnum.Password,
          value: null,
        },
        {
          __typename: 'ConfigurationItem',
          helpText: 'Determines if Tempo should use Avatax sandbox API.',
          label: 'Use sandbox',
          name: 'Use sandbox',
          type: ConfigurationTypeFieldEnum.Boolean,
          value: 'true',
        },
        {
          __typename: 'ConfigurationItem',
          helpText: 'This is a multiline field',
          label: 'Multiline Field',
          name: 'multiline-field',
          type: ConfigurationTypeFieldEnum.Multiline,
          value:
            'Lorem ipsum\ndolor sit\namet enim.\nEtiam ullamcorper.\nSuspendisse a\npellentesque dui,\nnon felis.',
        },
      ],
    },
  ],
  description:
    'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. Ut molestie a, ultricies porta urna. Vestibulum commodo volutpat a, convallis ac, laoreet enim. Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna.',
  id: 'UGx1Z2luQ29uZmlndXJhdGlvbjoy',
  name: 'Username or account',
};
