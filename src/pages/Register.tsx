import CarrierImage from "../assets/images/carrier-img.svg";
import CamionLogo from "../assets/icons/ic-camion.svg";
import Image from "react-bootstrap/Image";

const Register = () => {
  return (
    <div className="main-container">
      <div className="parent-row row g-0">
        <div className="img-container">
          <Image className="background-img" src={CarrierImage} />
          {/* <img
            src="./assets/carrier-img.svg"
            className="background-img"
            alt="Responsive"
          /> */}
        </div>
        <div className="form-main-container">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-sm-11 col-md-9 col-lg-9 mx-auto">
                  <Image  src={CamionLogo} />

                  <div className="mt-4">
                    <h1 className="h1 mb-3 main_heading">
                      Register a new account
                    </h1>
                    <p className="sub_heading mb-4">
                      By registering a new account with us, you can view and
                      create your shipments with ease
                    </p>
                  </div>
                  <div className="form-container">
                    <form>
                      <div>
                        <div className="row">
                          <div className="col">
                            <div className="form-group mb-4">
                              <label htmlFor="firstName">
                                <p className="customLabel">First Name</p>
                              </label>
                              <input
                                type="text"
                                className="form-control customInput"
                                id="firstName"
                                aria-describedby="emailHelp"
                                placeholder="Enter first name"
                              />
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-group mb-4">
                              <label htmlFor="lastName">
                                <p className="customLabel">Last Name</p>
                              </label>
                              <input
                                type="text"
                                className="form-control customInput"
                                id="lastName"
                                placeholder="Enter last name"
                              />
                              <div className="mt-2"></div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="form-group mb-4">
                              <label htmlFor="exampleInputEmail1">
                                <p className="customLabel">Email address</p>
                              </label>
                              <input
                                type="email"
                                className="form-control customInput"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                              />
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-group mb-4">
                              <label htmlFor="contactNumber">
                                <p className="customLabel">Contact number</p>
                              </label>
                              <input
                                type="text"
                                className="form-control customInput"
                                id="contactNumber"
                                placeholder="Enter contact number"
                              />
                              <div className="mt-2"></div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="form-group mb-4">
                              <label htmlFor="password">
                                <p className="customLabel">Password</p>
                              </label>
                              <input
                                type="password"
                                className="form-control customInput"
                                id="passwordinput"
                                aria-describedby="emailHelp"
                                placeholder="Enter Password"
                              />
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-group mb-4">
                              <label htmlFor="confirmPassword">
                                <p className="customLabel">Confirm Password</p>
                              </label>
                              <input
                                type="password"
                                className="form-control customInput"
                                id="confirmPassword"
                                placeholder="Enter confirm password"
                              />
                              <div className="mt-2"></div>
                            </div>
                          </div>
                        </div>
                        <div className="form-row">
                          <div
                            className="g-recaptcha"
                            data-sitekey="your-site-key-here"
                          ></div>
                        </div>
                      </div>
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
                    </form>
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
