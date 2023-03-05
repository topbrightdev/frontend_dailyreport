import React, {useState, useEffect} from 'react'
import { Row, Col, Button } from "react-bootstrap";
import AsyncLocalStorage from "@createnextapp/async-local-storage";
import { useAppDispatch } from "store/hooks";
import { signout } from "store/modules/auth";

function Header() {
    const dispatch = useAppDispatch(); 

    const [userName, setUserName] = useState('');

    const init = async () => {
        const user = await AsyncLocalStorage.getItem("username");
        setUserName(user);
    };

    
    const handleLoginOut = () => {
        dispatch(signout()).then(() => 
            window.location.reload()
        );
    };

    useEffect(() => {
        init();    
    }, [])

    return (
        <Row className="header">
            <Col className="logocontent">
            <div>
                <img className="logoiimg" src="logo.png" width={90} height={42} alt="It's logos"/>
            </div>
            <div className="logotext">
                <h3>{userName}, Welcome to BY2!</h3>
            </div>
            </Col>
            <Col className="exheader">
            <div className="logoutcontent">
                <Button
                type="button"
                variant="outline-primary"
                onClick={handleLoginOut}
                className="logoutbtn"
                >
                Signout
                </Button>
            </div>
            </Col>
      </Row>
    )
}

export default Header;