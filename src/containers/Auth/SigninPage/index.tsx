import "../style.css";
import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { useAppDispatch } from "store/hooks";
import { signin } from "store/modules/auth";
import { emailReg, errorMsg, passwordReg } from "helpers/const.helper";
import { url } from "inspector";

const validationSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

const initialValues = {
  email: "",
  password: "",
};

const SigninPage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, actions) => {
      !emailReg.test(values.email)
        ? toast.error(errorMsg.mail)
        : !passwordReg.test(values.password)
        ? toast.error(errorMsg.password)
        : dispatch(signin(values)).then(() => {
            history.push("/");
          });
      actions.resetForm({
        values: {
          ...values,
          password: "",
        },
      });
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
            <Card.Title className="cardtitle">Have an account?</Card.Title>

            <Form className="form cardform" onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Control
                  type="text"
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="email"
                  className="formcontrol"
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
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
              </Form.Group>
              <Button type="submit" color="primary" className="w-100 submitbtn">
                Sign in
              </Button>
            </Form>

            <Link to="/signup" className="d-block my-2 text-center signuplink">
              <b>Go to Sign up Page</b>
            </Link>
            <div className="extracontent">
              <div>
                <Form.Group
                  className="mb-3 remcheck"
                  controlId="formBasicCheckbox"
                >
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
              </div>
              <div className="fgpscontent">
                <Link to="/signup" className="text-center fgpslink">
                  Forgot password?
                </Link>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SigninPage;
