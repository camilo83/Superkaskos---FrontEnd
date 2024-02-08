import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('../../pages/home/homePage'));
const Helmets = lazy(() => import('../../pages/helmets_page/helmets_page'));
const ErrorMsg = lazy(() => import('../../pages/error_page/errorpage'));
const EditH = lazy(() => import('../../pages/edit_formPage/edit_formPage'));
const UserLogin = lazy(() => import('../../pages/login_user/login_user'));
const Register = lazy(() => import('../../pages/register_user/register_user'));
const UserPage = lazy(() => import('../../pages/user_page/user_page'));
const Details = lazy(() => import('../../pages/details_page/details_page'));
const Certificates = lazy(
  () => import('../../pages/helmetCertificate/helmetCertificate')
);
const AboutUs = lazy(() => import('../../pages/about-us/about-us'));
const ShopCar = lazy(() => import('../../pages/shop_car/shop_car'));

export function Router() {
  return (
    <main>
      <Suspense>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/helmets" element={<Helmets></Helmets>}></Route>
          <Route
            path="/currentHelmet-edit-form/:id"
            element={<EditH></EditH>}
          ></Route>
          <Route path="/helmet-create-form" element={<EditH></EditH>}></Route>
          <Route path="/user-login" element={<UserLogin></UserLogin>}></Route>
          <Route path="/user-register" element={<Register></Register>}></Route>
          <Route path="/user-page" element={<UserPage></UserPage>}></Route>
          <Route path="/details-page/:id" element={<Details></Details>}></Route>
          <Route
            path="/certificates"
            element={<Certificates></Certificates>}
          ></Route>
          <Route path="/about-us" element={<AboutUs></AboutUs>}></Route>
          <Route path="/shop-car" element={<ShopCar></ShopCar>}></Route>
          <Route path="/*" element={<ErrorMsg></ErrorMsg>}></Route>
        </Routes>
      </Suspense>
    </main>
  );
}
