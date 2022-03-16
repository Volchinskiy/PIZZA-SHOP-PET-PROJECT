import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setCategory, setSortBy } from './../redux/actions/filters'
import { fetchPizzas } from "../redux/actions/pizzas";
import { Categories, SortPopup, PizzaBlock, PizzaLodingBlock} from "./../components";

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые',];
const sortItems = [
  {name: 'Популярности', type: 'rating', order: 'desc'},
  {name: 'Цена', type: 'price', order: 'desc'},
  {name: 'Алфавиту', type: 'name', order: 'asc'},
];

export default function Home() {
  
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const {category, sortBy} = useSelector(({ filters }) => filters);
  
  React.useEffect( () => {
    dispatch(fetchPizzas(category, sortBy));
  }, [sortBy, category]);
 
  const onSelectCategory = React.useCallback((index) =>{
    dispatch(setCategory(index));
  })

  const onSelectSortType = React.useCallback((type) =>{
    dispatch(setSortBy(type));
  })

  return (
    <div className="container">
      <div className="content__top">
        <Categories 
          activeCategory={category} 
          onClickCategory={(index) => onSelectCategory(index)} 
          items={categoryNames} 
        />
        <SortPopup 
          activeSortType={sortBy.type} 
          items={sortItems} 
          onClickSortType={onSelectSortType} 
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoaded ?
          items.map(( obj ) => <PizzaBlock key={obj.id} isLoading={true} {...obj} />) 
          : 
          Array(12).fill(0).map(( _, index) => <PizzaLodingBlock key={index} />) 
        }
      </div>
    </div>
  )
}
