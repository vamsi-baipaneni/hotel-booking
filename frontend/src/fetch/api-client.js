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