const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const submitForm = async (formData)=>{
        const response = await fetch(`${API_BASE_URL}/api/auth/register`,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        if(!response.ok){
            throw new Error(data.message);
        }
}

export const submitLogin = async (loginData) =>{
    const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    });

    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message);
    }
}

export const validateToken = async () =>{
    const response = await fetch(`${API_BASE_URL}/api/verify/validate`,{
        credentials: 'include'
    });

    if(!response.ok){
        throw new Error("Token invalid")
    }
    return response.json();
}

export const signOut = async() =>{
    const response = await fetch(`${API_BASE_URL}/api/verify/logout`,{
        credentials: 'include',
        method: 'POST'
    });

    if(!response.ok){
        throw new Error("Sign out failed!");
    }
}

export const addHotel = async(hotelFormData)=>{

    const numericFields = ['adults', 'children', 'pricePerNight', 'starrating'];

    numericFields.forEach(field => {
        if (hotelFormData.has(field)) {
            hotelFormData.set(field, parseInt(hotelFormData.get(field), 10));
        }
    });
    
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`,{
        credentials: 'include',
        method: 'POST',
        body: hotelFormData,
    });

    if (!response.ok) {
        // Extract and provide more error details if available
        throw new Error(`Error Adding Hotel ${response.status} ${response.statusText}`);
    }
}

export const myHotels = async()=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`,{
        credentials: 'include',
    });

    if (!response.ok){
        throw new Error(`Error retrieving Hotels ${response.status} ${response.statusText}`)
    }
    
    return response.json();
}

export const findHotelById = async(hotelId)=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`,{
        credentials: 'include',
    });

    if(!response.ok){
        throw new Error(`Error retrieving Hotels ${response.status} ${response.statusText}`)
    }

    return response.json()
}

export const updateHotelById = async(hotelFormData)=>{
    
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,{
        credentials: 'include',
        method: 'PUT',
        body: hotelFormData
    });

    if(!response.ok){
        throw new Error("Something went wrong");
    }

    return response.json()
}


export const searchHotels = async (searchParams) => {
    const queryParams = new URLSearchParams();

    if (searchParams.destination) queryParams.append('destination', searchParams.destination);
    if (searchParams.checkIn) queryParams.append('checkIn', searchParams.checkIn);
    if (searchParams.checkOut) queryParams.append('checkOut', searchParams.checkOut);
    if (searchParams.adultCount) queryParams.append('adultCount', searchParams.adultCount);
    if (searchParams.childCount) queryParams.append('childCount', searchParams.childCount);
    if (searchParams.page) queryParams.append('page', searchParams.page);

    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);

    if (!response.ok) throw new Error("Something went wrong");

    return response.json();
};
