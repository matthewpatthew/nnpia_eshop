import React, { useEffect, useState } from "react";
import { deleteAppUser, listAppUsers } from "../services/AppUserService.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";


const ListAppUsersComponent = () => {

    const [appUsers, setAppUsers] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllAppUsers();
    }, []);

    function getAllAppUsers() {
        listAppUsers().then((response) => {
            setAppUsers(response.data);
        }).catch(error => {
            navigator("/products");
        });
    }

    function add() {
        navigator("/add-appuser");
    }

    function update(id) {
        navigator(`/edit-appuser/${id}`);
    }

    function delete_(id) {
        deleteAppUser(id).then((response) => {
            getAllAppUsers();
        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <div className="container">
            <h2 className="text-center heading">USERS</h2>
            <div>
                <button className="btn btn-primary mb-2"
                        onClick={add}>Add
                </button>
            </div>
            <table className="table table-responsive table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Roles</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    appUsers.map(appUser =>
                        <tr key={appUser.id}>
                            <td>{appUser.id}</td>
                            <td>{appUser.username}</td>
                            <td>{appUser.email}</td>
                            <td>{appUser.roles.map(role => role.name).join(", ")}</td>
                            <td>
                                <button className="btn btn-primary me-2"
                                        onClick={() => update(appUser.id)}>Update
                                </button>
                                <button className="btn btn-danger btn"
                                        onClick={() => delete_(appUser.id)}>Delete
                                </button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
};

export default ListAppUsersComponent;
