import { createUser, renderWithProviders } from '@/test/test-utils';
import { Header } from '../Header';
import { APP_TITLE } from '@/config';

describe('Header', () => {
  it('renders app title', async () => {
    const ui = await renderWithProviders(<Header />);
    expect(ui.getByText(APP_TITLE)).toBeInTheDocument();
  });

  it('renders guest links when user is not authenticated', async () => {
    const ui = await renderWithProviders(<Header />, { user: null });
    expect(ui.getByText(/login/i)).toBeInTheDocument();
    expect(ui.queryAllByText(/logout/i).length).toBe(0);
  });

  it('renders user links when user is authenticated', async () => {
    const newUser = await createUser();
    const ui = await renderWithProviders(<Header />, { user: newUser });

    expect(ui.getByText(`${newUser?.firstName} ${newUser?.lastName}`)).toBeInTheDocument();
    expect(ui.getByText(/logout/i)).toBeInTheDocument();
    expect(ui.queryAllByText(/login/i).length).toBe(0);
  });
});
