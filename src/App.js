import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Components/Home/Homepage";
import Register from "./Components/Users/Register/Register";
import Login from "./Components/Users/Login/Login";
import Navbar from "./Components/Navigation/Navbar";
import AddNewCategory from "./Components/Categories/AddNewCategory";
import CategoryList from "./Components/Categories/CategoryList";
import UpdateCategory from "./Components/Categories/UpdateCategory";
import ProtectedRoute from "./Components/Navigation/PrivateProtected/ProtectedRoute";
import AdminRoute from "./Components/Navigation/PrivateProtected/AdminRoute";
import CreatePost from "./Components/Posts/CreatePost";
import PostsList from "./Components/Posts/PostsList";
import PostDetails from "./Components/Posts/PostDetails";
import UpdatePost from "./Components/Posts/UpdatePost";
import Profile from "./Components/Users/Profile/Profile";
import UpdateProfileForm from "./Components/Users/Profile/UpdateProfileForm";
import SendEmail from "./Components/Users/Emailing/SendEmail";
import UpdatePassword from "./Components/Users/PasswordManagement/UpdatePassword";
import ResetPasswordForm from "./Components/Users/PasswordManagement/ResetPasswordForm";
import ResetPassword from "./Components/Users/PasswordManagement/ResetPassword";
import UsersList from "./Components/Users/UsersList/UsersList";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/forget-password" element={<ResetPasswordForm />} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />


        {/* Standard login routes */}
        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-post/:id"
          element={
            <ProtectedRoute>
              <UpdatePost/>
            </ProtectedRoute>}
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-profile"
          element={
            <ProtectedRoute>
              <UpdateProfileForm/>
            </ProtectedRoute>}
        />
        <Route
          path="/update-password"
          element={
            <ProtectedRoute>
              <UpdatePassword/>
            </ProtectedRoute>}
        />
        <Route
          path="/send-mail"
          element={
            <ProtectedRoute>
              <SendEmail/>
            </ProtectedRoute>}
        />
        

        {/* Admin Routes */}
        <Route
          path="/add-category"
          element={
            <AdminRoute>
              <AddNewCategory />
            </AdminRoute>
          }
        />
        <Route
          path="/update-category/:id"
          element={
            <AdminRoute>
              <UpdateCategory />
            </AdminRoute>
          }
        />
        <Route
          path="/category-list"
          element={
            <AdminRoute>
              <CategoryList />
            </AdminRoute>
          }
        />
        <Route
          path="/update-list"
          element={
            <AdminRoute>
              <UpdateCategory />
            </AdminRoute>
          }
        />
        <Route
          path="/users"
          element={
            <AdminRoute>
              <UsersList />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
