export function NotFound() {
  return (
    <div className='container'>
      <div className='row'>
        <div className='mt-5 mb-5'>
          <h1 className='display-4'>Oops!</h1>
          <h2 className='lead'>Sorry, the page you are looking for is not available.</h2>
          <a href='/' className='btn btn-link p-0 mb-2'>
            Go back to home
          </a>
        </div>
      </div>
    </div>
  );
}
