import { Link } from 'react-router-dom';
import { APP_TITLE } from '../../config';

export function Footer() {
  return (
    <footer className='footer mt-auto pt-4 bg-body-tertiary text-body-secondary small'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-4  mb-3'>
            <h5>
              <Link to='/' className='me-3' style={{ textDecoration: 'none' }}>
                {APP_TITLE}
              </Link>
            </h5>

            <p>An example of feature-driven architecture in React.</p>
          </div>
          <div className='col-6 col-md-2 mb-3'>
            <h5>Auth</h5>
            <ul className='nav flex-column'>
              <li className='nav-item mb-2'>
                <Link to='/login' className='nav-link p-0 text-body-secondary'>
                  Login
                </Link>
              </li>
              <li className='nav-item mb-2'>
                <Link to='/login?redirect=/posts/add' className='nav-link p-0 text-body-secondary'>
                  Login w/ redirect to protected route
                </Link>
              </li>
              <li className='nav-item mb-2'>
                <Link to='/register' className='nav-link p-0 text-body-secondary'>
                  Register
                </Link>
              </li>
            </ul>
          </div>
          <div className='col-6 col-md-2 mb-3'>
            <h5>User</h5>
            <ul className='nav flex-column'>
              <li className='nav-item mb-2'>
                <Link to='/settings' className='nav-link p-0 text-body-secondary'>
                  Settings
                </Link>
              </li>
              <li className='nav-item mb-2'>
                <Link to='/profile' className='nav-link p-0 text-body-secondary'>
                  My Profile
                </Link>
              </li>
              <li className='nav-item mb-2'>
                <Link to='/profile/1' className='nav-link p-0 text-body-secondary'>
                  User Profile (id: 1)
                </Link>
              </li>
            </ul>
          </div>
          <div className='col-6 col-md-2 mb-3'>
            <h5>Posts</h5>
            <ul className='nav flex-column'>
              <li className='nav-item mb-2'>
                <Link to='/posts' className='nav-link p-0 text-body-secondary'>
                  Posts List
                </Link>
              </li>
              <li className='nav-item mb-2'>
                <Link to='posts/1' className='nav-link p-0 text-body-secondary'>
                  Post (id: 1)
                </Link>
              </li>
              <li className='nav-item mb-2'>
                <Link to='posts/add' className='nav-link p-0 text-body-secondary'>
                  Create Post
                </Link>
              </li>
              <li className='nav-item mb-2'>
                <Link to='posts/1/edit' className='nav-link p-0 text-body-secondary'>
                  Edit Post (id: 1)
                </Link>
              </li>
              <li className='nav-item mb-2'>
                <Link to='posts/invalid-post' className='nav-link p-0 text-body-secondary'>
                  Invalid Post
                </Link>
              </li>
            </ul>
          </div>
          <div className='col-6 col-md-2 mb-3'>
            <h5>Other</h5>
            <ul className='nav flex-column'>
              <li className='nav-item mb-2'>
                <Link to='/' className='nav-link p-0 text-body-secondary'>
                  Home
                </Link>
              </li>
              <li className='nav-item mb-2'>
                <Link to='/unknown-page' className='nav-link p-0 text-body-secondary'>
                  Page Not Found
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
