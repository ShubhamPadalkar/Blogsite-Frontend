import React,{useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { deletepostAction, fetchPostDetilsAction } from "../redux/reducers/postSlice";
import { useDispatch, useSelector } from "react-redux";
import DateFormatter from "../utils/DateFormatter";
import LoadingComponent from "../utils/LoadingComponent";
import AddComment from "../Comments/AddComment";
import CommentsList from "../Comments/CommentsList";
import ShareBtns from "../utils/ShareBtns";

const PostDetails = () => {
  const { id } = useParams() ;
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //Select post details from store
  const post = useSelector(state=>state?.posts)
  const { postDetails , loading , appErr , serverErr , isDeleted } = post

  const comment = useSelector(state => state?.comment)
  const {commentCreated , commentDeleted , commentUpdated} = comment
  useEffect(() => {
    dispatch(fetchPostDetilsAction(id))
  }, [id ,dispatch , commentCreated , commentDeleted , commentUpdated])
  
  const user = useSelector(state=>state?.users?.userAuth)
  
  const isCreatedBy = postDetails?.user?._id === user?._id

  //Redirect
  if(isDeleted){
    navigate('/posts')
  }

  return (
    <>
    {loading ? <LoadingComponent/> : 
      appErr || serverErr ? 
      <div className="h-screen text-red-400 text-xl">
      <h1>{serverErr} {appErr}</h1>
      </div>
       :
      <section className="py-20 2xl:py-40 bg-gray-800 overflow-hidden">
        <div className="container px-4 mx-auto">
          {/* Post Image */}
          <img
            className="mb-24 w-full h-96 object-cover"
            src={postDetails?.image}
            alt=""
          />
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
              {postDetails?.title}
            </h2>

            {/* User */}
            <div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
              <img
                className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                src={postDetails?.user?.profilePhoto}
                alt=""
              />
              <div className="text-left" >
                <h4 className="mb-1 text-2xl font-bold text-gray-50">
                  <span 
                  className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
                    {postDetails?.user?.firstname} {postDetails?.user?.lastname}
                  </span>
                </h4>
                <p className="text-gray-500">
                  <DateFormatter date={postDetails?.createdAt} />
                </p>
              </div>
            </div>
            {/* Post description */}
            <div className="max-w-xxl mx-auto">
              <p className="mb-6 text-left  text-xl text-gray-200">
                {postDetails?.description}
                {/* Show delete and update btn if created user */}
                {isCreatedBy ? 
                <p className="flex">
                <Link className="p-3" to={`/update-post/${postDetails?._id}`}>
                  <PencilAltIcon className="h-8 mt-3 text-yellow-300" />
                </Link>
                <button 
                onClick={()=>dispatch(deletepostAction(postDetails?._id))}
                className="ml-3">
                  <TrashIcon className="h-8 mt-3 text-red-600" />
                </button>
              </p> : null}
              </p>
              <ShareBtns
              title={postDetails?.title}
              imageurl = {postDetails?.image}
              posturl = {`/posts/${postDetails?.id}`}
              postbrief={postDetails?.description}
              />
            </div>
          </div>
        </div>
        {/* Add comment Form component here */}
          {user ? <AddComment postId = {id} /> :
          <h2 className="text-center text-yellow-200">
            <Link to={'/Login'} className="text-red-300">Login</Link> to add comment
          </h2>
          }
        <div className="flex justify-center  items-center">
          {/* <CommentsList comments={post?.comments} postId={post?._id} /> */}
          <CommentsList 
          comments = {postDetails?.comments}
          />
        </div>
      </section>
}
    </>
  );
};

export default PostDetails;
