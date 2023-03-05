import { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Row>
            <Col md={6}>
              <h1 className="pb-5">Oops... something went wrong!</h1>
              <Link to="/">Go Home</Link>
            </Col>
          </Row>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
