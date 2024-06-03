import ShipperImage from '../assets/images/shipper-img.svg';
import CamionLogo from '../assets/icons/ic-camion.svg';
import Image from 'react-bootstrap/Image';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
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
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

const Login = () => {
  const { t } = useTranslation(['login']);
  const schema = z.object({
    username: z.string().email(t('validationErrorEnterValidEmail')),
    password: z.string().min(6, t('validationErrorEnterYourPassword')),
  });
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
      setShowToast(true);
    }
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
  }, [isLoggedIn, user?.role, navigate]);

  return (
    <Container fluid className="vh-100">
      {showToast && <Toast showToast={showToast} message={error ? getErrorMessage(error) : ''} setShowToast={setShowToast} variant={error ? 'danger' : 'success'} />}
      <Row className="h-100">
        <Col xs={12} md={6} className="d-none d-md-block p-0">
          <div className="image-container">
            <Image className="background-img" src={ShipperImage} alt="Camion" />
          </div>
        </Col>
        <Col xs={12} md={6}>
          <Row className="justify-content-md-center">
            <Col md="auto" className="position-relative custom-col">
              <LanguageSwitcher />
            </Col>
          </Row>
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-sm-11 col-md-9 col-lg-7 mx-auto">
                  <Image src={CamionLogo} />

                  <div className="mt-4">
                    <h1 className="h1 mb-3 main_heading">{t('loginTitle')}</h1>
                    <p className="sub_heading mb-4">{t('loginSubtitle')}</p>
                  </div>
                  <div className="form-container">
                    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                      <div>
                        <Row className="form-group mb-4">
                          <Form.Group as={Col}>
                            <Form.Label className="customLabel">{t('emailLabel')}</Form.Label>
                            <Form.Control
                              type="email"
                              className="form-control customInput"
                              {...register('username')}
                              isInvalid={!!errors.username}
                              placeholder={t('emailPlaceholder')}
                              disabled={isLoading}
                            />
                            <Form.Control.Feedback type="invalid">{errors.username?.message}</Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Row className="form-group">
                          <Form.Group as={Col} controlId="validationCustom05">
                            <Form.Label className="customLabel">{t('passwordLabel')}</Form.Label>
                            <Form.Control
                              type="password"
                              className="form-control customInput"
                              placeholder={t('passwordPlaceholder')}
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
                                {t('forgotPassword')}
                              </Link>
                            </div>
                          </Form.Group>
                        </Row>
                      </div>
                      <div className="register-container" style={{ flexDirection: 'column', width: '100%' }}>
                        <Button type="submit" variant="primary" className="btn customLoginButton w-100" disabled={isLoading}>
                          {t('login')}
                        </Button>
                        <div className="d-flex justify-content-start">
                          <div>{t('noAccount')}</div>
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
                              {t('registerAccount')}
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
        </Col>
      </Row>
    </Container>
    // <div className="main-container">
    //   {showToast && <Toast showToast={showToast} message={error ? getErrorMessage(error) : ''} setShowToast={setShowToast} variant={error ? 'danger' : 'success'} />}
    //   <div className="parent-row row g-0">
    //     <div className="img-container">
    //       <Image className="background-img" src={ShipperImage} />
    //     </div>
    //     <div className="form-main-container">
    // 					<Row className="justify-content-md-center mt-3">
    // 						<Col md="auto"><LanguageSwitcher /></Col>
    // 					</Row>
    //       <div className="login d-flex align-items-center py-5">
    //         <div className="container">
    //           <div className="row">
    //             <div className="col-sm-11 col-md-9 col-lg-7 mx-auto">
    //               <Image src={CamionLogo} />

    //               <div className="mt-4">
    //                 <h1 className="h1 mb-3 main_heading">{t('loginTitle')}</h1>
    //                 <p className="sub_heading mb-4">
    //                   {t('loginSubtitle')}
    //                 </p>
    //               </div>
    //               <div className="form-container">
    //                 <Form noValidate onSubmit={handleSubmit(onSubmit)}>
    //                   <div>
    //                     <Row className="form-group mb-4">
    //                       <Form.Group as={Col}>
    //                         <Form.Label className="customLabel">{t('emailLabel')}</Form.Label>
    //                         <Form.Control
    //                           type="email"
    //                           className="form-control customInput"
    //                           {...register('username')}
    //                           isInvalid={!!errors.username}
    //                           placeholder={t('emailPlaceholder')}
    //                           disabled={isLoading}
    //                         />
    //                         <Form.Control.Feedback type="invalid">{errors.username?.message}</Form.Control.Feedback>
    //                       </Form.Group>
    //                     </Row>
    //                     <Row className="form-group">
    //                       <Form.Group as={Col} controlId="validationCustom05">
    //                         <Form.Label className="customLabel">{t('passwordLabel')}</Form.Label>
    //                         <Form.Control
    //                           type="password"
    //                           className="form-control customInput"
    //                           placeholder={t('passwordPlaceholder')}
    //                           {...register('password')}
    //                           isInvalid={!!errors.password}
    //                           disabled={isLoading}
    //                         />
    //                         <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
    //                         <div className="mt-2 d-flex flex-row-reverse">
    //                           <Link
    //                             to="/forgotPassword"
    //                             style={{
    //                               color: '#0060b8',
    //                               fontSize: '16px',
    //                               cursor: 'pointer',
    //                               textDecoration: 'none',
    //                               marginLeft: '30px',
    //                             }}>
    //                             {t('forgotPassword')}
    //                           </Link>
    //                         </div>
    //                       </Form.Group>
    //                     </Row>
    //                   </div>
    //                   <div className="register-container" style={{ flexDirection: 'column', width: '100%' }}>
    //                     <button type="submit" className="btn customLoginButton w-100" disabled={isLoading}>
    //                       {t('login')}
    //                     </button>
    //                     <div className="d-flex justify-content-start">
    //                       <div>{t('noAccount')}</div>
    //                       <div>
    //                         <Link
    //                           to="/Register"
    //                           style={{
    //                             color: '#0060b8',
    //                             fontSize: '16px',
    //                             cursor: 'pointer',
    //                             textDecoration: 'none',
    //                             marginLeft: '30px',
    //                           }}>
    //                           {t('registerAccount')}
    //                         </Link>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </Form>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
