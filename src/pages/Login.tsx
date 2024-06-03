import ShipperImage from '../assets/images/shipper-img.svg';
import CamionLogo from '../assets/icons/ic-camion.svg';
import Image from 'react-bootstrap/Image';
import { Form, Row, Col } from 'react-bootstrap';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAspNetUserLoginMutation } from '@/services/aspNetUserAuth';
import { AspNetUserLoginRequest } from '@/interface/aspNetUser';
import { setSession } from '@/state/slice/sessionSlice';
import { useAppSelector } from '@/state';
import { useEffect, useState } from 'react';
import { Toast } from '@/components/ui/toast';
import { getErrorMessage } from '@/util/errorHandler';

const schema = z.object({
  username: z.string().email('Enter a valid email.'),
  password: z.string().min(6, 'Enter your password.'),
});

const Login = () => {
  const [showToast, setShowToast] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AspNetUserLoginRequest>({
    resolver: zodResolver(schema),
  });

  const { isLoggedIn, dir, lang, user } = useAppSelector((state) => state.session);

  const [aspNetUserLogin, { isLoading, error }] = useAspNetUserLoginMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<AspNetUserLoginRequest> = async (values: AspNetUserLoginRequest) => {
    try {
      const response = await aspNetUserLogin(values).unwrap();
      dispatch(
        setSession({
          token: response.token,
          isCompanyAccount: response.isCompanyAccount,
          isSubUser: response.isSubUser,
          profileImage: response.profileImage,
          user: {
            email: values.username,
            role: response.role,
            userId: response.userId,
          },
          isLoggedIn: true,
          dir: dir,
          lang: lang,
        }),
      );

      if (response.role === 'Carrier') {
        navigate('/carrier/dashboard', { replace: true });
      } else if (response.role === 'Shipper') {
        navigate('/shipper/shipperdashboard', { replace: true });
      } else {
        navigate('/admin/Profiles', { replace: true });
      }
    } catch (e) {
      // console.log('getting here', e);
      // console.log('data', error);
      setShowToast(true);
    }
    // aspNetUserLogin(values).then((result: any) => {
    //   if (result.error) {
    //     setShowToast(true);
    //   } else {
    //     console.log(result);
    //     if (!error) {
    //       dispatch(
    //         setSession({
    //           token: result.data.token,
    //           isCompanyAccount: result.data.isCompanyAccount,
    //           user: {
    //             email: values.username,
    //             role: result.data.role,
    //             userId: result.data.userId,
    //           },
    //           isLoggedIn: true,
    //           dir: dir,
    //           lang: lang,
    //         }),
    //       );
    //       const userRole = result.data.role;

    //       userRole == 'Shipper' ? navigate('/shipper/shipperdashboard') : userRole == 'Carrier' ? navigate('/carrier/dashboard') : navigate('/admin/Profiles');
    //     } else {
    //       setShowToast(true);
    //     }
    //   }
    // });
  };

  useEffect(() => {
    if (isLoggedIn) {
      if (user.role === 'Carrier') {
        navigate('/carrier/dashboard');
      } else if (user.role === 'Shipper') {
        navigate('/shipper/shipperdashboard');
      } else {
        navigate('/admin/Profiles');
      }
    }
  }, []);
  return (
    <div className="main-container">
      {showToast && (
        <Toast showToast={showToast} message={error ? getErrorMessage(error) : ''} setShowToast={setShowToast} duration={4000} variant={error ? 'danger' : 'success'} />
      )}
      <div className="parent-row row g-0">
        <div className="img-container">
          <Image className="background-img" src={ShipperImage} />
        </div>
        <div className="form-main-container">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="auth-form-container">
                  <Image src={CamionLogo} />

                  <div className="mt-4">
                    <h1 className="h1 mb-3 main_heading">Login your account</h1>
                    <p className="sub_heading mb-4">
                      Log in to a serviced account and create and manage your
                      <br />
                      shipments the way that suits you best
                    </p>
                  </div>
                  <div className="form-container">
                    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                      <div>
                        <Row className="form-group mb-4">
                          <Form.Group as={Col}>
                            <Form.Label className="customLabel">Email</Form.Label>
                            <Form.Control
                              type="email"
                              className="form-control customInput"
                              {...register('username')}
                              isInvalid={!!errors.username}
                              placeholder="Enter email address"
                              disabled={isLoading}
                            />
                            <Form.Control.Feedback type="invalid">{errors.username?.message}</Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Row className="form-group">
                          <Form.Group as={Col} controlId="validationCustom05">
                            <Form.Label className="customLabel">Password</Form.Label>
                            <Form.Control
                              type="password"
                              className="form-control customInput"
                              placeholder="Enter password"
                              {...register('password')}
                              isInvalid={!!errors.password}
                              disabled={isLoading}
                            />
                            <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                            <div className="mt-2 d-flex flex-row-reverse">
                              <Link
                                to="/forgotPassword"
                                style={{
                                  color: '#0060b8',
                                  fontSize: '16px',
                                  cursor: 'pointer',
                                  textDecoration: 'none',
                                  marginLeft: '30px',
                                }}>
                                Forgot your Password?
                              </Link>
                            </div>
                          </Form.Group>
                        </Row>
                      </div>
                      <div className="register-container" style={{ flexDirection: 'column', width: '100%' }}>
                        <button type="submit" className="btn customLoginButton w-100" disabled={isLoading}>
                          Login
                        </button>
                        <div className="d-flex justify-content-start">
                          <div>Don’t have an account?</div>
                          <div>
                            <Link
                              to="/Register"
                              style={{
                                color: '#0060b8',
                                fontSize: '16px',
                                cursor: 'pointer',
                                textDecoration: 'none',
                                marginLeft: '30px',
                              }}>
                              Register your account
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
