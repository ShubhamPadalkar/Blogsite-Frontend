import React from "react";
import { HeartIcon, EmojiSadIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  followProfileAction,
  unfollowProfileAction,
} from "../../redux/reducers/profileSlice";

const Follow = () => {
  const dispatch = useDispatch();
  const actionProfile = useSelector((state) => state?.profile?.profile);
  const user = useSelector((state) => state?.users?.userAuth);

  const isItUserprofile = actionProfile?._id === user?._id;
  const isUserFollowed = actionProfile?.followers?.includes(user?._id);

  return (
    <>
      {isItUserprofile ? (
        <></>
      ) : (
        <>
          <>
            {isUserFollowed ? (
              <button
              onClick={() => dispatch(unfollowProfileAction(actionProfile?._id))}
              className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              <EmojiSadIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span>Unfollow</span>
              </button>
            ) : (
              <button
                onClick={() =>
                  dispatch(followProfileAction(actionProfile?._id))
                }
                type="button"
                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <HeartIcon
                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>Follow </span>
              </button>
            )}
          </>
        </>
      )}
    </>
  );
};

export default Follow;
