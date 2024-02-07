import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Router } from './router';

describe('Given AppRoutes component', () => {
  describe('When we navigate to Helmets page', () => {
    const MockedHelmetsComponent = jest.fn().mockReturnValue(<h1>Helmets</h1>);
    jest.mock(
      '../../pages/helmets_page/helmets_page',
      () => MockedHelmetsComponent
    );
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/helmets']} initialIndex={0}>
            <Router></Router>
          </MemoryRouter>
        );
      });
      element = screen.getByText('Helmets');
    });
    test('Then the component should been called', () => {
      expect(MockedHelmetsComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe('When we navigate to Certificates page', () => {
    const MockedCertificateComponent = jest
      .fn()
      .mockReturnValue(<h1>Certificates</h1>);
    jest.mock(
      '../../pages/helmetCertificate/helmetCertificate',
      () => MockedCertificateComponent
    );
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/certificates']} initialIndex={0}>
            <Router></Router>
          </MemoryRouter>
        );
      });
      element = screen.getByText('Certificates');
    });
    test('Then the component should been called', () => {
      expect(MockedCertificateComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe('When we navigate to Edit page', () => {
    const MockedEditComponent = jest.fn().mockReturnValue(<h1>Edit</h1>);
    jest.mock(
      '../../pages/edit_formPage/edit_formPage',
      () => MockedEditComponent
    );
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <MemoryRouter
            initialEntries={['/helmet-edit-form/:id']}
            initialIndex={0}
          >
            <Router></Router>
          </MemoryRouter>
        );
      });
      element = screen.getByText('Edit');
    });
    test('Then the component should been called', () => {
      expect(MockedEditComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe('When we navigate to login page', () => {
    const MockedLoginComponent = jest.fn().mockReturnValue(<h1>Login</h1>);
    jest.mock('../../pages/login_user/login_user', () => MockedLoginComponent);
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/user-login']} initialIndex={0}>
            <Router></Router>
          </MemoryRouter>
        );
      });
      element = screen.getByText('Login');
    });
    test('Then the component should been called', () => {
      expect(MockedLoginComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe('When we navigate to register page', () => {
    const MockedRegisterComponent = jest
      .fn()
      .mockReturnValue(<h1>register</h1>);
    jest.mock(
      '../../pages/register_user/register_user',
      () => MockedRegisterComponent
    );
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/user-register']} initialIndex={0}>
            <Router></Router>
          </MemoryRouter>
        );
      });
      element = screen.getByText('register');
    });
    test('Then the component should been called', () => {
      expect(MockedRegisterComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe('When we navigate to Details page', () => {
    const MockedDetailsComponent = jest.fn().mockReturnValue(<h1>details</h1>);
    jest.mock(
      '../../pages/details_page/details_page',
      () => MockedDetailsComponent
    );
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/details-page/:id']} initialIndex={0}>
            <Router></Router>
          </MemoryRouter>
        );
      });
      element = screen.getByText('details');
    });
    test('Then the component should been called', () => {
      expect(MockedDetailsComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe('When we navigate to user page', () => {
    const MockeduserpageComponent = jest.fn().mockReturnValue(<h1>user</h1>);
    jest.mock('../../pages/user_page/user_page', () => MockeduserpageComponent);
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/user-page']} initialIndex={0}>
            <Router></Router>
          </MemoryRouter>
        );
      });
      element = screen.getByText('user');
    });
    test('Then the component should been called', () => {
      expect(MockeduserpageComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe('When we navigate to About us page', () => {
    const MockedAboutUsComponent = jest.fn().mockReturnValue(<h1>about</h1>);
    jest.mock('../../pages/about-us/about-us', () => MockedAboutUsComponent);
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/about-us']} initialIndex={0}>
            <Router></Router>
          </MemoryRouter>
        );
      });
      element = screen.getByText('about');
    });
    test('Then the component should been called', () => {
      expect(MockedAboutUsComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe('When we navigate to home page', () => {
    const MockedHomeComponent = jest.fn().mockReturnValue(<h1>home</h1>);
    jest.mock('../../pages/home/homePage', () => MockedHomeComponent);
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/home']} initialIndex={0}>
            <Router></Router>
          </MemoryRouter>
        );
      });
      element = screen.getByText('home');
    });
    test('Then the component should been called', () => {
      expect(MockedHomeComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });

  describe('When we navigate to error page', () => {
    const MockedErrorComponent = jest.fn().mockReturnValue(<h1>error</h1>);
    jest.mock('../../pages/error_page/errorpage', () => MockedErrorComponent);
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/error']} initialIndex={0}>
            <Router></Router>
          </MemoryRouter>
        );
      });
      element = screen.getByText('error');
    });
    test('Then the component should been called', () => {
      expect(MockedErrorComponent).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });
});
