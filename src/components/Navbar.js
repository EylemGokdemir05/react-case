import React from "react";
import { connect } from "react-redux";
const Navbar = (props) => {
  let total = 0;
  Object.keys(props.items.addedProducts).forEach(function (item) {
    total += props.items.addedProducts[item].quantity * props.items.addedProducts[item].price;
  });
  return (
    <nav className="navbar">
      <>
        <h1 style={{ fontFamily: "cursive" }}>market</h1>
        <div className="basket">
          <img src={require('../assets/shopping-bag.png')} width="24" height="24" style={{ marginLeft: "2px", marginTop: "25px" }}></img>
          <p style={{ marginLeft: "42px", marginTop: "-24px" }}>₺ {Number(total).toLocaleString("en-US")}</p>
        </div>
      </>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    total: state.total,
  };
};

export default connect(mapStateToProps, null)(Navbar);