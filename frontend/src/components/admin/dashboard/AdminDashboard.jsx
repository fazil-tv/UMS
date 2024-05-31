

import React, { useEffect, useState } from 'react'
import Navbar from '../adminnavbar/adminnavbar'

import { useGetUserDataMutation } from '../../../redux/admin/adminApi';


function AdminDashboard() {

  const [getUserData, { error }] = useGetUserDataMutation({});

  const [users, setUsers] = useState([]);

  useEffect(() => {
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

    fetchData();
  }, []);

  console.log(users, "users")


  const [editingUserId, setEditingUserId] = useState(null);

  const handleEditClick = (userId) => {
    // setEditingUserId(userId);

  };

  const handleSaveClick = (userId) => {

    setEditingUserId(null);
  };





  return (
    <>
      <Navbar />

      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
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
              <td className="border px-4 py-2">{editingUserId === user.id ? <input type="text" defaultValue={user.name} /> : user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.isAdmin ? "false" : "true"}</td>
              <td className="border px-4 py-2">

                <button onClick={() => handleEditClick(user.id)} className="bg-green-500 font-bold py-2 px-4 rounded">Edit</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>


    </>
  )
}

export default AdminDashboard