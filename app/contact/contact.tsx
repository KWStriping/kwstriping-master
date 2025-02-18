'use client';

import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import Typography from '@mui/material/Typography';

interface ContactPageProps {
  shopPhone?: string;
  shopEmail?: string;
}

function Contact({ shopPhone, shopEmail }: ContactPageProps) {
  return (
    <>
      <div className="h-full flex justify-center items-center min-w-[50%] min-h-[20%] bg-white/75 p-10">
        <div className="h-full w-full flex flex-col items-center justify-center">
          <Typography variant={'h1'} className={'mb-4'}>
            {'Contact us'}
          </Typography>
          {shopPhone && (
            <div className={'flex gap-4 items-center'}>
              <PhoneIcon />
              <Typography className={'text-lg my-4'}>{shopPhone ?? 'XXX-XXX-XXXX'}</Typography>
              <Typography>{'(Kris)'}</Typography>
            </div>
          )}
          {shopEmail && (
            <div className={'flex gap-4 items-center'}>
              <MailIcon />
              <Typography className={'text-lg my-4'}>{shopEmail}</Typography>
            </div>
          )}
          {!shopPhone && !shopEmail && (
            <Typography className={'text-lg my-4'}>
              {'No contact information available'}
            </Typography>
          )}
        </div>
      </div>
    </>
  );
}

export default Contact;
