import React, { useState, ChangeEvent } from "react";
import { useAppSelector } from "../../hooks/hooks";
import "./CategoryFilterPanel.scss";

const CategoryFilterPanel = () => {
  const directions = useAppSelector((state) => state.direction.directions);
  const filter = useAppSelector((state) => state.filter.filter);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedFrom, setSelectedFrom] = useState<string>("Choose currency");
  const [selectedTo, setSelectedTo] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedCategory(value);
    setSelectedFrom("Choose currency");
  };

  const handleFromChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedFrom(value);
  };

  const handleToChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedTo(value);
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAmount(Number(value));
  };

  const getCategoryOptions = () => {
    const categories = ["All", "Cryptocurrencies", "Banks", "Cash"];
    return categories.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ));
  };

  const getFromOptions = () => {
    if (selectedCategory === "All") {
      return directions.map((direction) => (
        <option key={direction.code} value={direction.code}>
          {direction.name}
        </option>
      ));
    }

    let selectedFilter;

    if (selectedCategory === "Cryptocurrencies") {
      selectedFilter = directions.filter((f) =>
        ["BTC", "ETH", "USDTTRC"].includes(f.code)
      );
    } else if (selectedCategory === "Banks") {
      selectedFilter = directions.filter((f) =>
        ["ACRUB", "SBERRUB", "TCSBRUB"].includes(f.code)
      );
    } else if (selectedCategory === "Cash") {
      selectedFilter = directions.filter((f) =>
        ["CASHUSD", "CASHRUB"].includes(f.code)
      );
    }

    if (!selectedFilter) {
      return null;
    }

    return selectedFilter.map((currency) => (
      <option key={currency.code} value={currency.code}>
        {currency.name}
      </option>
    ));
  };

  const getToOptions = () => {
    const toOptions = filter.find((item) => item.from.code === selectedFrom);
    return toOptions?.to.map((direction) => (
      <option key={direction.code} value={direction.code}>
        {direction.name}
      </option>
    ));
  };

  const generateRandomRate = () => {
    const minRate = 0.1;
    const maxRate = 10;
    return (Math.random() * (maxRate - minRate) + minRate).toFixed(2);
  };

  const calculateConvertedAmount = () => {
    const rate = Number(generateRandomRate());
    return (amount * rate).toFixed(2);
  };

  const isCategoryFilterPanelVisiable =
    selectedCategory !== "All" && selectedFrom !== "Choose currency";

  const isToOptionsVisiable = selectedFrom !== "Choose currency";
  
  return (
    <div className="category-filter-panel">
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="category-filter-panel__select"
      >
        {getCategoryOptions()}
      </select>
      <select
        value={selectedFrom}
        onChange={handleFromChange}
        className="category-filter-panel__select"
      >
        <option value="Choose currency">Choose currency</option>
        {getFromOptions()}
      </select>
      {isToOptionsVisiable && (
        <select
          value={selectedTo}
          onChange={handleToChange}
          className="category-filter-panel__select"
        >
          {getToOptions()}
        </select>
      )}
      {isCategoryFilterPanelVisiable && (
        <>
          <div className="category-filter-panel__amount">
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="category-filter-panel__input"
            />
          </div>
          <div className="category-filter-panel__rate">
            Rate: {generateRandomRate()}
          </div>
          <div className="category-filter-panel__converted-amount">
            Converted Amount: {calculateConvertedAmount()}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryFilterPanel;
