import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Orchid from './Orchid.jsx';
import FilterSort from './FilterSort.jsx';
import { listOfOrchids } from '../listOfOrchid';

function ListOfOrchid({searchText }) {
  const [filterCategory,setFilterCategory] = React.useState("");
  const [sortOption,setSortOption] = React.useState("");

  const handleFilterChange = (category) => {
    setFilterCategory(category);
  };

  const handleSortChange = (sort) => {
    setSortOption(sort);
  }

  const categories = [...new Set(listOfOrchids.map(o => o.category))];

  let filteredOrchids = [...listOfOrchids];

  // FILTER
  if (filterCategory) {
    filteredOrchids = filteredOrchids.filter(
      (orchid) => orchid.category === filterCategory
    );
  }
  
  // SORT
  if (sortOption === 'asc') {
    filteredOrchids.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'desc') {
    filteredOrchids.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'name-asc') {
    filteredOrchids.sort((a, b) =>
      a.orchidName.localeCompare(b.orchidName)
    );
  } else if (sortOption === 'name-desc') {
    filteredOrchids.sort((a, b) =>
      b.orchidName.localeCompare(a.orchidName)
    );
  }

  if (searchText) {
  filteredOrchids = filteredOrchids.filter(o =>
    o.orchidName.toLowerCase().includes(searchText.toLowerCase())
  );
}

  return (
    <Container className="py-5">
      {/* Filter & Sort */}
      <FilterSort
        categories={categories}
        onFilterChange={setFilterCategory}
        onSortChange={setSortOption}
      />

      <Row className="g-4">
        {filteredOrchids.map((orchid) => (
          <Col
            key={orchid.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="d-flex"
          >
            {/* <Orchid
              orchidName={orchid.orchidName}
              description={orchid.description}
              category={orchid.category}
              isSpecial={orchid.isSpecial}
              image={orchid.image}
              price={orchid.price}
            /> */}
            <Orchid {...orchid} />

          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ListOfOrchid;
