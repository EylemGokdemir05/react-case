import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductList from "./ProductList";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";
import { loadItems } from "../context/action";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("mug");
  
  const { items } = useSelector((state) => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadItems());
  }, []);

  return (
    <div className="tabs">
      <ul className="tabNav">
        <TabNavItem title="Mug" id="mug" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabNavItem title="Shirt" id="shirt" activeTab={activeTab} setActiveTab={setActiveTab} />
      </ul>
      <div className="outlet">
      <TabContent id="mug" activeTab={activeTab}>
          {items && <ProductList items={items} activeTab={activeTab}/>}
        </TabContent>
        <TabContent id="shirt" activeTab={activeTab}>
          {items && <ProductList items={items} activeTab={activeTab}/>}
        </TabContent>
      </div>
    </div>
  );
};

export default Tabs;
