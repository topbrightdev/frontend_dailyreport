import "../style.css";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { emailReg, errorMsg, passwordReg } from "helpers/const.helper";
import { toast } from "react-toastify";
// import { signup } from "hooks/auth";
import { signup } from "store/modules/auth";
import { useAppDispatch } from "store/hooks";

const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const SignupPage = () => {
  const history = useHistory();

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, actions) => {
      !emailReg.test(values.email)
        ? toast.error(errorMsg.mail)
        : !passwordReg.test(values.password)
        ? toast.error(errorMsg.password)
        : dispatch(signup(values))
        // signup(values).then(() => {
        //     history.push("/signup/changeemail", { data: values.email });
        //   });
      actions.resetForm({ values: initialValues });
    },
  });

  return (
    <Row className="pagebody">
      <Col md={6} lg={4} className="mx-auto mainbody2">
        <Card className="maincard">
          <div className="logocontent">
            <img className="logoimg" src="logo.png" />
          </div>
          <Card.Body className="cardbody">
            <Card.Title className="cardtitle">Sign up</Card.Title>

            <Form className="form cardform" onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Control
                  type="text"
                  name="name"
                  id="name"
                  placeholder="name"
                  className="formcontrol"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-danger">{formik.errors.name}</div>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  type="text"
                  name="email"
                  id="email"
                  placeholder="gmail"
                  className="formcontrol"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  type="password"
                  name="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className="formcontrol"
                  placeholder="password"
                  style={{
                    height: "50px",
                    color: "black",
                    border: "1px solid #9f8d37",
                    background: "transparent",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
              </Form.Group>
              <Button type="submit" color="primary" className="w-100 submitbtn">
                Sign up
              </Button>
            </Form>
            <Link to="/signin" className="d-block my-2 text-center signinlink">
              <b>Go to Sign in Page</b>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SignupPage;
