import React from "react";
import { Switch, BrowserRouter, Route} from "react-router-dom";
import Home from "./Home";
import Courses from "./Courses";
import Course from "./Course";
import AddNewCourse from "./AddNewCourse";


const RouterExample = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses" component={Courses} />
      <Route path="/courses/:id" component={Course} />
      <Route path="/addNewCourse" component ={AddNewCourse}/>
    </Switch>
  </BrowserRouter>
);

export default RouterExample;