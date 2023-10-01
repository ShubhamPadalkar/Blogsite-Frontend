import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallUsersAction } from "../../redux/reducers/authorSlice";
import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
const dispatch = useDispatch()

useEffect(() => {
  dispatch(getallUsersAction('queryifany'))
},[dispatch])

const users = useSelector(state => state?.author?.allusers)

  return (
    <>
      <section className="py-8 bg-gray-900 min-h-screen">
        <UsersListHeader/>
        <div className="container px-4 mx-auto">
          {users ? users.map(info =>
          <UsersListItem user = {info} key={info._id} />  ) : null}
        </div>
      </section>
    </>
  );
};

export default UsersList;
