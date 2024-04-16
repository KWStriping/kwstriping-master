import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { DatagridProps } from './_Datagrid';

export const Datagrid: ComponentType<DatagridProps> = dynamic(() => import('./_Datagrid'), {
  ssr: false,
});

export default Datagrid;
