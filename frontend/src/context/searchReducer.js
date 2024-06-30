const searchReducer = (search, action)=>{
    if(action.type === "search"){
        return (
            {
                destination: action.destination,
                checkIn: action.checkIn,
                checkOut: action.checkOut,
                adultCount: action.adultCount,
                childCount: action.childCount,
                hotelId: action.hotelId,
            }
        )
    }
    return search
};

export default searchReducer;