// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// const UnAuthorized = () => {    
//     const navigate = useNavigate()
//     return <>
//     <div class="flex items-center justify-center h-screen dark:bg-black">
//         <div class="text-center">
//             <h1 class="text-6xl font-bold text-red-500">Access Denied</h1>
//             <h6 class="text-xl text-red-500 underline">You don't have permission to view this site.</h6>
//             <p class="mt-4 mb-3">Error code: 403 Forbidden</p>
//             <Link to="/" class="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Go Back</Link>
//         </div>
//     </div>
//     </>
// }

// export default UnAuthorized ;

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const UnAuthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen px-4 text-center dark:bg-black">
      <div className="max-w-sm w-full">
        <h1 className="text-4xl sm:text-6xl font-bold text-red-500">Access Denied</h1>
        <h6 className="text-lg sm:text-xl text-red-500 underline mt-2">
          You don't have permission to view this site.
        </h6>
        <p className="mt-4 mb-3 text-sm sm:text-base">Error code: 403 Forbidden</p>
        <Link to="/" className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 inline-block">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default UnAuthorized;
