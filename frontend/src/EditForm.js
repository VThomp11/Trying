import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { itemContext } from './App';
import { addItem, getItems } from './apiService';

const EditForm = () => {
    const [items, setItems] = useState([]);
    const [newItemId, setNewItemId] = useState('');
    const [newItemPrice, setNewItemPrice] = useState('');
    const [newItemName, setNewItemName] = useState('');
    const [newItemType, setNewItemType] = useState('');
    const [updatedName, setUpdatedName] = useState('');
    const [updatedPrice, setUpdatedPrice] = useState('');
    const [selectedNameItemId, setSelectedNameItemId] = useState('');
    const [selectedPriceItemId, setSelectedPriceItemId] = useState('');

    useEffect(() => {
        getItems()
            .then((data) => setItems(data))
            .catch((error) => console.error('Error fetching items:', error));
    }, []);

    const handleDelete = (id) => {
        console.log('Deleting item with ID:', id);
        fetch(`http://localhost:8080/items/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response not ok');
                }
                return response.json();
            })
            .then(() => {
                getItems().then((data) => setItems(data));
            })
            .catch((error) => console.error('Error deleting:', error));
    };

    const handleAddItem = () => {
        console.log("Adding item with values:", {
            id: newItemId,
            name: newItemName,
            type: newItemType,
            price: newItemPrice,
        });
        addItem({ id: newItemId, name: newItemName, type: newItemType, price: newItemPrice })
            .then(() => {
                getItems().then((data) => setItems(data));
                setNewItemId('');
                setNewItemName('');
                setNewItemType('');
                setNewItemPrice('');
            })
            .catch((error) => console.error('Error adding:', error));
    };

    const handleUpdateName = () => {
        if (selectedNameItemId) {
            console.log('Selected Item ID:', selectedNameItemId);
            console.log('Updating item name to:', updatedName);

            fetch(`http://localhost:8080/items/${selectedNameItemId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: updatedName }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response not ok');
                    }
                    return response.json();
                })
                .then(() => {
                    console.log('After successful fetch call');
                    getItems().then((data) => setItems(data));
                    setUpdatedName('');
                    setSelectedNameItemId(null);
                })
                .catch((error) => {
                    console.error('Error updating item name:', error);
                });
        }
    };

    const handleUpdatePrice = () => {
        if (selectedPriceItemId) {
            console.log('Selected Item ID:', selectedPriceItemId);
            console.log('Updating item price to:', updatedPrice);

            fetch(`http://localhost:8080/items/${selectedPriceItemId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ price: updatedPrice }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response not ok');
                    }
                    return response.json();
                })
                .then(() => {
                    console.log('After successful fetch call');
                    getItems().then((data) => setItems(data));
                    setUpdatedPrice('');
                    setSelectedPriceItemId(null);
                })
                .catch((error) => {
                    console.error('Error updating item price:', error);
                });
        }
    };

    return (
        <div className="App">
            <div className="items-list">
                <h1>Items</h1>
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            <span>{item.name}</span>
                            <span className="price">{item.price}</span>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="add-item-section">
                <h2>Add item</h2>
                <input
                    type="text"
                    value={newItemId}
                    onChange={(e) => setNewItemId(e.target.value)}
                    placeholder="New Item Id"
                />
                <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="New Item Name"
                />
                <input
                    type="text"
                    value={newItemType}
                    onChange={(e) => setNewItemType(e.target.value)}
                    placeholder="New Item Type"
                />
                <input
                    type="text"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    placeholder="New Item Price"
                />
                <button onClick={handleAddItem}>Add item</button>
            </div>
            <div className="update-section">
                <h2>Update Item Name</h2>
                <select
                    value={selectedNameItemId || ''}
                    onChange={(e) => setSelectedNameItemId(e.target.value)}
                >
                    <option value="" disabled>Select Item</option>
                    {items.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
                <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    placeholder="New Name"
                />
                <button onClick={handleUpdateName}>Update Name</button>
            </div>

            <div className="update-section">
                <h2>Update Item Price</h2>
                <select
                    value={selectedPriceItemId || ''}
                    onChange={(e) => setSelectedPriceItemId(e.target.value)}
                >
                    <option value="" disabled>Select Item</option>
                    {items.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
                <input
                    type="text"
                    value={updatedPrice}
                    onChange={(e) => setUpdatedPrice(e.target.value)}
                    placeholder="New Price"
                />
                <button onClick={handleUpdatePrice}>Update Price</button>
            </div>
        </div>
    );
};

export default EditForm;
