import { SettingsForm } from '../SettingsForm';
import { renderWithProviders, screen, userEvent, waitFor, act } from '@/test/test-utils';

describe('SettingsForm', () => {
  it('should render settings', async () => {
    await renderWithProviders(<SettingsForm />);

    expect(screen.getByLabelText(/profile picture/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update settings/i })).toBeInTheDocument();
  });

  it('should update settings', async () => {
    const { auth } = await renderWithProviders(<SettingsForm />);
    const updatedValue = '-Updated';

    act(() => {
      userEvent.type(screen.getByLabelText(/profile picture/i), updatedValue);
      userEvent.type(screen.getByLabelText(/email/i), updatedValue);
      userEvent.type(screen.getByLabelText(/password/i), updatedValue);
      userEvent.type(screen.getByLabelText(/first name/i), updatedValue);
      userEvent.type(screen.getByLabelText(/last name/i), updatedValue);
      userEvent.click(screen.getByRole('button', { name: /update settings/i }));
    });

    await waitFor(async () => {
      expect(screen.getByText(/saved/i)).toBeInTheDocument();
    });

    const { image, email, firstName, lastName } = auth?.user ?? {};

    expect(screen.getByLabelText(/profile picture/i)).toHaveValue(`${image}${updatedValue}`);
    expect(screen.getByLabelText(/email/i)).toHaveValue(`${email}${updatedValue}`);
    expect(screen.getByLabelText(/password/i)).toHaveValue(updatedValue);
    expect(screen.getByLabelText(/first name/i)).toHaveValue(`${firstName}${updatedValue}`);
    expect(screen.getByLabelText(/last name/i)).toHaveValue(`${lastName}${updatedValue}`);
  });

  it('should not render settings if no valid user', async () => {
    const { container } = await renderWithProviders(<SettingsForm />, { user: null });

    expect(screen.queryByRole('button', { name: /update settings/i })).not.toBeInTheDocument();
    expect(container.getElementsByClassName('alert-danger')?.[0]).toBeInTheDocument();
  });
});
