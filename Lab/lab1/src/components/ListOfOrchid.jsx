import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Orchid from './Orchid.jsx';
import { listOfOrchids } from '../listOfOrchid';

function ListOfOrchid() {
  return (
    <Container className="py-5">
      <Row className="g-4">
        {listOfOrchids.map((orchid) => (
          <Col
            key={orchid.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}     
            className="d-flex"
          >
            {/* Orchid card sẽ tự full height */}
            {/* truyền từng prop 1 */}
            <Orchid
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
