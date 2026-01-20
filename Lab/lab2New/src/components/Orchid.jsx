import React from 'react';
import { Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "../styles/orchid.css";

function Orchid({ id, orchidName, category, isSpecial, image, price, description }) {
  return (
    <Card className="orchid-card h-100 w-100">
      {/* Image + Special badge */}
      <div className="image-wrapper">
        <Card.Img
          variant="top"
          src={image}
          className="orchid-image"
        />

        {isSpecial && (
          <span className="special-badge-corner">
            🌟 Special Orchid
          </span>
        )}
      </div>

      {/* <Card.Body className="orchid-body">
        <Card.Title className="orchid-title text-center">
          {orchidName}
        </Card.Title>

        <Card.Subtitle className="orchid-category text-center">
          {category}
        </Card.Subtitle>

        <Card.Text className="orchid-price text-center">
          Price: {price.toLocaleString()} VND
        </Card.Text>

        <Link to={`/orchid/${id}`} style={{ textDecoration: 'none' }}>
          <Button
            variant="outline-success"
            className="detail-btn mt-auto w-100"
          >
            Detail
          </Button>
        </Link>
      </Card.Body> */}

        <Card.Body className="orchid-body">
          <Card.Title className="orchid-title text-center"> 
            {orchidName}
          </Card.Title>

          <Card.Subtitle className="orchid-category text-center">
            {category}
          </Card.Subtitle>

          <Card.Text className="orchid-price text-center">
            {price.toLocaleString()} VND
          </Card.Text>

          <Link to={`/orchid/${id}`} style={{ textDecoration: 'none'}}>
            <Button
              variant ="outline-success"
              className= "detail-btn mt-auto w-100"
            >
              Detail
            </Button>
          </Link>
        </Card.Body> 
      
    </Card>
  );
}

export default Orchid;
