import React, { useState, useEffect, useReducer, useRef } from "react";
import Card from "../components/Card";
import Filter from "../components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import brands from "../api/companies.json";
import Tabs from "../components/Tabs";

const Home = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(16);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchTagValue, setSearchTagValue] = useState("");
  var sortedList = [];
  const { items } = useSelector((state) => state.items);
  const search = useRef(searchValue);
  const searchTag = useRef(searchTagValue);
  var tags = items.map((item) => {
    return item.tags;
  });

  const lastProductIndex = currentPage * itemPerPage;
  const firstProductIndex = lastProductIndex - itemPerPage;
  const currentProducts = items.slice(firstProductIndex, lastProductIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCheckboxChange = (e) => {
    // const isSelected = selectedItems;
    // const findSelection = isSelected.findIndex(key);
    // if (findSelection > -1) {
    //   isSelected.splice(findSelection, 1);
    // } else {
    //   isSelected.push(key);
    // }
    // setSelectedItems({ selectedItems: isSelected });
    const { name } = e.target;
    console.log("name: ", name)
  };

  // const checkboxItems = () => {
  //   return (
  //     <React.Fragment>
  //       {items.map((item) => (
  //         <Filter
  //           key={item}
  //           text={item}
  //           handleOnChange={() => handleCheckboxChange(item)}
  //           selected={selectedItems.includes(item)}
  //         />
  //       ))}
  //     </React.Fragment>
  //   );
  // };

  const sortByPriceLowToHigh = () => {
    sortedList = items.sort((a, b) => (a.price > b.price ? 1 : -1));
    setIsSorted(true);
    return sortedList;
  };

  const sortByPriceHighToLow = () => {
    sortedList = items.sort((a, b) => (a.price < b.price ? 1 : -1));
    setIsSorted(true);
    return sortedList;
  };

  const handleSearch = (event) => {
    let value = searchValue.trim().toLowerCase();
    setSearchValue(event.target.value);
    if (value.length > 0) {
      brands = brands.filter(function (brand) {
        console.log('filter brand: ',brand.name)
        return brand.name.toLowerCase().match(value);
      });
    }
  };

  const handleSearchTag = (event) => {
    let value = searchTagValue.trim().toLowerCase();
    setSearchTagValue(event.target.value);
    if (value.length > 0) {
      tags = tags.filter(function (tag) {
        console.log('filter tag: ',tag.toString())
        return tag.toString().toLowerCase().match(value);
      });
    }
  };

  return (
    <div className="home">
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* <button onClick={() => navigate("/card")} style={{ width: "70px" }}>
        Card
      </button> */}
        {/* <Filter />
      <hr /> */}
        <div style={{ width: "20%" }}>
          <div className="radio-buttons">
            <p>Sorting</p>
            <div className="radio">
              <input id="radio-1" name="radio" type="radio" onChange={() => sortByPriceLowToHigh()}></input>
              <label htmlFor="radio-1" className="radio-label">
                Price low to high
              </label>
            </div>

            <div className="radio">
              <input id="radio-2" name="radio" type="radio" onChange={() => sortByPriceHighToLow()}></input>
              <label htmlFor="radio-2" className="radio-label">
                Price high to low
              </label>
            </div>

            <div className="radio">
              <input id="radio-3" name="radio" type="radio"></input>
              <label htmlFor="radio-2" className="radio-label">
                New to old
              </label>
            </div>

            <div className="radio">
              <input id="radio-4" name="radio" type="radio"></input>
              <label htmlFor="radio-2" className="radio-label">
                Old to new
              </label>
            </div>
          </div>

          <div className="selectBoxGroup underneath">
            <p style={{ marginLeft: "15px", marginTop: "10px" }}>Brands</p>
            <input
              type="text"
              value={searchValue}
              ref={search}
              onChange={handleSearch}
              placeholder="Search brand"
              style={{
                width: "248px",
                height: "36px",
                marginLeft: "16px",
                borderRadius: "4px",
                marginTop: "10px",
                border: "1px solid lightgrey",
              }}
            />
            {brands.map((brand) => {
              return (
                <div className="selectBox" key={brand.account}>
                  <input type="checkbox" name="chk" id="chk-u-1"></input>
                  <label htmlFor="chk-u-1">{brand.name}</label>
                </div>
              );
            })}
          </div>
          <div className="selectBoxGroup underneath">
            <p style={{ marginLeft: "15px", marginTop: "10px" }}>Tags</p>
            <input
              type="text"
              value={searchTagValue}
              ref={searchTag}
              onChange={handleSearchTag}
              placeholder="Search tag"
              style={{
                width: "248px",
                height: "36px",
                marginLeft: "16px",
                borderRadius: "4px",
                marginTop: "10px",
                border: "1px solid lightgrey",
              }}
            />
            {tags.map((tag) => {
              return (
                <div className="selectBox">
                  <input type="checkbox" name="chk" id="chk-u-1"></input>
                  <label htmlFor="chk-u-1">{tag}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ width: "60%", marginLeft: "12px" }}>
          <p style={{ colo2: "#6F6F6F", fontSize: "20px", marginLeft: "8rem", marginTop: "1rem" }}>Products</p>
          <Tabs />
        </div>
        <div style={{ width: "20%", marginRight: "18px", marginTop: "10px" }}>{items && <Card />}</div>
      </div>

      
    </div>
  );
};

export default Home;
