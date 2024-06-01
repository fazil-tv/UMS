

import React, { useEffect, useState } from 'react'
import Navbar from '../adminnavbar/adminnavbar'

import { useGetUserDataMutation } from '../../../redux/admin/adminApi';
import EditUser from '../edituser/EditUser';
import './admindashboard.css';
import { Adduser } from '../shard/adduser';


function AdminDashboard() {

  const [getUserData, { error }] = useGetUserDataMutation({});

  const [users, setUsers] = useState([]);


  const fetchData = async () => {
    try {
      const response = await getUserData({}).unwrap();
      if (response.status) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditComplete = () => {
    fetchData();
  };


  return (
    <>
      <Navbar />

      <div className='admin-userdata container'>
        <Adduser onEditComplete={handleEditComplete} className="" />
        <table className="border-collapse  admin-table mt-5">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2 text-center">profile</th>

              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (

              <tr key={user.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  <div className="adminavatar bg-cover">
                    <img
                      alt="img"
                      src={user.imgUrl ? `/userImages/${user.imgUrl}` : `/userImages/user.png`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </td>

                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.isAdmin ? "false" : "true"}</td>
                <td className="border px-4 py-2 justify-center ">

                  <EditUser currentUser={user} onEditComplete={handleEditComplete} />

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </>
  )
}

export default AdminDashboard