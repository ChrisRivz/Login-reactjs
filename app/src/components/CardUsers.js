import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'


function CardUsers(props) {

    return (
        <div className={props.themecontext? "": "dark"}>
            {
                props.filteredUsers.length === 0 ? (
                    <Container className='container-not-found'>
                        <h4>User not found</h4>
                    </Container>
                ) :
                    (<Row>
                        {
                            props.filteredUsers.map((users) => (
                                <Col className="card-users" key={users.id} sm={4}>
                                    <Card className="card-users-section">
                                        <Card.Img className="card-img" src={users.avatar} alt={users.first_name} />
                                        <Card.Body>
                                            <Card.Title>{users.first_name} {users.last_name}</Card.Title>
                                            <Card.Text>
                                                <label className="label-small">{users.email}</label>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>

                            ))
                        }
                    </Row>
                    )
            }
        </div>
    )
}

export default CardUsers;