import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import PhotoIcon from '@dashboard/assets/images/photo-icon.svg';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import type {
  StaffErrorFragment,
  StaffMemberDetailsFragment,
  UserFragment,
} from '@tempo/api/generated/graphql';
import { getUserInitials } from '@tempo/utils/user';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getStaffErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/staff';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { FC, ChangeEvent } from 'react';

const useStyles = makeStyles(
  (theme) => ({
    avatar: {
      '& svg': {
        fill: '#fff',
      },
      '&:hover $avatarHover': {
        opacity: 1,
      },
      alignItems: 'center',
      borderRadius: '100%',
      display: 'grid',
      height: 120,
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      width: 120,
    },
    avatarActionText: {
      '&:hover': {
        textDecoration: 'underline',
      },
      color: '#fff',
      cursor: 'pointer',
      fontSize: 12,
    },
    avatarDefault: {
      '& div': {
        color: theme.vars.palette.primary.contrastText,
        fontSize: 35,
        fontWeight: 'bold',
        lineHeight: '120px',
      },
      background: theme.vars.palette.primary.main,
      height: 120,
      textAlign: 'center',
      width: 120,
    },
    avatarHover: {
      background: '#00000080',
      borderRadius: '100%',
      fontSize: 12,
      fontWeight: 500,
      height: 120,
      opacity: 0,
      padding: theme.spacing(2.5, 0),
      position: 'absolute',
      textAlign: 'center',
      textTransform: 'uppercase',
      transition: 'opacity 0.5s',
      width: 120,
    },
    avatarImage: {
      pointerEvents: 'none',
      width: '100%',
    },
    fileField: {
      display: 'none',
    },
    prop: {
      marginBottom: theme.spacing(2),
    },
    propGrid: {
      display: 'grid',
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(1),
      gridTemplateColumns: '1fr 1fr',
      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: '1fr',
      },
    },
    root: {
      display: 'grid',
      gridColumnGap: theme.spacing(4),
      gridTemplateColumns: '120px 1fr',
    },
  }),
  { name: 'StaffProperties' }
);

interface StaffPropertiesProps {
  canEditAvatar: boolean;
  className?: string;
  data: {
    email: string;
    firstName: string;
    lastName: string;
  };
  errors: StaffErrorFragment[];
  disabled: boolean;
  staffMember: StaffMemberDetailsFragment | UserFragment;
  onChange: (event: ChangeEvent<unknown>) => void;
  onImageDelete: () => void;
  onImageUpload: (file: File) => void;
}

const StaffProperties: FC<StaffPropertiesProps> = (props) => {
  const {
    canEditAvatar,
    className,
    data,
    errors,
    staffMember,
    onChange,
    onImageDelete,
    onImageUpload,
  } = props;
  const styles = {};
  const imgInputAnchor = createRef<HTMLInputElement>();

  const clickImgInput = () => imgInputAnchor.current.click();
  const formErrors = getFormErrors(['id', 'firstName', 'lastName', 'email'], errors || []);

  const hasAvatar = !!staffMember?.avatar?.url;

  const getFieldProps = (name: string) => ({
    disabled: props.disabled,
    error: !!formErrors[name],
    helperText: formErrors[name]?.message,
    label: m[commonMessages[name]],
    name,
    value: data[name],
  });

  return (
    <Card className={className}>
      <CardTitle
        title={
          m.dashboard_TITVe() ?? 'Staff Member Information'
          // section header
        }
      />
      <CardContent>
        <div className={styles.root ?? ''}>
          <div>
            <div className={styles.avatar ?? ''}>
              {hasAvatar ? (
                <img className={styles.avatarImage ?? ''} src={staffMember.avatar.url} />
              ) : (
                <div className={styles.avatarDefault ?? ''}>
                  <Typography>{getUserInitials(data)}</Typography>
                </div>
              )}
              {canEditAvatar && (
                <div className={styles.avatarHover ?? ''}>
                  <PhotoIcon />
                  <Typography onClick={clickImgInput} className={styles.avatarActionText ?? ''}>
                    <>
                      {t(
                        '+2VzH4',
                        'Change'
                        // avatar change button
                      )}
                    </>
                  </Typography>
                  {hasAvatar && (
                    <>
                      <Typography
                        onClick={onImageDelete}
                        className={styles.avatarActionText ?? ''}
                      >
                        <>
                          {/* avatar delete button */}

                          {m.dashboard__lR_V() ?? 'Delete'}
                        </>
                      </Typography>
                    </>
                  )}
                  <input
                    className={styles.fileField ?? ''}
                    id="fileUpload"
                    onChange={(event) => onImageUpload(event.target.files[0])}
                    type="file"
                    ref={imgInputAnchor}
                  />
                </div>
              )}
            </div>
          </div>
          <div>
            <div className={styles.propGrid ?? ''}>
              <div className={styles.prop ?? ''}>
                <TextField
                  {...getFieldProps('firstName')}
                  onChange={onChange}
                  fullWidth
                  inputProps={{
                    spellCheck: false,
                    'data-test-id': 'staffFirstName',
                  }}
                />
              </div>
              <div className={styles.prop ?? ''}>
                <TextField
                  {...getFieldProps('lastName')}
                  onChange={onChange}
                  fullWidth
                  inputProps={{
                    spellCheck: false,
                    'data-test-id': 'staffLastName',
                  }}
                />
              </div>
              <div className={styles.prop ?? ''}>
                <TextField
                  {...getFieldProps('email')}
                  onChange={onChange}
                  fullWidth
                  inputProps={{
                    spellCheck: false,
                    'data-test-id': 'staffEmail',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      {!!formErrors.id && (
        <CardContent>
          <Typography color="error">{getStaffErrorMessage(formErrors.id, t)}</Typography>
        </CardContent>
      )}
    </Card>
  );
};
StaffProperties.displayName = 'StaffProperties';
export default StaffProperties;
