import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'
import Update from './components/Update';

export const index = () => {
    const endpoint = "https://api.github.com/users";

    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        try {
            const fromLocal = JSON.parse(localStorage.getItem('users'));

            setUsers(fromLocal || []);
        } catch(e) {
            setUsers([]);
        }
    }

    const updateUsers = () => {
        axios.get(endpoint)
        .then(result => {
            localStorage.setItem('users', JSON.stringify(result.data));

            setUsers(result.data);
        });
    }

    useEffect(() => {
        debugger;
        fetchUsers();
    }, [])

  return (
        <>
            <p>Utenti:</p>
            <Update/>
            <ul>
                {users.map(user => <li key={user.id}>Nome: {user.login}</li>)}
            </ul>
        </>
  )
}

export default index;