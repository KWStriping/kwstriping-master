import Typography from '@mui/material/Typography';

export const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center pt-12">
      <div className="w-full flex justify-center">
        {/* <img src={getSvgSrc(TempoLogo)} alt="logo" className="logo" /> */}
      </div>
      <div className="h-full flex flex-col items-center justify-center mb-22">
        <Typography className="mb-6 max-w-85 text-center">
          {/* {t(pageNotFoundMessages.subtitle.id, pageNotFoundMessages.subtitle.defaultMessage)} */}
        </Typography>
        {/* <Button
          ariaLabel={t(emptyCartLabels.goBackToStore)}
          onClick={goBack}
          color="secondary"
          label={t(emptyCartMessages.goBackToStore.id, emptyCartMessages.goBackToStore.defaultMessage)}
        /> */}
      </div>
    </div>
  );
};
