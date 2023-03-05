import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { emailReg, errorMsg } from "helpers/const.helper";
import { toast } from "react-toastify";
import { changeemail } from "hooks/auth";

const ChangeEmail = () => {
  const history = useHistory();
  const location = useLocation();
  const preEmail: any = location.state;

  const validationSchema = yup.object({
    newemail: yup.string().required(),
  });

  const initialValues = {
    newemail: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, actions) => {
      changeemail({ email: preEmail?.data, newemail: values.newemail }).then(
        () => {
          !emailReg.test(values.newemail)
            ? toast.error(errorMsg.mail)
            : history.push("/signup/changeemail", { data: values.newemail });
        }
      );
      actions.resetForm({
        values: initialValues,
      });
    },
  });

  return (
    <Row>
      <Col md={6} lg={4} className="mx-auto mt-5">
        <Card>
          <Card.Body>
            <Card.Title>Change Email</Card.Title>
            <Card.Subtitle className="mb-3 text-muted">
              If you inputed wrong email, please input correct email here.
            </Card.Subtitle>
            <Form className="form" onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Label>New Email</Form.Label>
                <Form.Control
                  type="email"
                  name="newemail"
                  id="newemail"
                  value={formik.values.newemail}
                  onChange={formik.handleChange}
                  placeholder="example@gmail.com"
                />
                {formik.touched.newemail && formik.errors.newemail ? (
                  <div className="text-danger">{formik.errors.newemail}</div>
                ) : null}
              </Form.Group>
              <Button type="submit" color="primary" className="w-100">
                Change Email
              </Button>
            </Form>
            <Link to="/signin" className="d-block my-2 text-center">
              Go to Sign in Page
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ChangeEmail;
