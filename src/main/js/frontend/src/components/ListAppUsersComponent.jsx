import React, {useEffect, useState} from "react";
import {listAppUsers} from "../services/AppUserService.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";


const ListAppUsersComponent = () => {

    const [appUsers, setAppUsers] = useState([])
    const navigator = useNavigate()

    useEffect(() => {
        listAppUsers().then((response) => {
            setAppUsers(response.data)
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                navigator('/login');
            }
        })


    }, []);

    function addNewAppUser() {
        navigator('/add-appuser')
    }

    function deleteAppUser() {

    }

    function updateAppUser() {

    }


    return (
        <div className='container'>
            <h2 className='text-center'>Users</h2>
            <div>
                <button className='btn btn-primary mb-2 me-4' onClick={addNewAppUser}>Add AppUser</button>
                <button className='btn btn-primary mb-2 me-4' onClick={deleteAppUser}>Delete AppUser</button>
                <button className='btn btn-primary mb-2' onClick={updateAppUser}>Update AppUser</button>
            </div>
            <table className='table table-responsive table-bordered'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Roles</th>
                </tr>
                </thead>
                <tbody>
                {
                    appUsers.map(appUser =>
                        <tr key={appUser.id}>
                            <td>{appUser.id}</td>
                            <td>{appUser.username}</td>
                            <td>{appUser.email}</td>
                            <td>{appUser.roles.map(role => role.name).join(', ')}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}

export default ListAppUsersComponent