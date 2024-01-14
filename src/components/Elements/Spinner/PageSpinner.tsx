export const PageSpinner = () => {
  return (
    <div className='d-flex justify-content-center my-5'>
      <div className='spinner-grow' style={{ width: '3rem', height: '3rem' }} data-testid='loading'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  );
};
