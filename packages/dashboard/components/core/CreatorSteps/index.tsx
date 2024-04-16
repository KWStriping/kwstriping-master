import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC } from 'react';
import styles from './index.module.css';

export interface Step<T> {
  label: string;
  value: T;
}

export interface CreatorStepsProps<T> {
  currentStep: T;
  steps: Array<Step<T>>;
  onStepClick: (step: T) => void;
}

function makeCreatorSteps<T extends string | number>() {
  const CreatorSteps: FC<CreatorStepsProps<T>> = ({ currentStep, steps, onStepClick }) => {
    return (
      <div className={styles.root ?? ''}>
        {steps.map((step, stepIndex) => {
          const visitedStep = steps.findIndex((step) => step.value === currentStep) >= stepIndex;

          return (
            <div
              className={clsx(
                styles.tab ?? '',
                step.value === currentStep && (styles.tabActive ?? ''),
                visitedStep && styles.tabVisited
              )}
              onClick={visitedStep ? () => onStepClick(step.value) : undefined}
              key={step.value}
            >
              <Typography className={styles.label ?? ''} variant="caption">
                {step.label}
              </Typography>
            </div>
          );
        })}
      </div>
    );
  };
  CreatorSteps.displayName = 'CreatorSteps';

  return CreatorSteps;
}

export default makeCreatorSteps;
