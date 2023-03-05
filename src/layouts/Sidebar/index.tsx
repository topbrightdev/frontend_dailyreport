import React from 'react'
import Nav from "react-bootstrap/Nav";
import { useHistory } from 'react-router-dom';

function Sidebar() {
    const history = useHistory()

    return (
        // <Nav defaultActiveKey="/" className="flex-column navcontent">
        //     <Nav.Link className="navitem" href="/">
        //          <i className="bi bi-stickies-fill"></i> Daily report
        //     </Nav.Link>
        //     <Nav.Link className="navitem" href="/all">
        //       {" "}
        //       <i className="bi bi-people-fill"></i> All Reports
        //     </Nav.Link>
        //     <Nav.Link className="navitem" eventKey="link-2">
        //       {" "}
        //       <i className="bi bi-wallet-fill"></i> Pay amount
        //     </Nav.Link>
        // </Nav>
        <div className="flex-column navcontent">
          <button className="navitem" onClick={() => history.push('/')}>
          <i className="bi bi-stickies-fill"></i> Daily report
          </button>
          <button className="navitem" onClick={() => history.push('/all')}>
          <i className="bi bi-people-fill"></i> All Reports
          </button>
          <button className="navitem">
          <i className="bi bi-wallet-fill"></i> Pay amount
          </button>
        </div>
    )
}

export default Sidebar;