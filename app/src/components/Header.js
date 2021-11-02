import React, { useContext } from 'react'
import { Navbar, Container, ListGroup, Button } from 'react-bootstrap'
import LightMode from '@mui/icons-material/LightMode'
import DarkMode from '@mui/icons-material/DarkMode'
import ThemeContext from '../context/ThemeContext'
import '../css/Header.css'

function Header(props) {

    const [theme, setContext] = useContext(ThemeContext);
    const handleClick = () => {
        setContext(!theme);
    }
    const handlelogout = () =>{
        localStorage.clear();
        window.open("/", '_self');

    }

    return (
        <div>
            <Navbar bd="dark" expand="lg" className="navbar-header">
                <Container>
                    <Navbar.Brand>
                        <ListGroup horizontal className='list-details'>
                            <ListGroup.Item>
                                <a
                                    className="link-name"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://chrisrivz.com/">
                                    Created by Chris</a>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button onClick={handleClick} variant="light">
                                    {
                                        theme
                                            ?
                                            <DarkMode />
                                            :
                                            <LightMode />
                                    }
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>

                    </Navbar.Brand>
                    {

                    }
                    <Navbar.Text className="navbar-text">
                        {
                            localStorage.length === 0
                                ?
                                null
                                :
                                (
                                    <div>
                                        <Navbar.Text>
                                            Signed in as: <a href="#login">
                                                {props.usersessionData.email}</a>
                                        </Navbar.Text>
                                        <br/>
                                        <Navbar.Text onClick={handlelogout} className="Logout-label">
                                            Log out
                                        </Navbar.Text>
                                    </div>

                                )

                        }
                    </Navbar.Text>

                </Container>

            </Navbar>

        </div>
    )
}

export default Header;