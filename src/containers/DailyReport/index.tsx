import "./main.css";
import { Modal, Form, Container, Button}  from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import  {useFormik} from "formik";
import  AsyncLocalStorage  from "@createnextapp/async-local-storage";
import { useAppDispatch } from "store/hooks";
import { createreporting, getreporting } from "store/modules/report";
import CustomPaginationActionsTable from "components/DailyReportTable";


const initialValues = {
  content: "",  
  name: "",
  createdAt: "",
  updatedAt: ""
}


const DailyReport =() => {
  
  const [reportName, setReportName] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  const init = async () => {
    const user = await AsyncLocalStorage.getItem("username"); 
    setReportName(user);
    return user
  }
  useEffect(() => {
    init().then((username: string) =>
      dispatch(getreporting(username))
    );
  },[])
  
  const formik = useFormik({
    initialValues,
    onSubmit: (values, actions) => {
      const d = new Date().toLocaleDateString(); 
     
      values.name = reportName;
      values.createdAt = d;

      dispatch(createreporting(values));

      actions.resetForm({ values: initialValues });
    },
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); 

  
  return (
    <Container className="reportcontent">
        <div >
          <h4 className="contecttitle">This is . YOu</h4>
          <div className="reportbtncontent">
                <Button className="reportbtn" variant="primary" onClick={handleShow}>
                    Report
                </Button>
          </div>
          
          <Modal show={show} onHide={handleClose}>
              <Form onSubmit={formik.handleSubmit}>
                <Modal.Header closeButton>
                  <Modal.Title>Input about your daily work</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group
                      className="mb-3"
                    >
                      <Form.Label>What did you do today?</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3} 
                        type="text"
                        name="content"
                        id="content"
                        value={formik.values.content}
                        onChange={formik.handleChange}
                      />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button type="submit" variant="secondary" onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Form>
          </Modal>
          
          <div className="reportTableContent">
            <CustomPaginationActionsTable />
          </div>
        </div>  
    </Container>
  )

}

export default DailyReport;
