import ShipperImage from '../assets/images/shipper-img.svg';
import CamionLogo from '../assets/icons/ic-camion.svg';
import Image from 'react-bootstrap/Image';
import { Form, Col, Container, Row, Button } from 'react-bootstrap';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAspNetUserResetPasswordMutation } from '@/services/aspNetUserAuth';

interface IForgetPassword {
  email: string;
  password: string;
  confirmPassword: string;
}
const schema = z
  .object({
    email: z.string().email('Enter a valid email.'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).+$/, {
        message: 'Password must include a special character, a capital letter, a lowercase letter, and a number',
      }),
    confirmPassword: z.string().min(8, 'Confirm your password.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgetPassword>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const [aspNetUserResetPassword] = useAspNetUserResetPasswordMutation();
  const onSubmit: SubmitHandler<IForgetPassword> = async (values: IForgetPassword) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    aspNetUserResetPassword(values).then((result: any) => {
      if (result) {
        console.log('Password reset successful', values);
      }
    });

    console.log(values);
    navigate('/Login', { replace: true });
  };

  return (
		<Container fluid className="vh-100">
	<Row className="h-100">
		<Col xs={12} md={6} className="d-none d-md-block p-0">
			<div className="image-container">
			<Image className="background-img"
					src={ShipperImage}
					alt="Camion"
				/>
			</div>
		</Col>
		<Col xs={12} md={6}>
		<div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-sm-11 col-md-9 col-lg-7 mx-auto">
                  <Image src={CamionLogo} />

                  <div className="mt-4">
                    <h1 className="h1 mb-3 main_heading">Forgot Password</h1>
                    <p className="sub_heading mb-4">Verify your email address to recover your password</p>
                  </div>
                  <div className="form-container">
                    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group mb-4">
                        <Form.Group as={Col}>
                          <Form.Label className="customLabel">Email address</Form.Label>
                          <Form.Control type="email" className="form-control customInput" {...register('email')} isInvalid={!!errors.email} placeholder="Enter email address" />
                          <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col}>
                          <Form.Label className="customLabel">Password</Form.Label>
                          <Form.Control type="password" className="form-control customInput" {...register('password')} isInvalid={!!errors.password} placeholder="Enter password" />
                          <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col}>
                          <Form.Label className="customLabel">Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            className="form-control customInput"
                            {...register('confirmPassword')}
                            isInvalid={!!errors.confirmPassword}
                            placeholder="Confirm password"
                          />
                          <Form.Control.Feedback type="invalid">{errors.confirmPassword?.message}</Form.Control.Feedback>
                        </Form.Group>
                      </div>

                      <div className="register-container" style={{ flexDirection: 'column', width: '100%' }}>
                        <Button type="submit" variant='primary' className="btn customRegisterButton w-100">
                          Verify
                        </Button>
                        <div className="d-flex justify-content-start">
                          <div>Already have an account?</div>
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
                              Sign in
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
    //   <div className="parent-row row g-0">
    //     <div className="img-container">
    //       <Image className="background-img" src={ShipperImage} />
    //     </div>
    //     <div className="form-main-container">

    //     </div>
    //   </div>
    // </div>
  );
};

export default ForgetPassword;
