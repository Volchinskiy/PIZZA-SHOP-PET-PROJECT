import { combineReducers} from "redux"
import pizzasReduser from './pizzas';
import filtersReduser from './filters';

const rootReduser = combineReducers({
  filter: filtersReduser,
  pizzas: pizzasReduser
})

export default rootReduser;