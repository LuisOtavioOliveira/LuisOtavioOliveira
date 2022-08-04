import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Pages/Home'
import Company from './components/Pages/Company'
import Contact from './components/Pages/Contact'
import NewProject from './components/Pages/NewProject'
import Projects from './components/Pages/Projects'

import Container from './components/Layout/Container'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Project from './components/Pages/Project'


function App() {
  return (
    <Router>
      <Navbar/>
<Container customClass='minheight'>
<Routes>
  <Route exact='true' path='/' element={<Home/>}>  </Route>
  <Route  path='/company' element={<Company/>}>  </Route>
  <Route  path='/contact' element={<Contact/>}>  </Route>
  <Route  path='/newproject' element={<NewProject/>}>  </Route>
  <Route  path='/projects' element={<Projects/>}>  </Route>
  <Route  path='/project/:id' element={<Project/>}>  </Route>


</Routes>
</Container>

      <Footer/>
    </Router>
  );
}

export default App;
