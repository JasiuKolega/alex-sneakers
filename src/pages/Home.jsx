import React from "react";
import Card from "../components/Card";

function Home({ searchValue, onChangeSearchInput, items, onAddToCart, onAddToFavorite, isLoading }) {

  


  const renderItems = () => {
    const filtredItems = items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));
    return  (isLoading ? [...Array(11)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onPlus={(obj) => onAddToCart(obj)}
        onFavorite={(obj) => onAddToFavorite(obj)}
        loading={isLoading}
        {...item}
      />
    ))
  };


  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className="search-block d-flex align-center">
          <img width={14} height={14} src="/img/search.png" alt="Search" />
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
        </div>
      </div>


      <div className="d-flex flex-wrap">
        {renderItems()}
      </div>


    </div>
  );
}

export default Home;