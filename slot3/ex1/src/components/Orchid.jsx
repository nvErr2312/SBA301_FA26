import React from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import "../styles/orchid.css";

function Orchid({ orchidName, description, category, isSpecial, image}) {

    // const orchid = {
    //     id: "1",
    //     orchidName: "Ceasar 4N",
    //     description:
    //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. or sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. or sit amet, consectetur adipiscing elit.",
    //     category: "Dendrobium",
    //     isSpecial: true,
    //     image: "images/hoalan1.jpg",
    // };

    return(
        <div>
            <Container className="py-5">
                <Row>
                    <Col>
                        <Card className="orchid-card">
                            <Card.Img
                                variant="top"
                                src={image}
                                className="orchid-image"
                            />

                            <Card.Body>
                                <Card.Title className="orchid-title">
                                {orchidName}
                                </Card.Title>

                                <Card.Subtitle className="orchid-category">
                                {category}
                                </Card.Subtitle>

                                <Card.Text className="orchid-desc">
                                {description}
                                </Card.Text>

                                {isSpecial && (
                                <span className="special-badge">Special Orchid</span>
                                )}
                            </Card.Body>
                            </Card>

                    </Col>
                </Row>
            </Container>
        </div>
  );
}
export default Orchid