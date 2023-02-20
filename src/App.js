import { Routes, Route } from 'react-router-dom';
import Drawer from "./Drawer/Drawer";
import Header from "./components/Header";
import React from "react";
import axios from "axios";
import Home from './pages/Home';
import AppContext from './Context';
import Orders from './pages/Orders';


function App() {

  const [items, setItems] = React.useState([]);
  const [cardOpened, setCartOpened] = React.useState(false);
  const [cartItem, setCartItem] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [favorites, setFavorites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponce, itemsResponce, favoritesResponce] = await Promise.all([
          axios.get('https://63d96abc5a330a6ae17b6eee.mockapi.io/card'),
          axios.get('https://63d96abc5a330a6ae17b6eee.mockapi.io/items'),
          axios.get('https://63efce834d5eb64db0d16ba0.mockapi.io/favorites')
        ])


        setIsLoading(false);
        setCartItem(cartResponce.data);
        setFavorites(favoritesResponce.data);
        setItems(itemsResponce.data);
      } catch (error) {
        alert('Ошибка при запросе данных');
        console.error(error);
      }
    }

    fetchData();


  }, []);

  const onAddToCart = async (obj) => {
    try {
      if (cartItem.find((item) => Number(item.id) === Number(obj.id))) {
        setCartItem((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
        await axios.delete(`https://63d96abc5a330a6ae17b6eee.mockapi.io/card/${obj.id}`);
      } else {
        setCartItem((prev) => [...prev, obj]);
        await axios.post('https://63d96abc5a330a6ae17b6eee.mockapi.io/card', obj);
      }
    } catch (error) {
      alert('Не удалось добавить ы корзину');
      console.error(error)
    }
  }

  const onRemoveItem = (id) => {
    try {
      console.log(id);
      axios.delete(`https://63d96abc5a330a6ae17b6eee.mockapi.io/card/${id}`);
      setCartItem((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert('Ошибка при удалении обьекта')
      console.error(error)
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const onAddToFavorite = (obj) => {
    setFavorites((prev) => [...prev, obj]);
  }

  const isItemAdded = (id) => {
    return cartItem.some((obj) => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{
      items,
      cartItem,
      isItemAdded,
      setCartOpened,
      setCartItem,
      favorites,
      isLoading,
      onAddToCart,
      onAddToFavorite
    }}>
      <div className="wrapper clear">
        <Drawer items={cartItem}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cardOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route path='/' element={<Home
            items={items}
            searchValue={searchValue}
            cartItem={cartItem}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToCart={onAddToCart}
            onAddToFavorite={onAddToFavorite}
            isLoading={isLoading}
          />} />
        </Routes>
        <Routes>
          <Route path='/orders' element={
            <Orders />
          }
          />
        </Routes>

      </div>
    </AppContext.Provider>
  );
}

export default App;
