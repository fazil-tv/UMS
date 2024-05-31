import React from 'react'

function adminnavbar() {
  return (
    <>
    <nav class="bg-gray-800 p-4">
       <div class="container mx-auto flex justify-between items-center">
           <a class="text-white text-lg font-semibold" href="#">Admin Dashboard</a>
           <div class="flex space-x-4">
            
               <a class="text-gray-300 hover:text-white" href="#">Logout</a>
           </div>
       </div>
   </nav>
  </>
  )
}

export default adminnavbar