import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

function FilterSort({ categories, onFilterChange, onSortChange }) {
    const handleFilterChange = (e) => {
        onFilterChange(e.target.value);
    };

    const handleSortChange = (e) => {
        onSortChange(e.target.value);
    };

    return (
        <Form className="mb-4">
            <Row>
                <Col md={6}>
                    <Form.Group controlId="filterCategory">
                        <Form.Label>Filter by Category</Form.Label>
                        <Form.Control as="select" onChange={handleFilterChange}>
                            <option value="">All Categories</option>
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group controlId="sortOption">
                        <Form.Label>Sort by Price</Form.Label>
                        <Form.Control as="select" onChange={handleSortChange}>
                            <option value="">No Sorting</option>
                            <option value="asc">Price: Low to High</option>
                            <option value="desc">Price: High to Low</option>

                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}

export default FilterSort;
