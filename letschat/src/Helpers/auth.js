export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const authenticate = (response, next) => {
   
 
    setLocalStorage('token', response.data.token);
 
    
};