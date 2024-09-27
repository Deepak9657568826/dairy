import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../style/UserProfile.css';

function UserProfile() {
    const [userData, setUserData] = useState(null);
    const state = useSelector((state) => state);

    useEffect(() => {
        if (state.user) {
            setUserData(state.user.user);
        }
    }, [state.user]);

    if (!userData) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-picture">
                        <img src={`https://ui-avatars.com/api/?name=${userData.name}`} alt="Profile" />
                    </div>
                    <h2 className="profile-name">{userData.name}</h2>
                </div>
                <div className="profile-details">
                    <p className="profile-email"><strong>ईमेल:</strong> {userData.email}</p>
                    <p className="profile-phone"><strong>फोन:</strong> {userData.phoneNumber}</p>
                    <p className="profile-role"><strong>भूमिका:</strong> {userData.role}</p>
                </div>
              
            </div>
        </div>
    );
}

export default UserProfile;
