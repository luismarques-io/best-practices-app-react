import { userGenerator } from '@/test/data-generators';
import { renderWithProviders, screen, userEvent, waitFor } from '@/test/test-utils';

import { RegisterForm } from '../RegisterForm';

it('should register new user and call onSuccess callback', async () => {
  const newUser = userGenerator();
  const onSuccess = jest.fn();
  await renderWithProviders(<RegisterForm onSuccess={onSuccess} autoLoginOnSuccess={false} />, { user: null });
  const [passwordInput, passwordConfirmationInput] = screen.getAllByLabelText(/password/i);
  userEvent.clear(screen.getByLabelText(/username/i));
  userEvent.clear(screen.getByLabelText(/email/i));
  userEvent.clear(passwordInput);
  userEvent.clear(passwordConfirmationInput);

  userEvent.type(screen.getByLabelText(/username/i), newUser.username);
  userEvent.type(screen.getByLabelText(/email/i), newUser.email);
  userEvent.type(passwordInput, newUser.password);
  userEvent.type(passwordConfirmationInput, newUser.password);
  userEvent.click(screen.getByRole('checkbox'));
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => {
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
  const onSuccessArgs = onSuccess.mock.calls[0][0];
  expect(onSuccessArgs.token).toBeUndefined();
});

it('should register and login new user, then call onSuccess callback', async () => {
  const newUser = userGenerator();
  const onSuccess = jest.fn();
  await renderWithProviders(<RegisterForm onSuccess={onSuccess} autoLoginOnSuccess={true} />, { user: null });
  const [passwordInput, passwordConfirmationInput] = screen.getAllByLabelText(/password/i);
  userEvent.clear(screen.getByLabelText(/username/i));
  userEvent.clear(screen.getByLabelText(/email/i));
  userEvent.clear(passwordInput);
  userEvent.clear(passwordConfirmationInput);

  userEvent.type(screen.getByLabelText(/username/i), newUser.username);
  userEvent.type(screen.getByLabelText(/email/i), newUser.email);
  userEvent.type(passwordInput, newUser.password);
  userEvent.type(passwordConfirmationInput, newUser.password);
  userEvent.click(screen.getByRole('checkbox'));
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1), { timeout: 4000 });
  const onSuccessArgs = onSuccess.mock.calls[0][0];
  expect(onSuccessArgs.token).toBeTruthy();
});
