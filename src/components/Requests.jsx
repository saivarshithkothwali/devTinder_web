import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react"; // Import useState

const Requests = () => {
    const dispatch = useDispatch();
    
    // Using useState for loading and error states for a better user experience
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // FIX #2: Assuming your slice shape is { requests: [] }, select the inner array.
    // Adjust this path based on your console.log(store) output if needed.
    const requests = useSelector((store) => store.requests.requests);

    const reviewRequest = async (status, _id) => {
        try {
            await axios.post(
                `${BASE_URL}/request/review/${status}/${_id}`,
                {},
                { withCredentials: true }
            );
            dispatch(removeRequest(_id));
        } catch (err) {
            // More specific error message
            console.error("Failed to review request", err);
            // You could show an error toast to the user here
        }
    };

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/user/requests/received`, {
                    withCredentials: true,
                });
                dispatch(addRequests(res.data.data));
            } catch (err) {
                console.error("Failed to fetch requests", err);
                setError("Could not load requests. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRequests();
    }, [dispatch]); // Good practice to include dispatch in the dependency array

    // Better Loading and Error UI
    if (isLoading) {
        return <h2 className="flex text-2xl font-semibold text-gray-300 justify-center my-10">Loading...</h2>;
    }

    if (error) {
        return <h2 className="flex text-2xl font-semibold text-red-500 justify-center my-10">{error}</h2>;
    }

    if (!requests || requests.length === 0) {
        return <h2 className="flex text-2xl font-semibold text-gray-300 justify-center my-10">No Requests found</h2>;
    }

    return (
        <div className="text-center my-10">
            <h1 className="font-bold text-white text-3xl mb-6">Requests</h1>
            
            {requests.map((request) => {
                // FIX #1: Safe destructuring with a fallback object
                const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId || {};
                
                // If fromUserId was missing, we don't want to render a broken card.
                if (!_id) return null;

                return (
                    // FIX #3: Use the unique ID of the request for the key
                    <div key={request._id} className="flex justify-between items-center m-2 p-2 rounded-lg bg-base-300 w-[90%] max-w-3xl mx-auto">
                        <div>
                            <img alt="profile" className="w-12 h-12 rounded-full" src={photoUrl} />
                        </div>
                        
                        <div className="text-left mx-4 flex-grow">
                            <h2 className="font-semibold text-base">{firstName + " " + lastName}</h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p className="text-sm text-gray-400">{about}</p>
                        </div>

                        <div>
                            <button className="btn btn-primary btn-sm mx-1" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                            <button className="btn btn-secondary btn-sm mx-1" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default Requests;