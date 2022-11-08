import { Route, Routes } from "react-router-dom";
import CategoryManage from "./components/module/Category/CategoryManage";
import DashboardLayout from "./components/module/Dashboard/DashboardLayout";
import PostAddnew from "./components/module/post/PostAddnew";
import PostManage from "./components/module/post/PostManage";
import { AuthProvider } from "./contexts/auth-context";
import CategoryAddNew from "./components/module/Category/CategoryAddNew";
import UserAddNew from "./draft/UserAddNew";
import UserManage from "./draft/UserManage";
import UserProfile from "./draft/UserProfile";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CategoryUpdate from "./components/module/Category/CategoryUpdate";
import UserUpdate from "./draft/UserUpdate";
import PostUpdate from "./components/module/post/PostUpdate";
import CategoryPage from "./pages/CategoryPage";
import Contact from "./pages/Contact"
import TopicManage from "./components/module/Topic/TopicManage";
import TopicAddNew from "./components/module/Topic/TopicAddNew";
import TopicUpdate from "./components/module/Topic/TopicUpdate";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
          <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
              <Route
              path="/category/:slug"
              element={<CategoryPage></CategoryPage>}
            ></Route>
            <Route path="/contact" element={<Contact></Contact>}></Route>
          <Route
            path="/:slug"
            element={<PostDetailsPage></PostDetailsPage>}
          ></Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/manage/posts"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddnew></PostAddnew>}
            ></Route>
            <Route
                path="/manage/category"
                element={<CategoryManage></CategoryManage>}
              ></Route>
              <Route
                path="/manage/add-category"
                element={<CategoryAddNew></CategoryAddNew>}
              ></Route>
             <Route
             path="/manage/topic"
             element={<TopicManage></TopicManage>}
             ></Route>
             <Route 
             path="/manage/topicAddNew"
             element={<TopicAddNew></TopicAddNew>}
             ></Route>
             <Route 
             path="/manage/topicUpdate"
             element={<TopicUpdate></TopicUpdate>}
             ></Route>
              <Route
                path="/manage/user"
                element={<UserManage></UserManage>}
              ></Route>
               <Route
                path="/manage/category-update"
                element={<CategoryUpdate></CategoryUpdate>}
              ></Route>
              <Route
                path="/manage/add-user"
                element={<UserAddNew></UserAddNew>}
              ></Route>
              <Route
                path="/manage/update-user"
                element={<UserUpdate></UserUpdate>}
              ></Route>
              <Route
                path="/profile"
                element={<UserProfile></UserProfile>}
              ></Route>
                  <Route
                path="/manage/update-post"
                element={<PostUpdate></PostUpdate>}
              ></Route>
              <Route path="/manage/topic-update"
                     element={<TopicUpdate></TopicUpdate>}
              ></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
