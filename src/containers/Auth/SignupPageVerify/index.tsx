import React, { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";

import { useAppDispatch } from "store/hooks";
import { signupverify } from "store/modules/auth";

const SignupPageVerify = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { tokenId }: any = useParams();
  const init = async () => {
    tokenId !== undefined && tokenId !== null && tokenId !== ""
      ? dispatch(signupverify({ token: tokenId })).then(() => {
          history.push("/");
        })
      : history.push("/signup");
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenId]);

  return (
    <Row>
      <Col md={6} lg={4} className="mx-auto mt-5">
        <Card>
          <Card.Body>
            <Card.Title>Email Verify</Card.Title>
            <Card.Subtitle className="mb-3 text-muted">
              Please wait while verify your email.
            </Card.Subtitle>
            <Link to="/signin" className="d-block my-2 text-center">
              Go to Sign in Page
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SignupPageVerify;
