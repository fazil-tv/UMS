import React from 'react'
import { useEditUserMutation } from "../../../redux/admin/adminApi";
import './adminnavbar.css';
import { Adminlogout } from '../shard/adminlogout';
function adminnavbar() {
  return (
    <>
    <nav class="bg-black p-4" adminnavbar>
       <div class="container mx-auto flex justify-between items-center">
           <a class="text-white text-lg font-semibold admin-logo" href="#">Admin Dashboard</a>
           <div class="flex space-x-4">
            

               <Adminlogout />
           </div>
       </div>
   </nav>
  </>
  )
}

export default adminnavbar