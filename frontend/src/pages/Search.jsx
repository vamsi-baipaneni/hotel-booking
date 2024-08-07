import React, { useState } from 'react'
import { useSearchProvider } from '../context/SearchContext';
import { useQuery } from 'react-query';
import * as apiClient from '../fetch/api-client'
import { BsFillStarFill, BsMoonStars, BsStar, BsStarFill } from 'react-icons/bs';
import ImageDisplay from '../components/ImageDisplay';
import Pagination from '../components/Pagination';
import StarRatingFilter from '../components/StarRatingFIlter';
import HotelTypeFilter from '../components/HotelTypeFilter';
import HotelFacilitiesFilter from '../components/HotelFacilitiesFilter';
import MaxPriceFilter from '../components/MaxPriceFilter';

const Search = () => {
    const search = useSearchProvider();

    const [page,setPage] = useState(1);
    const [stars, setStars] = useState([]);
    const [types, setTypes] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [maxPrice, setMaxPrice] = useState('');
    const searchParams = {
        destination: search.destination.toString(),
        checkIn: search.checkIn? search.checkIn.toISOString() : '',
        checkOut: search.checkOut? search.checkOut.toISOString() : '',
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: stars,
        types: types,
        maxPrice: maxPrice,
    }
    const {data, isLoading} = useQuery(['findHotels',searchParams], 
    ()=>apiClient.searchHotels(searchParams),{
        enabled: !!search.checkIn && !!search.checkOut,
    })

    if(!search.checkIn || !search.checkOut){
        return(<div className='flex items-center justify-center text-3xl text-gray-500'>Please select proper dates</div>)
    }

    if(isLoading){
        return(
            <h1 className='flex items-center justify-center text-3xl text-gray-500'>
                Loading...
            </h1>
        )
    }

    const handleStarsChange = (event)=>{
        const selectedStar = event.target.value;
        
        setStars((prevStars)=>event.target.checked ? [...prevStars, selectedStar] : prevStars.filter((star)=> star!==selectedStar))
    }

    const handleTypesChange = (event)=>{
        const selectedType = event.target.value;

        setTypes((prevTypes)=>event.target.checked? [...prevTypes, selectedType] : prevTypes.filter(type=>type!==selectedType))
    }

    const handleFacilitiesChange = (event)=>{
        const selectedFacilitiy = event.target.value;

        setFacilities(prevFacilities => event.target.checked? [...prevFacilities,selectedFacilitiy]: prevFacilities.filter(facility=>facility!==selectedFacilitiy));
    }

    const handleMaxPriceChange = (price)=>{
        setMaxPrice(price);
    }

    return (
        <div className='flex flex-col lg:flex-row gap-5'>
            <div className='flex-1 lg:flex-none lg:w-1/6 border lg:sticky lg:top-10 rounded-lg p-5 self-start'>
                <div className='space-y-5 flex flex-row lg:flex-col'>
                    <h3 className='text-lg font-semibold border-b pb-5'>
                        Filter By:
                    </h3>
                    <StarRatingFilter selectedStars={stars} onChange={handleStarsChange}/>
                    <HotelTypeFilter selectedTypes={types} onChange={handleTypesChange}/>
                    <HotelFacilitiesFilter selectedFacilities={facilities} onChange={handleFacilitiesChange}/>
                    <MaxPriceFilter currentMaxPrice = {maxPrice} onChange = {handleMaxPriceChange}/>
                </div>
            </div>
            <div className='flex flex-1 flex-grow flex-col gap-2'>
                <h1 className='font-semibold text-2xl'>{data.pagination.total} Hotels found 
                    {search.destination ? ` in ${search.destination}` : ""}
                </h1>
                {data.hotels.map((hotel, index)=>(
                    <div className='border rounded-md p-4 grid grid-cols-1 xl:grid-cols-[2fr_3fr] gap-3' key={index}>
                        <ImageDisplay imageUrls={hotel.imageUrls}/>
                        <div className='grid grid-rows-[1fr_2fr_1fr]'>
                            <div className='flex flex-col'>
                                <div className='flex flex-row items-center'>
                                    {Array.from({length: parseInt(hotel.starrating, 10)}).map((_, index)=>(
                                        <BsFillStarFill size={10} key={index} className='fill-yellow-300'/>
                                    ))}
                                    <span className='font-light text-xs pl-2'>{hotel.type}</span>
                                </div>
                                <h1 className='text-2xl font-bold  tracking-wide pb-4'>
                                    {hotel.name}
                                </h1>
                            </div>
                            <span className='text-s font-light tracking-tight pb-8 line-clamp-6'>
                                {hotel.description}
                            </span>
                            <div className='grid grid-cols-2 items-end whitespace-nowrap'>
                                <div className='flex items-center gap-1'>
                                    {hotel.facilities.slice(0,3).map((facility,index)=>(
                                        <span className='text-xs font-bold bg-gray-400 rounded-md p-2' key={index}>{facility}</span>
                                    ))}
                                    <span className='text-sm'>{hotel.facilities.length >3 ? `+${hotel.facilities.length - 3} more` : ''}</span>
                                </div>
                                <div className='flex items-end flex-col gap-1'>
                                    <span className='text-s tracking-tight font-light flex justify-end pb-1'>
                                        <span className='font-bold pr-1'>${hotel.pricePerNight}</span>per night
                                    </span>
                                    <button className='bg-blue-600 p-2 text-white rounded-sm active:bg-blue-800 tracking-tight font-bold h-full max-w-fit'>
                                        View More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className='flex items-center justify-center mt-10'>
                    <Pagination page={data.pagination.page || 1} pages={data.pagination.pages || 1} onPageChange={(page)=>setPage(page)}/>
                </div>
            </div>
        </div>
    )
}

export default Search
