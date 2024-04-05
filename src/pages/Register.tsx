import CarrierImage from "../assets/images/carrier-img.svg";
import ShipperImage from "../assets/images/shipper-img.svg";
import CamionLogo from "../assets/icons/ic-camion.svg";
import Image from "react-bootstrap/Image";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface IRegisterFormInput {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  password: string;
  confirmPassword: string;
}

const schema = z
  .object({
    firstName: z.string().min(1, "Enter first name."),
    lastName: z.string().min(1, "Enter last name."),
    email: z.string().email("Enter a valid email."),
    contactNumber: z
      .string()
      .regex(/^\+?\d[\d\s]{10,}$/, "Enter a valid contact number."),

    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const [isCarrier, setIsCarrier] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IRegisterFormInput> = (data) => {
    console.log(data);
  };

  return (
    <div className="main-container">
      <div className="parent-row row g-0">
        <div className="img-container">
          <Image
            className="background-img"
            src={isCarrier ? CarrierImage : ShipperImage}
          />
        </div>
        <div className="form-main-container">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-sm-11 col-md-9 col-lg-9 mx-auto">
                  <Image className="col-lg-7" src={CamionLogo} />

                  <div className="mt-4">
                    <h1 className="h2 mb-3 font-weight-bolder">
                      Register a new account
                    </h1>
                    <p className="sub_heading mb-4">
                      By registering a new account with us, you can view and
                      <br />
                      create your shipments with ease
                    </p>
                  </div>
                  <div className="form-container">
                    <div>
                      <div className="my-3 d-flex justify-content-start">
                        <div className="btn-container">
                          <div
                            className={
                              isCarrier
                                ? "customShipperButton"
                                : "customShipperButtonEnabled"
                            }
                            id="shipper-btn"
                            onClick={() => setIsCarrier(false)}
                          >
                            <svg
                              width="40"
                              height="41"
                              viewBox="0 0 40 41"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M34.5928 20.2039L18.5471 20.2021C17.7714 20.2021 17.1406 20.7755 17.1406 21.4816V35.0421C17.1406 35.7482 17.7714 36.3216 18.5471 36.3216H34.5908C35.3685 36.3216 36.0004 35.7472 36.0004 35.0402V21.4835C36.0004 20.7774 35.3685 20.2039 34.5928 20.2039ZM24.9673 21.136H28.1717V25.0989L26.8505 24.3106C26.6799 24.2088 26.458 24.2088 26.2864 24.3106L24.9683 25.0961L24.9673 21.136ZM34.973 35.0402C34.973 35.2289 34.7983 35.3877 34.5908 35.3877H18.5471C18.3416 35.3877 18.168 35.2289 18.168 35.0421V21.4816C18.168 21.2948 18.3416 21.136 18.5471 21.136H23.9399V25.9601C23.9399 26.1319 24.0436 26.2897 24.2101 26.3701C24.3765 26.4541 24.5779 26.4448 24.7361 26.3505L26.5679 25.2596L28.4039 26.3542C28.5621 26.4495 28.7645 26.4569 28.9299 26.3747C29.0963 26.2926 29.2001 26.1347 29.2001 25.9638V21.136L34.5939 21.1379C34.7993 21.1379 34.974 21.2967 34.974 21.4835L34.973 35.0402Z"
                                fill="#4F4F4F"
                              />
                              <path
                                d="M32.7333 32.5981H27.9385V33.5321H32.7333V32.5981Z"
                                fill="#4F4F4F"
                              />
                              <path
                                d="M25.6645 16.6926C25.6645 15.5485 24.6412 14.6173 23.3827 14.6173H6.28285C5.02328 14.6173 4 15.5485 4 16.6926V25.2899C4 26.434 5.02328 27.3652 6.28285 27.3652C6.55305 27.3652 6.81504 27.3232 7.06058 27.2419L7.52188 34.7213C7.57633 35.6029 8.4116 36.3212 9.38453 36.3212H13.752C14.7269 36.3212 15.5632 35.602 15.6136 34.7213L16.5958 18.7679H23.3827C24.6412 18.7679 25.6645 17.8367 25.6645 16.6926ZM16.1098 17.8339C15.8375 17.8339 15.6125 18.0273 15.5971 18.2748L14.5882 34.6708C14.5667 35.0594 14.1824 35.3881 13.753 35.3881H9.38453C8.95508 35.3881 8.57187 35.0584 8.54824 34.669L8.03968 26.4238V20.6695C8.03968 20.4117 7.80955 20.2025 7.52599 20.2025C7.24243 20.2025 7.0123 20.4117 7.0123 20.6695V26.1949C6.79963 26.3369 6.55408 26.4322 6.28388 26.4322C5.59142 26.4322 5.02841 25.9204 5.02841 25.2908V16.6935C5.02841 16.064 5.59142 15.5522 6.28388 15.5522H23.3837C24.0762 15.5522 24.6381 16.064 24.6381 16.6935C24.6381 17.3231 24.0762 17.8349 23.3837 17.8349H16.1098V17.8339Z"
                                fill="#4F4F4F"
                              />
                              <path
                                d="M7.30194 13.1297C7.44064 13.1297 8.57384 13.1269 9.4389 13.0372C10.0892 13.564 10.8218 13.8414 11.5676 13.8414C12.3166 13.8414 13.0471 13.564 13.6964 13.0372C14.5615 13.1269 15.6957 13.1297 15.8375 13.1297C16.0121 13.1297 16.1744 13.0494 16.269 12.9158C16.3635 12.7823 16.3768 12.6151 16.306 12.4703C15.9063 11.6643 15.6412 10.5435 15.5097 9.89532C15.5364 9.75242 15.5354 9.62259 15.5498 9.4853H17.6539C17.9364 9.4853 18.1676 9.27609 18.1676 9.01831C18.1676 8.76053 17.9364 8.55132 17.6539 8.55132H15.5519C15.332 6.68709 13.8279 5.5 11.5676 5.5C9.11939 5.5 7.53721 6.88136 7.53721 9.01924C7.53721 9.2985 7.56598 9.59457 7.62454 9.90092C7.49303 10.5472 7.22694 11.6671 6.82934 12.4712C6.75845 12.6151 6.77386 12.7832 6.86838 12.9167C6.9629 13.0503 7.12728 13.1297 7.30194 13.1297ZM11.5676 6.43398C13.2567 6.43398 14.3262 7.21946 14.5265 8.55225H8.60672C8.80809 7.21946 9.8776 6.43398 11.5676 6.43398ZM8.65192 9.98498C8.66425 9.92894 8.66323 9.87197 8.65192 9.81593C8.62829 9.69918 8.63035 9.59738 8.61597 9.48623H14.5173C14.5039 9.59644 14.506 9.69825 14.4834 9.81313C14.471 9.86916 14.471 9.9252 14.4823 9.98031C14.6056 10.6079 14.8029 11.4355 15.0813 12.1845C14.618 12.1705 14.0313 12.1434 13.5967 12.0855C13.4365 12.0622 13.2731 12.1117 13.158 12.2172C12.8108 12.5329 12.2529 12.9093 11.5676 12.9093C10.8834 12.9093 10.3255 12.5329 9.97725 12.2172C9.87965 12.1285 9.74917 12.0808 9.61356 12.0808C9.5889 12.0808 9.56322 12.0827 9.53856 12.0864C9.10397 12.1453 8.51734 12.1724 8.05399 12.1854C8.33343 11.4355 8.52864 10.6107 8.65192 9.98498Z"
                                fill="#4F4F4F"
                              />
                            </svg>

                            <span>Shipper</span>
                          </div>
                        </div>
                        <div className="btn-container mx-4">
                          <div
                            className={
                              isCarrier
                                ? "customCarrierButtonEnabled"
                                : "customCarrierButton"
                            }
                            id="carrier-btn"
                            onClick={() => setIsCarrier(true)}
                          >
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.57143 28.381H7.04762C5.36447 28.381 4 27.0165 4 25.3333V11.6191C4 9.93591 5.36447 8.57144 7.04762 8.57144H20.7619C22.4451 8.57144 23.8095 9.93591 23.8095 11.6191V25.3333C23.8095 27.0165 22.4451 28.381 20.7619 28.381H19.2381M26.0952 28.381H25.3333C24.4918 28.381 23.8095 27.6987 23.8095 26.8572V13.9048C23.8095 13.0632 24.4918 12.381 25.3333 12.381H29.1724C29.6353 12.381 30.0731 12.5914 30.3623 12.9529L35.6661 19.5826C35.8822 19.8528 36 20.1885 36 20.5345V26.8572C36 27.6987 35.3178 28.381 34.4762 28.381M17.7143 27.6191C17.7143 29.723 16.0087 31.4286 13.9048 31.4286C11.8008 31.4286 10.0952 29.723 10.0952 27.6191C10.0952 25.5151 11.8008 23.8095 13.9048 23.8095C16.0087 23.8095 17.7143 25.5151 17.7143 27.6191ZM33.7143 27.6191C33.7143 29.723 32.0087 31.4286 29.9048 31.4286C27.8008 31.4286 26.0952 29.723 26.0952 27.6191C26.0952 25.5151 27.8008 23.8095 29.9048 23.8095C32.0087 23.8095 33.7143 25.5151 33.7143 27.6191Z"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              />
                            </svg>

                            <span>Carrier</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                      <div>
                        <Row className="form-group mb-4">
                          <Form.Group as={Col} md="6">
                            <Form.Label className="customLabel">
                              First Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="form-control customInput"
                              {...register("firstName")}
                              isInvalid={!!errors.firstName}
                              placeholder="Enter first name"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.firstName?.message}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group as={Col} md="6">
                            <Form.Label className="customLabel">
                              Last Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="form-control customInput"
                              {...register("lastName")}
                              isInvalid={!!errors.lastName}
                              placeholder="Enter last name"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.lastName?.message}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Row className="form-group mb-4">
                          <Form.Group as={Col} md="6">
                            <Form.Label className="customLabel">
                              Email
                            </Form.Label>
                            <Form.Control
                              type="email"
                              className="form-control customInput"
                              {...register("email")}
                              isInvalid={!!errors.email}
                              placeholder="Enter email address"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.email?.message}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom04"
                          >
                            <Form.Label className="customLabel">
                              Contact Number
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="form-control customInput"
                              {...register("contactNumber")}
                              isInvalid={!!errors.contactNumber}
                              placeholder="Enter contact number"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.contactNumber?.message}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Row className="form-group">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom05"
                          >
                            <Form.Label className="customLabel">
                              Password
                            </Form.Label>
                            <Form.Control
                              type="password"
                              className="form-control customInput"
                              placeholder="Enter password"
                              {...register("password")}
                              isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.password?.message}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom06"
                          >
                            <Form.Label className="customLabel">
                              Confirm Password
                            </Form.Label>
                            <Form.Control
                              type="password"
                              className="form-control customInput"
                              placeholder="Confirm Password"
                              {...register("confirmPassword")}
                              isInvalid={!!errors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.confirmPassword?.message}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                      </div>
                      <ReCAPTCHA
                        sitekey={siteKey}
                        // onChange={onChange}
                      />
                      <div className="register-container">
                        <div>
                          <button
                            type="submit"
                            className="btn customRegisterButton"
                          >
                            Register my account
                          </button>
                        </div>
                        <div className="d-flex justify-content-start">
                          <div>Already have an account?</div>
                          <div>
                            <a
                              style={{
                                color: "#0060b8",
                                fontSize: "16px",
                                cursor: "pointer",
                                textDecoration: "none",
                                marginLeft: "15px",
                              }}
                              href="Login.html"
                            >
                              Sign in
                            </a>
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

export default Register;
