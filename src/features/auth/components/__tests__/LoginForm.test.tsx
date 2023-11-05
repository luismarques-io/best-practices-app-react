import { getExistingUser, renderWithProviders, screen, userEvent, waitFor } from '../../../../test/test-utils';

import { LoginForm } from '../LoginForm';

it('should login new user and call onSuccess callback', async () => {
  const existingUser = getExistingUser();
  const onSuccess = jest.fn();
  await renderWithProviders(<LoginForm onSuccess={onSuccess} />);
  userEvent.clear(screen.getByLabelText(/username/i));
  userEvent.clear(screen.getByLabelText(/password/i));

  userEvent.type(screen.getByLabelText(/username/i), existingUser.username);
  userEvent.type(screen.getByLabelText(/password/i), existingUser.password);
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
});

it('should show error message when login fails', async () => {
  const existingUser = { username: 'invalid-username', password: 'invalid-password' };
  await renderWithProviders(<LoginForm />);

  userEvent.clear(screen.getByLabelText(/username/i));
  userEvent.clear(screen.getByLabelText(/password/i));
  userEvent.type(screen.getByLabelText(/username/i), existingUser.username);
  userEvent.type(screen.getByLabelText(/password/i), existingUser.password);
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(
    () => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    },
    { timeout: 4000 }
  );
});
