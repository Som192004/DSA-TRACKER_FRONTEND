// import { Link } from "react-router-dom";

// const DSACard = ({name , number , msg}) => {
//     return <>
//     <div className='w-full bg-gray-100 rounded-xl p-4'>
//             <div className='w-full justify-center mb-4'>
//                 {/* Add images to this in future */}
//                 {/* <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
//                 className='rounded-xl' /> */}
//             </div>
//             <Link to={`/problems/${name}`}>
//                 <h2
//                 className='text-xl font-bold'
//                 >{name}
//                 </h2>
//             </Link>
//             <p className="mt-1">{msg}: {number}</p>
//         </div>
//     </>
// }

// export default DSACard;

import { Link } from "react-router-dom";

const DSACard = ({ name, number, msg }) => {
    return (
        <>
            <div className='w-full bg-gray-100 text-black dark:text-black rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    {/* Add images to this in future */}
                    {/* <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                    className='rounded-xl' /> */}
                </div>
                <Link to={`/problems/${name}`}>
                    <h2 className='text-xl font-bold'>{name}</h2>
                </Link>
                <p className="mt-1">{msg}: {number}</p>
            </div>
        </>
    );
};

export default DSACard;
