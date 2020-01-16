export const getTodos = () => {
    console.log('#### getTodos() ', BASE_URI);
    
    fetch(`${BASE_URI}/todos`)
        .then(response => response.json())
        .then(data => console.log(data));
};
