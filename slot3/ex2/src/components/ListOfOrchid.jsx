import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Orchid from './Orchid.jsx';
import { listOfOrchids } from '../listOfOrchid';


function ListOfOrchid() {
    return (
        <Container>
            <Row>
                {listOfOrchids.map((orchid) => (
                    <Col md={4} key={orchid.id} className="mb-4 d-flex">
                        <Orchid
                            id={orchid.id}
                            orchidName={orchid.orchidName}
                            description={orchid.description}
                            category={orchid.category}
                            isSpecial={orchid.isSpecial}
                            image={orchid.image}
                            price={orchid.price}

                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ListOfOrchid;