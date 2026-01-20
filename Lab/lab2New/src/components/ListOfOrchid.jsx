  import React from 'react';
  import { Container, Row, Col } from 'react-bootstrap';
  import Orchid from './Orchid.jsx';
  import FilterSort from './FilterSort.jsx';
  import { listOfOrchids } from '../data/listOfOrchid.js';
  import { useMemo } from 'react';


  function ListOfOrchid({searchText }) {
    const [filterCategory,setFilterCategory] = React.useState("");
    const [sortOption,setSortOption] = React.useState("");

    // const handleFilterChange = (category) => {
    //   setFilterCategory(category);
    // };

    // const handleSortChange = (sort) => {
    //   setSortOption(sort);
    // }

    const categories = [...new Set(listOfOrchids.map(o => o.category))];


  //   // FILTER
  //   if (filterCategory) {
  //     filteredOrchids = filteredOrchids.filter(
  //       (orchid) => orchid.category === filterCategory
  //     );
  //   }
    
  //   // SORT
  //   if (sortOption === 'asc') {
  //     filteredOrchids.sort((a, b) => a.price - b.price);
  //   } else if (sortOption === 'desc') {
  //     filteredOrchids.sort((a, b) => b.price - a.price);
  //   } else if (sortOption === 'name-asc') {
  //     filteredOrchids.sort((a, b) =>
  //       a.orchidName.localeCompare(b.orchidName)
  //     );
  //   } else if (sortOption === 'name-desc') {
  //     filteredOrchids.sort((a, b) =>
  //       b.orchidName.localeCompare(a.orchidName)
  //     );
  //   }

  //   if (searchText) {
  //   filteredOrchids = filteredOrchids.filter(o =>
  //     o.orchidName.toLowerCase().includes(searchText.toLowerCase())
  //   );
  // }

    const filteredOrchids = useMemo(() => {
    let result = [...listOfOrchids];

    // FILTER
    if (filterCategory) {
      result = result.filter(
        orchid => orchid.category === filterCategory
      );
    }

    // SEARCH
    if (searchText) {
      result = result.filter(
        orchid =>
          orchid.orchidName
            .toLowerCase()
            .includes(searchText.toLowerCase())
      );
    }

    // SORT
    switch (sortOption) {
      case 'asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) =>
          a.orchidName.localeCompare(b.orchidName)
        );
        break;
      case 'name-desc':
        result.sort((a, b) =>
          b.orchidName.localeCompare(a.orchidName)
        );
        break;
      default:
        break;
    }

    return result;
  }, [filterCategory, sortOption, searchText]);


    return (
      <div className="py-4">
      <FilterSort
        categories={categories}
        onFilterChange={setFilterCategory}
        onSortChange={setSortOption}
      />

      {filteredOrchids.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted">Không tìm thấy kết quả nào</h4>
          <p className="text-muted mt-2">Vui lòng thử lại với từ khóa hoặc bộ lọc khác</p>
        </div>
      ) : (
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
              <Orchid {...orchid} />
            </Col>
          ))}
        </Row>
      )}
    </div>

    );
  }

  export default ListOfOrchid;
