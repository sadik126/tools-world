import React from 'react';

const Selectadmin = ({ user, role, refetch, index, deleteUser, makeAdmin }) => {
    const { email } = user;
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{user.email}</td>
            <td>{user.role !== "admin" && <button onClick={() => makeAdmin(user)} class="btn btn-xs">make admin</button>}</td>
            <td><button onClick={() => deleteUser(user)} class="btn btn-xs btn-error">delete user</button></td>
        </tr>
    );
};

export default Selectadmin;