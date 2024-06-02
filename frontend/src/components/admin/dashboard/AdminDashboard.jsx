

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Navbar from '../adminnavbar/adminnavbar'


import EditUser from '../edituser/EditUser';
import './admindashboard.css';
import { Adduser } from '../shard/adduser';
import { DeleteUser } from '../shard/deleteuser';
import { Input } from "@/components/ui/input"
import { debounce } from '../../../utils/debounce';
import { useGetUserDataMutation } from '../../../redux/admin/adminApi';


function AdminDashboard() {

  // const [getUserData, { error }] = useGetUserDataMutation({});

  // const [users, setUsers] = useState([]);


  //   const [search, setSearch] = useState("");
  //   const searchRef = useRef('');

  //   const debouncedFetchUser = useCallback(debounce(async () => {
  //     const res = await useGetUserDataMutation({ search: searchRef.current });
  //     setUsers(res.user);
  //   }, 500), []);

  //   useEffect(() => {
  //     debouncedFetchUser();
  //   }, [getUserData,search]);


  //   const handleInput = (e)=>{
  //     setSearch(e.target.value);
  //     searchRef.current = e.target.value;
  //   }

  //   console.log(searchRef,"searchRef")
  //   console.log(search,"search")


  //   const fetchData = async () => {
  //     try {
  //       const response = await getUserData({}).unwrap();
  //       if (response.status) {
  //         setUsers(response.data);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch user data:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  //   const handleEditComplete = () => {
  //     fetchData();
  //   };

  const [getUserData, { error }] = useGetUserDataMutation({});

  const [users, setUsers] = useState([]);


  const [search, setSearch] = useState("");

  console.log(search, "okkkkkey");

  const searchRef = useRef(search);

  useEffect(() => {
    searchRef.current = search;
  }, [search]);



  console.log(searchRef.current, "searchRef")

  const debouncedFetchUser = useCallback(debounce(async () => {
    try {
      const res = await getUserData({ search: searchRef.current }).unwrap("");

      console.log(res.data, "respondsssssssssssss")
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }, 500), []);

  useEffect(() => {

    debouncedFetchUser();

  }, [getUserData, search]);

  const handleInput = (e) => {
    const value = e.target.value;
    setSearch(value);
  };


  const handleEditComplete = () => {
    fetchData();
  };


  return (
    <>
      <Navbar />

      <div className='admin-userdata container'>
        <Adduser onEditComplete={handleEditComplete} className="" />

        <Input className="w-70" placeholder="Search users" value={search} onChange={handleInput} />








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


            {users ? (
              users.map((user, index) => (
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
                  <td className="border px-4 py-2">
                    {user.email.includes(search) ? (
                      <span>

            

                        {user.email.split(search).map((part, index) => (
                          <span key={index}>
                            {part}
      
                            {index !== user.email.split(search).length - 1 && (
                              <span style={{  backgroundColor:'yellow' }}>{search}</span>
                            )}
                          </span>
                        ))}
                      </span>
                    ) : (
                      user.email
                    )}
                  </td>

                  <td className="border px-4 py-2">{user.isAdmin ? "false" : "true"}</td>
                  <td className="border px-4 py-2 justify-center ">
                    <EditUser currentUser={user} onEditComplete={handleEditComplete} />
                    <DeleteUser onDeleteComplete={handleEditComplete} userId={user._id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  <p className="text-gray-500">Oops! No users found with the email address matching your search.</p>
                </td>
              </tr>

            )}

          </tbody>
        </table>
      </div>


    </>
  )
}

export default AdminDashboard