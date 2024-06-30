import React, {useContext, createContext, useReducer} from 'react';
import PropTypes from 'prop-types';
import searchReducer from './searchReducer';
const SearchContext = createContext(undefined);

const SearchParams = {
    destination: '',
    checkIn: '',
    checkOut: '',
    adultCount: 0,
    childCount: 0,
    hotelId: '',
  };

export const SearchContextProvider = ({children}) => {
    const [search, dispatch] = useReducer(searchReducer, SearchParams);

    const handleSearchTask = (destination, checkIn, checkOut, adultCount, childCount, hotelId)=>{
        dispatch({
            type: "search",
            destination: destination,
            checkIn: checkIn,
            checkOut: checkOut,
            adultCount: adultCount,
            childCount: childCount,
            hotelId: hotelId || "",
            })
    };

  return (
    <SearchContext.Provider value={{search, handleSearchTask}}>
      {children}
    </SearchContext.Provider>
  )
}

SearchContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export const useSearchProvider = ()=>{
    const context = useContext(SearchContext);
    return context;
}
