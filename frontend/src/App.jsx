import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Geomatique from "./pages/Geomatique"
import SIGENR from "./pages/SIG&ENR"
import WebSIG from "./pages/WebSIG"
import Register from "./pages/user/Register"
import Login from "./pages/user/Login"
import Profile from "./pages/user/Profile"
import Webmap from "./pages/Webmap"
import Admin from "./pages//admin/Admin"
import Users from "./pages/admin/Users"
import DisplayUser from "./pages/admin/DisplayUser"
import Geodatas from "./pages/admin/Geodatas"
import Developers from "./pages/admin/developers/Developers"
import AddDeveloper from "./pages/admin/developers/AddDeveloper"
import EditDeveloper from "./pages/admin/developers/EditDeveloper"
import TypeSolar from "./pages/admin/typeSolar/TypeSolar"
import AddTypeSolar from "./pages/admin/typeSolar/AddTypeSolar"
import EditTypeSolar from "./pages/admin/typeSolar/EditTypeSolar"
import StatusProject from "./pages/admin/statusProject/StatusProject"
import AddStatusProject from "./pages/admin/statusProject/AddStatusProject"
import EditStatusProject from "./pages/admin/statusProject/EditStatusProject"
import WindModels from "./pages/admin/windModels/WindModel"
import AddWindModel from "./pages/admin/windModels/AddWindModel"
import EditWindModel from "./pages/admin/windModels/EditWindModel"
import User from "./pages/user/User"
import UserProjectAreas from "./pages/projectAreas/UserProjectAreas"
import ProjectAreas from "./pages/projectAreas/ProjectAreas"
import Projects from "./pages/admin/projects/Projects"
import AddProject from "./pages/admin/projects/AddProject"
import EditProject from "./pages/admin/projects/EditProject"
import EditProjectArea from "./pages/projectAreas/EditProjectArea"
import Contact from "./pages/Contact"
import './css/style.css'

import {Routes, Route, Navigate} from "react-router-dom"
import { useLocation } from 'react-router-dom';
import RequireAuth from "./helpers/Require-auth"

function App() {
  
  return (
    <>
  <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path="/geomatique" element={<Geomatique />} />
          <Route path="/sigenr" element={<SIGENR />} />
          <Route path="/websig" element={<WebSIG />} />
          <Route path='/register' element={<Register />}/>
          <Route path="/login" element={<Login />} />
          <Route path='/profile' element={<RequireAuth child={Profile} auth={true} admin={false} />} />
          <Route path="/webmap" element={<RequireAuth child={Webmap} auth={true} admin={false}/>} />
          <Route path="/user" element={<RequireAuth child={User} auth={true} admin={false}/>} />
          <Route path="/userProjectAreas" element={<RequireAuth child={UserProjectAreas} auth={true} admin={false}/>} />
          <Route path="/admin" element={<RequireAuth child={Admin} auth={true} admin={true}/>} />
          <Route path="/users"element={<RequireAuth child={Users} auth={true} admin={true}/>}  />
          <Route path="/displayUser/:id"element={<RequireAuth child={DisplayUser} auth={true} admin={true}/>}  />
          <Route path="/geodatas"element={<RequireAuth child={Geodatas} auth={true} admin={true}/>}  />
          <Route path="/projectAreas" element={<RequireAuth child={ProjectAreas} auth={true} admin={true}/>} />
          <Route path="/editProjectArea/:id" element={<RequireAuth child={EditProjectArea} auth={true} admin={false}/>} />
          <Route path="/projects" element={<RequireAuth child={Projects} auth={true} admin={true}/>} />
          <Route path="/addProject" element={<RequireAuth child={AddProject} auth={true} admin={true}/>} />
          <Route path="/editProject/:id" element={<RequireAuth child={EditProject} auth={true} admin={true}/>} />
          <Route path="/developers" element={<RequireAuth child={Developers} auth={true} admin={true}/>} />
          <Route path="/addDeveloper" element={<RequireAuth child={AddDeveloper} auth={true} admin={true}/>} />
          <Route path="/editDeveloper/:id" element={<RequireAuth child={EditDeveloper} auth={true} admin={true}/>} />
          <Route path="/typeSolar" element={<RequireAuth child={TypeSolar} auth={true} admin={true}/>} />
          <Route path="/addTypeSolar" element={<RequireAuth child={AddTypeSolar} auth={true} admin={true}/>} />
          <Route path="/editTypeSolar/:id" element={<RequireAuth child={EditTypeSolar} auth={true} admin={true}/>} />
          <Route path="/statusProject" element={<RequireAuth child={StatusProject} auth={true} admin={true}/>} />
          <Route path="/addStatusProject" element={<RequireAuth child={AddStatusProject} auth={true} admin={true}/>} />
          <Route path="/editStatusProject/:id" element={<RequireAuth child={EditStatusProject} auth={true} admin={true}/>} />
          <Route path="/windModels" element={<RequireAuth child={WindModels} auth={true} admin={true}/>} />
          <Route path="/addWindModel" element={<RequireAuth child={AddWindModel} auth={true} admin={true}/>} />
          <Route path="/editWindModel/:id" element={<RequireAuth child={EditWindModel} auth={true} admin={true}/>} />
          <Route path='/contact' element={<Contact />}/>
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    <Footer />
    </>
  )

}

export default App
