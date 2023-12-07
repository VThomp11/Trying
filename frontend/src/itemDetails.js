import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getItemById } from './apiService';
import { useUser } from './UserContext';
import EditForm from './EditForm';

const ItemDetail = () => {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const { user } = useUser(); // Retrieve user context
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getItemById(id);
                console.log('Fetched Data:', data);
                setItem(data);
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };

        fetchData();
    }, [id]);

    console.log('Item State:', item);

    if (!item || Object.keys(item).length === 0) {
        return <div>Loading...</div>;
    }

    const handleEditClick = () => {
        setIsEditing(true);
    };

    return (
        <div>
            <h1>Item Detail</h1>
            {item[0] ? (
                <>
                    <p>ID: {item[0].id}</p>
                    <p>Name: {item[0].name}</p>
                    <p>Type: {item[0].type}</p>
                    <p>Price: {item[0].price}</p>

                    {user && (
                        <>
                            {!isEditing ? (
                                <button onClick={handleEditClick}>Edit</button>
                            ) : (
                                <EditForm item={item[0]} />
                            )}
                        </>
                    )}
                </>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default ItemDetail;
