import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import styles from './index.module.css';

interface VersionInfoProps {
  dashboardVersion: string;
  coreVersion: string;
}

const VersionInfo: FC<VersionInfoProps> = ({ dashboardVersion, coreVersion }) => {
  if (!dashboardVersion || !coreVersion) return null;

  return (
    <Typography variant="caption" className={styles.container ?? ''}>
      <div className={styles.versionItem ?? ''}>{`dashboard v${dashboardVersion}`}</div>
      <div className={styles.versionItem ?? ''}>{`core v${coreVersion}`}</div>
    </Typography>
  );
};

VersionInfo.displayName = 'VersionInfo';
export default VersionInfo;
