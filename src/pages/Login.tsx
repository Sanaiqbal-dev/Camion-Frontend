import ShipperImage from "../assets/images/shipper-img.svg";
import CamionLogo from "../assets/icons/ic-camion.svg";
import Image from "react-bootstrap/Image";
import { Form, Row, Col } from "react-bootstrap";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { setAuthSession } from "../state/Auth/authSlice";
import { ILoginRequest } from "../interface/Session";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../services/auth/authService";

const schema = z.object({
  username: z.string().email("Enter a valid email."),
  password: z.string().min(1, "Enter your password."),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequest>({
    resolver: zodResolver(schema),
  });

  const [login, { isLoading, isError, error }] = useLoginUserMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ILoginRequest> = async (data) => {
    try {
      const loginResponse = await login(data).unwrap();
      dispatch(
        setAuthSession({
          username: data.username,
          token: loginResponse.token,
          role: loginResponse.role,
          status: "active",
        })
      );
      console.log("Recieved Token is :", loginResponse);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="main-container">
      <div className="parent-row row g-0">
        <div className="img-container">
          <Image className="background-img" src={ShipperImage} />
        </div>
        <div className="form-main-container">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-sm-11 col-md-9 col-lg-7 mx-auto">
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
                            <Form.Label className="customLabel">
                              Email
                            </Form.Label>
                            <Form.Control
                              type="email"
                              className="form-control customInput"
                              {...register("username")}
                              isInvalid={!!errors.username}
                              placeholder="Enter email address"
                              disabled={isLoading}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.username?.message}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Row className="form-group">
                          <Form.Group as={Col} controlId="validationCustom05">
                            <Form.Label className="customLabel">
                              Password
                            </Form.Label>
                            <Form.Control
                              type="password"
                              className="form-control customInput"
                              placeholder="Enter password"
                              {...register("password")}
                              isInvalid={!!errors.password}
                              disabled={isLoading}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.password?.message}
                            </Form.Control.Feedback>
                            <div className="mt-2 d-flex flex-row-reverse">
                              <a
                                href=""
                                style={{
                                  color: "#2D9CDB",
                                  textDecoration: "none",
                                }}
                              >
                                Forgot your Password?
                              </a>
                            </div>
                          </Form.Group>
                        </Row>
                      </div>
                      {isError && error && (
                        <p>
                          Error: {error.data?.message || "An error occurred"}
                        </p>
                      )}
                      {isLoading && <p>Loading...</p>}{" "}
                      <div
                        className="register-container"
                        style={{ flexDirection: "column", width: "100%" }}
                      >
                        <button
                          type="submit"
                          className="btn customRegisterButton w-100"
                        >
                          Login
                        </button>
                        <div className="d-flex justify-content-start">
                          <div>Don’t have an account?</div>
                          <div>
                            <a
                              style={{
                                color: "#0060b8",
                                fontSize: "16px",
                                cursor: "pointer",
                                textDecoration: "none",
                                marginLeft: "30px",
                              }}
                              href="Login.html"
                            >
                              Register your account
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

export default Login;
