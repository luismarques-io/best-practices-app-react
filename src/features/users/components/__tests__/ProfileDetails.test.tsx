import { ProfileDetails } from '../ProfileDetails';
import { createUser, renderWithProviders } from '@/test/test-utils';

describe('ProfileDetails', () => {
  it('renders public user details', async () => {
    const newUser = await createUser();

    const ui = await renderWithProviders(<ProfileDetails userId={newUser.id} />);

    expect(ui.getByText(`${newUser.firstName} ${newUser.lastName}`)).toBeInTheDocument();
    expect(ui.getByText(newUser.username)).toBeInTheDocument();
    expect(ui.getByAltText(newUser.username)).toHaveAttribute('src', newUser.image);
    expect(ui.queryAllByRole('link', { name: /edit profile/i }).length).toBe(0);
  });

  it('renders edit profile button when viewing own profile', async () => {
    const newUser = await createUser();

    const ui = await renderWithProviders(<ProfileDetails userId={newUser.id} />, { user: newUser });

    expect(ui.getByText(`${newUser.firstName} ${newUser.lastName}`)).toBeInTheDocument();
    expect(ui.getByText(newUser.username)).toBeInTheDocument();
    expect(ui.getByAltText(newUser.username)).toHaveAttribute('src', newUser.image);
    expect(ui.getByRole('link', { name: /edit profile/i })).toBeInTheDocument();
  });
});
