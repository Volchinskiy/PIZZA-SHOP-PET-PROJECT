import { combineReducers} from "redux"
import pizzasReduser from './pizzas';
import filtersReduser from './filters';

const rootReduser = combineReducers({
  filters: filtersReduser,
  pizzas: pizzasReduser
})

export default rootReduser;