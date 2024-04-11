import React, {useState, useEffect} from "react";
import {listRoles} from "../services/RolesService.jsx";


const AppUserComponent = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('Default123');
    const [roles, setRoles] = useState([]);
    const [allRoles, setAllRoles] = useState([]);

    useEffect(() => {
        listRoles().then((response) => {
            setAllRoles(response.data)
        }).catch(error => {
            console.error(error)
        })
    }, []);

    function createAppUser(e) {
        e.preventDefault()
        const AppUser = {username, email, password, roles}
        console.log(AppUser)
    }

    function toggleRole(roleId) {
        setRoles(prevSelectedRoles => {
            if (prevSelectedRoles.includes(roleId)) {
                return prevSelectedRoles.filter(id => id !== roleId);
            } else {
                return [...prevSelectedRoles, roleId];
            }
        });
    }

    return (
        <div className='container' style={{maxWidth: '600px'}}>
            <div className='row'>
                <div className='card'>
                    <h2 className='text-center'>Add AppUser</h2>
                    <div className='card-body'>
                        <div>
                            <label className='form-label'>Username</label>
                            <input type='text'
                                   className='form-control'
                                   value={username}
                                   onChange={(e) => setUsername((e.target.value))}/>
                        </div>
                        <div className='mb-2'>
                            <label className='form-label'>Email</label>
                            <input type='text'
                                   className='form-control'
                                   value={email}
                                   onChange={(e) => setEmail((e.target.value))}/>
                        </div>
                        <div className='mb-2'>
                            <label className='form-label'>Password</label>
                            <input type='text'
                                   className='form-control'
                                   value={email}
                                   onChange={(e) => setPassword((e.target.value))}/>
                        </div>
                        <div className='mb-2'>
                            <label className='form-label'>Roles</label>
                            {allRoles.map(role => (
                                <div key={role.id} className='form-check'>
                                    <input
                                        type='checkbox'
                                        className='form-check-input'
                                        id={`role-${role.id}`}
                                        value={role.id}
                                        checked={roles.includes(role.id)}
                                        onChange={() => toggleRole(role.id)}
                                    />
                                    <label className='form-check-label' htmlFor={`role-${role.id}`}>{role.name}</label>
                                </div>
                            ))}
                        </div>
                        <div>
                            <button className='btn btn-primary mb-2 me-4' onClick={createAppUser}>Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppUserComponent;