import axios from 'axios';


const url = 'http://localhost:8080';


export const getItems = () => {
    return fetch(`${url}/items`, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())

}

export const addItem = (itemData) => {
    return fetch(`${url}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response not ok');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error adding item', error);
            throw error;
        });
};


export const getItemById = async (id) => {
    try {
        const response = await fetch(`${url}/items/${id}`);
        const itemData = await response.json();
        return itemData;
    } catch (error) {
        throw new Error(`Error in getItemById: ${error.message}`);
    }
};


export const editItem = async (itemId, updatedItem) => {
    try {
        const response = await axios.patch(`http://localhost:8080/items/${itemId}`, updatedItem);
        return response.data;
    } catch (error) {
        throw error;
    }
};