import React from 'react'
import { Container, ListGroup, Row, Col, Image } from 'react-bootstrap'


function ListUsers(props) {

    return (
        <div className={props.themecontext? "": "dark"}>
            {
                props.filteredUsers.length === 0 ? (
                    <Container className='container-not-found'>
                        <h4>User not found</h4>
                    </Container>
                ) :
                    (
                        props.filteredUsers.map((users) => (
                            <ListGroup key={users.id}  className={props.themecontext? "": "dark"}>
                                <ListGroup.Item className="List-users">
                                    <Row>
                                        <Col sm={3}>
                                            <Image className="card-img" src={users.avatar} alt={users.first_name} />
                                        </Col>
                                        <Col sm={9}>
                                            <h4>{users.first_name} {users.last_name}</h4>
                                            <p>{users.email}</p>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>

                        )))
            }

        </div>
    )
}

export default ListUsers;