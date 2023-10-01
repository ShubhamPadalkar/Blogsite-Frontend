import { useState } from "react";
import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon, XCircleIcon } from "@heroicons/react/solid";
import Moment from "react-moment";
import { deleteCommentAction } from "../redux/reducers/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import UpdateComment from "./UpdateComment";

export default function CommentsList({ comments }) {
  const dispatch = useDispatch();
  const [updateid, setUpdateid] = useState("");
  const user = useSelector((state) => state?.users?.userAuth);

  return (
    <div>
      <ul className="divide-y bg-gray-700 w-96 divide-gray-200 p-3 mt-5">
        <div className="text-gray-400">{comments ? comments.length : 0} Comments</div>
        <>
          {comments?.length <= 0 ? (
            <h1 className="text-yellow-400 text-lg text-center">No comments</h1>
          ) : (
            comments?.map((comment) => (
              <>
                <li className="py-4  w-full">
                  <div className="flex space-x-3">
                    <img
                      className="h-6 w-6 rounded-full"
                      src={comment?.user?.profilePhoto}
                      alt=""
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <Link to={`/profile/${comment?.user?._id}`}>
                        <h3 className="text-sm font-medium text-green-400">
                          {comment?.user?.firstname} {comment?.user?.lastname}
                        </h3>
                        </Link>
                        <p className="text-bold text-yellow-500 text-base ml-5">
                          <Moment fromNow ago>
                            {comment?.createdAt}
                          </Moment>
                        </p>
                      </div>
                      {user?._id === comment?.user?._id ? (
                        updateid === comment._id ? (
                          <div className="flex">
                            <UpdateComment
                              commentData={comment}
                              updateState={setUpdateid}
                            />
                            <button
                              className="flex"
                              onClick={() => setUpdateid("")}
                            >
                              <XCircleIcon className="h-7 mt-2 ml-5 text-red-300" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm text-gray-400">
                              {comment?.description}
                            </p>
                            <p class="flex">
                              <Link
                                class="p-3"
                                onClick={() => {
                                  setUpdateid(comment?._id);
                                  return;
                                }}
                              >
                                <PencilAltIcon class="h-5 mt-3 text-yellow-300" />
                              </Link>
                              <button
                                class="ml-3"
                                onClick={() => {
                                  dispatch(deleteCommentAction(comment?._id));
                                }}
                              >
                                <TrashIcon class="h-5 mt-3 text-red-600" />
                              </button>
                            </p>
                          </>
                        )
                      ) : 
                      <p className="text-sm text-gray-400">
                              {comment?.description}
                      </p>
                      }
                    </div>
                  </div>
                </li>
              </>
            ))
          )}
        </>
      </ul>
    </div>
  );
}
