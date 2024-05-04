import React, {useEffect, useState} from "react";
import {deleteAppUser, getCount, listAppUsers} from "../services/AppUserService.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate} from "react-router-dom";


const ListAppUsersComponent = () => {

    const [appUsers, setAppUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(9);
    const [count, setCount] = useState(0);

    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");

    const navigator = useNavigate();

    useEffect(() => {
        countAppUsers();
        getAllAppUsers();
    }, [page, size, sortBy, sortOrder]);

    function countAppUsers() {
        getCount()
            .then((response) => {
                setCount(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function getAllAppUsers() {
        listAppUsers(page, size, sortBy, sortOrder)
            .then((response) => {
                setAppUsers(response.data);
            })
            .catch((error) => {
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
        deleteAppUser(id)
            .then((response) => {
                getAllAppUsers();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const toggleSortOrder = () => {
        setSortOrder(prevSortOrder => prevSortOrder === "asc" ? "desc" : "asc");
    };

    const totalPages = Math.ceil(count / size);
    const hasNextPage = page < totalPages - 1;

    return (
        <div className="container">
            <br/>
            <h2 className="text-center heading">Users</h2>
            <div className="d-flex justify-content-end mb-3">
                <button
                    className="btn btn-primary width110 me-2"
                    onClick={add}>Add
                </button>
                <button className="btn btn-primary width110 me-2"
                        onClick={toggleSortOrder}>{sortOrder === "asc" ? "Asc" : "Desc"}
                </button>
                <select className="form-select width110" value={sortBy || ""}
                        onChange={(e) => setSortBy(e.target.value)}>
                    <option value="id">Sort by...</option>
                    <option value="username">Username</option>
                    <option value="email">Email</option>
                    <option value="firstName">First name</option>
                    <option value="surname">Surname</option>
                    <option value="phoneNumber">Phone number</option>
                </select>
            </div>
            <table className="table table-responsive table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>First name</th>
                    <th>Surname</th>
                    <th>Phone number</th>
                    <th>Roles</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {appUsers.map((appUser) => (
                    <tr key={appUser.id}>
                        <td>{appUser.id}</td>
                        <td>{appUser.username}</td>
                        <td>{appUser.email}</td>
                        <td>{appUser.firstName}</td>
                        <td>{appUser.surname}</td>
                        <td>{appUser.phoneNumber}</td>
                        <td>{appUser.roles.map((role) => role.name).join(", ")}</td>
                        <td>
                            <button
                                className="btn btn-primary me-2"
                                onClick={() => update(appUser.id)}>Update
                            </button>
                            <button
                                className="btn btn-danger btn"
                                onClick={() => delete_(appUser.id)}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-center align-items-center">
                <button
                    className="btn btn-primary me-4 width110"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 0}>Previous
                </button>
                <span className="me-4" style={{color: "WHITE", fontSize: 20}}>{page + 1}</span>
                <button
                    className="btn btn-primary width110"
                    onClick={() => setPage(page + 1)}
                    disabled={!hasNextPage}>Next
                </button>
            </div>
            <br/>
        </div>
    );
};

export default ListAppUsersComponent;