import { getExistingUser, renderWithProviders, screen, userEvent, waitFor } from '../../../../test/test-utils';

import { RegisterForm } from '../RegisterForm';

it('should register new user and call onSuccess callback', async () => {
  const existingUser = getExistingUser();
  const onSuccess = jest.fn();
  await renderWithProviders(<RegisterForm onSuccess={onSuccess} autoLoginOnSuccess={false} />);
  const [passwordInput, passwordConfirmationInput] = screen.getAllByLabelText(/password/i);
  userEvent.clear(screen.getByLabelText(/username/i));
  userEvent.clear(screen.getByLabelText(/email/i));
  userEvent.clear(passwordInput);
  userEvent.clear(passwordConfirmationInput);

  userEvent.type(screen.getByLabelText(/username/i), existingUser.username);
  userEvent.type(screen.getByLabelText(/email/i), existingUser.email);
  userEvent.type(passwordInput, existingUser.password);
  userEvent.type(passwordConfirmationInput, existingUser.password);
  userEvent.click(screen.getByRole('checkbox'));
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1), { timeout: 4000 });
  const onSuccessArgs = onSuccess.mock.calls[0][0];
  expect(onSuccessArgs.token).toBeUndefined();
});

it('should register and login new user and call onSuccess callback', async () => {
  const existingUser = getExistingUser();
  const onSuccess = jest.fn();
  await renderWithProviders(<RegisterForm onSuccess={onSuccess} autoLoginOnSuccess={true} />);
  const [passwordInput, passwordConfirmationInput] = screen.getAllByLabelText(/password/i);
  userEvent.clear(screen.getByLabelText(/username/i));
  userEvent.clear(screen.getByLabelText(/email/i));
  userEvent.clear(passwordInput);
  userEvent.clear(passwordConfirmationInput);

  userEvent.type(screen.getByLabelText(/username/i), existingUser.username);
  userEvent.type(screen.getByLabelText(/email/i), existingUser.email);
  userEvent.type(passwordInput, existingUser.password);
  userEvent.type(passwordConfirmationInput, existingUser.password);
  userEvent.click(screen.getByRole('checkbox'));
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1), { timeout: 4000 });
  const onSuccessArgs = onSuccess.mock.calls[0][0];
  expect(onSuccessArgs.token).toBeTruthy();
});
