import ShipperImage from '../assets/images/shipper-img.svg';
import CamionLogo from '../assets/icons/ic-camion.svg';
import Image from 'react-bootstrap/Image';
import { Form, Col, Container, Row, Button } from 'react-bootstrap';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAspNetUserResetPasswordMutation } from '@/services/aspNetUserAuth';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import LoadingAnimation from '@/components/ui/LoadingAnimation';

interface IForgetPassword {
  password: string;
  confirmPassword: string;
  email: string;
  token: string;
}

const ForgetPassword = () => {
  const { t } = useTranslation(['forgetPassword']);

  const schema = z
    .object({
      password: z
        .string()
        .min(8, t('passwordMinLength'))
        .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).+$/, {
          message: t('passwordRequirements'),
        }),
      confirmPassword: z.string().min(8, t('confirmYourPassword')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwordsDontMatch'),
      path: ['confirmPassword'],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgetPassword>({
    resolver: zodResolver(schema),
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userEmail = searchParams.get('Email') || '';
  const rawToken = searchParams.get('Token') || '';

  // console.log('userEmail', userEmail);

  // console.log('rawToken', rawToken);

  //const userToken = encodeURIComponent(rawToken); // Remove spaces and decode the token
  //const userToken = decodeURIComponent(rawToken); // Remove spaces and decode the token

  const userToken = encodeURIComponent(rawToken).replace(/\s+/g, '+');

  // if(rawToken === cleanedToken){
  // 	console.log('Token is same');
  // 	console.log(cleanedToken)
  // console.log(decodeURIComponent(rawToken))
  // }else{
  // 	console.log('Token is different');
  // 	console.log(rawToken)
  // 	console.log(cleanedToken)
  // }

  // console.log('decodeToken', userToken);

  const navigate = useNavigate();
  const [aspNetUserResetPassword, { isLoading }] = useAspNetUserResetPasswordMutation();

  const onSubmit: SubmitHandler<IForgetPassword> = async (data: IForgetPassword) => {
    console.log('Function Called');
    const payload = {
      email: userEmail,
      token: userToken,
      password: data.password,
    };
    console.log(payload);
    try {
      await aspNetUserResetPassword(payload);
      console.log('Password reset successful', payload);
      navigate('/Login', { replace: true });
    } catch (error) {
      console.error('Password reset failed', error);
    }

    console.log(payload);
  };

  return (
    <Container fluid className="vh-100">
      <Row style={{ justifyContent: 'flex-end', marginRight: '10%', marginLeft: '10%' }}>
        <Col md="auto" className="position-relative custom-col">
          <LanguageSwitcher />
        </Col>
      </Row>
      <Row className="h-100">
        <Col xs={12} md={6} className="d-none d-md-block p-0">
          <div className="image-container">
            <Image className="background-img" src={ShipperImage} alt="Camion" />
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-sm-11 col-md-9 col-lg-7 mx-auto">
                  <Image src={CamionLogo} alt="Camion Logo" />

                  <div className="mt-4">
                    <h1 className="h1 mb-3 main_heading">{t('forgotPassword')}</h1>
                    <p className="sub_heading mb-4">{t('verifyEmailToRecoverPassword')}</p>
                  </div>
                  <div className="form-container">
                    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group mb-4">
                        <Form.Group as={Col}>
                          <Form.Label className="customLabel">{t('password')}</Form.Label>
                          <Form.Control
                            type="password"
                            className="form-control customInput"
                            {...register('password')}
                            isInvalid={!!errors.password}
                            placeholder={t('enterPassword')}
                          />
                          <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col}>
                          <Form.Label className="customLabel mt-4">{t('confirmPassword')}</Form.Label>
                          <Form.Control
                            type="password"
                            className="form-control customInput"
                            {...register('confirmPassword')}
                            isInvalid={!!errors.confirmPassword}
                            placeholder={t('confirmPasswordPlaceholder')}
                          />
                          <Form.Control.Feedback type="invalid">{errors.confirmPassword?.message}</Form.Control.Feedback>
                        </Form.Group>
                      </div>

                      <div className="register-container" style={{ flexDirection: 'column', width: '100%' }}>
                        <Button type="submit" variant="primary" className="btn customRegisterButton w-100">
                          {isLoading ? <LoadingAnimation /> : t('verifyButton')}
                        </Button>
                        <div className="d-flex justify-content-start mt-3">
                          <div>
                            <Link
                              to="/Login"
                              style={{
                                color: '#0060b8',
                                fontSize: '16px',
                                cursor: 'pointer',
                                textDecoration: 'none',
                                marginLeft: '15px',
                              }}>
                              {t('signIn')}
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
  );
};

export default ForgetPassword;
