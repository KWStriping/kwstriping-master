import * as m from '@paraglide/messages';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { SyntheticEvent } from 'react';
import { useState } from 'react';
import { useFormDataReducer } from '@tempo/forms';
import type { FormStatus } from '@tempo/forms';

const CONTACT_FORM_ENABLED = true;

interface ContactFormData {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [contactFormData, dispatchContactFormData] = useFormDataReducer<ContactFormData>({});

  const handleChange = (field: keyof ContactFormData, value: string) =>
    dispatchContactFormData({ type: 'update', payload: { [field]: value } });

  const handleSubmit = async (event: SyntheticEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    setStatus('submitting');

    // Send the form data to our API and get a response.
    const response = await fetch('/api/contact', {
      // Body of the request is the JSON data we created above.
      body: JSON.stringify(contactFormData),
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // The method is POST because we are sending data.
      method: 'POST',
    });

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    if (result.ok) {
      setStatus('submitted');
    } else if (result.error) {
      console.error(result.error);
      setStatus('error');
    }
  };
  return (
    <>
      <Box
        sx={{
          ...(['submitted', 'error'].includes(status) && {
            position: { sm: 'absolute' },
            top: { sm: 0 },
            left: { sm: 0 },
            width: '100%',
            height: '100%',
          }),
          display: ['submitted', 'error'].includes(status) ? 'flex' : 'none',
          alignItems: { xs: 'start', sm: 'center' },
          justifyContent: 'center',
          p: { xs: 3, sm: 10 },
        }}
      >
        {status === 'error' ? (
          <Typography color="error" sx={{ mb: 2 }}>
            {m.error()}
          </Typography>
        ) : status === 'submitted' ? (
          <Box>
            <Typography>{m.success()}</Typography>
            <Box mt={3} display={'flex'} justifyContent={'center'}>
              <Button
                variant={'outlined'}
                onClick={() => {
                  dispatchContactFormData({ type: 'reset' });
                  setStatus('idle');
                }}
              >
                <RefreshIcon sx={{ mr: 1 }} /> {'Refresh'}
              </Button>
            </Box>
          </Box>
        ) : null}
      </Box>
      <Box
        sx={{
          my: -2,
          visibility: ['idle', 'submitting'].includes(status) ? 'visible' : 'hidden',
          display: {
            xs: ['submitted', 'error'].includes(status) ? 'none' : 'block',
            sm: 'block',
          },
        }}
      >
        <form onSubmit={handleSubmit} style={{ width: '100%', position: 'relative' }}>
          <TextField
            label={m.nameFieldLabel()}
            name={'name'}
            value={contactFormData.name ?? ''}
            onChange={(event) => handleChange('name', event.target.value)}
            fullWidth
            required
            margin={'dense'}
          />
          <TextField
            label={m.emailFieldLabel()}
            name={'email'}
            value={contactFormData.email ?? ''}
            onChange={(event) => handleChange('email', event.target.value)}
            fullWidth
            required
            margin={'dense'}
          />
          <TextField
            label={m.messageFieldLabel()}
            name={'message'}
            value={contactFormData.message ?? ''}
            onChange={(event) => handleChange('message', event.target.value)}
            fullWidth
            multiline
            required
            margin={'normal'}
            rows={4}
          />
          <Box textAlign="center">
            <Button
              type="submit"
              variant={'outlined'}
              size={'large'}
              sx={{ my: 2, mx: 'auto' }}
              disabled={!CONTACT_FORM_ENABLED}
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit'}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
