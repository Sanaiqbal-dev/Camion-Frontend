import ShipperImage from "../assets/images/shipper-img.svg";
import CamionLogo from "../assets/icons/ic-camion.svg";
import Image from "react-bootstrap/Image";
import { Form, Row, Col } from "react-bootstrap";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

interface IForgetPassword {
  email: string;
}
const schema = z.object({
  email: z.string().email("Enter a valid email."),
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

  const onSubmit: SubmitHandler<IForgetPassword> = async (data) => {
    console.log(data);
    navigate("/Login", { replace: true });
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
                    <h1 className="h1 mb-3 main_heading">Forgot Password</h1>
                    <p className="sub_heading mb-4">
                      Verify your email address to recover your password
                    </p>
                  </div>
                  <div className="form-container">
                    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                      <div>
                        <Row className="form-group mb-4">
                          <Form.Group as={Col}>
                            <Form.Label className="customLabel">
                              Email address
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
                        </Row>
                      </div>
                      <div
                        className="register-container"
                        style={{ flexDirection: "column", width: "100%" }}
                      >
                        <button
                          type="submit"
                          className="btn customRegisterButton w-100"
                        >
                          Verify
                        </button>
                        <div className="d-flex justify-content-start">
                          <div>Already have an account?</div>
                          <div>
                            <Link
                              to="/Login"
                              style={{
                                color: "#0060b8",
                                fontSize: "16px",
                                cursor: "pointer",
                                textDecoration: "none",
                                marginLeft: "15px",
                              }}
                            >
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
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
