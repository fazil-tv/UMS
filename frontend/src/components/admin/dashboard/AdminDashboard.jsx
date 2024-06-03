import { useAdminAuthentication } from '@/hook/auth';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import Navbar from '../adminnavbar/adminnavbar'
import EditUser from '../edituser/EditUser';
import './admindashboard.css';
import { Adduser } from '../shard/adduser';
import { DeleteUser } from '../shard/deleteuser';
import { Input } from "@/components/ui/input"
import { debounce } from '../../../utils/debounce';
import { useGetUserDataMutation } from '../../../redux/admin/adminApi';


function AdminDashboard() {

  const { isLoggedIn, isFetching } = useAdminAuthentication();

  const [getUserData, { error }] = useGetUserDataMutation({});

  const [users, setUsers] = useState([]);


  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(page);
  const limit = 3;

  const searchRef = useRef(search);
  const pageRef = useRef(page);

  useEffect(() => {
    searchRef.current = search;
  }, [search]);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  const debouncedFetchUser = useCallback(debounce(async () => {
    try {
      const res = await getUserData({ page: pageRef.current,search: searchRef.current }).unwrap("");

      setUsers(res.data);
      setTotal(res.totalPages);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }, 100), []);

  useEffect(() => {
    debouncedFetchUser();
  }, [page,search,getUserData]);

  const handleInput = (e) => {
    const value = e.target.value;
    setSearch(value);
  };


  const handleEditComplete = () => {
    debouncedFetchUser();
  };


  const prevPageHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const nextPageHandler = () => {
    setPage(page + 1);
  };

  console.log(page)


  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    navigate("/admin");
    <Navigate to="/adminlogin" replace />;
    return null;
  }



  return (
    <>
      <Navbar />

      <div className='admin-userdata container'>
        <Adduser onEditComplete={handleEditComplete} className="" />

        <Input className="w-70" placeholder="Search users" value={search} onChange={handleInput} />

        <table className="border-collapse  admin-table mt-5">
          <thead>
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2 text-center">profile</th>

              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Edite</th>
              <th className="border px-4 py-2">Delete</th>
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
                              <span style={{ backgroundColor: 'yellow' }}>{search}</span>
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
                  </td>
                  <td className="border px-4 py-2 justify-center ">
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

      <div className="d-flex justify-content-start container mt-3">
          <Button
            variant="dark"
            onClick={prevPageHandler}
            disabled={page == 1}>
            Previous
          </Button>
          <Row>
            <Col className='pagination-button'>{page} of {total}</Col>
          </Row> {page == total}
          <Button
            variant="dark"
            onClick={nextPageHandler}
            disabled={page == total}>
            Next
          </Button>
      </div>

    </>
  )
}

export default AdminDashboard