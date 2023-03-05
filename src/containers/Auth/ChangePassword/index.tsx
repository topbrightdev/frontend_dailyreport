import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";

import { useAppDispatch } from "store/hooks";
import { forgotpasswordverify } from "store/modules/auth";
import { errorMsg, passwordReg } from "helpers/const.helper";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { tokenId }: any = useParams();

  const validationSchema = yup.object({
    newpassword: yup.string().required(),
  });

  const initialValues = {
    newpassword: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, actions) => {
      !passwordReg.test(values.newpassword)
        ? toast.error(errorMsg.password)
        : tokenId === ""
        ? toast.error(errorMsg.token)
        : dispatch(
            forgotpasswordverify({
              token: tokenId,
              newpassword: values.newpassword,
            })
          ).then(() => {
            history.push("/");
          });
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
            <Card.Title>Forgot Password</Card.Title>
            <Card.Subtitle className="mb-3 text-muted">
              Please input your new password.
            </Card.Subtitle>
            <Form className="form" onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="newpassword"
                  id="newpassword"
                  value={formik.values.newpassword}
                  onChange={formik.handleChange}
                  placeholder="********"
                />
                {formik.touched.newpassword && formik.errors.newpassword ? (
                  <div className="text-danger">{formik.errors.newpassword}</div>
                ) : null}
              </Form.Group>
              <Button type="submit" color="primary" className="w-100">
                Change Password
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

export default ChangePassword;
