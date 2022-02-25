import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { PersonContext } from "./shared/context/person-context";
import Person from "./person/pages/Person";
import Center from "./Center/pages/Center";
import PersonAuth from "./person/pages/PersonAuth";
import CenterAuth from "./Center/pages/CenterAuth";
import SetAppointment from "./Center/pages/SetAppointment";
import Vaccinate from "./Center/pages/Vaccinate";
import DropDownList from "./shared/dropdown/DropDownList";
import UpdatePersonInfo from "./person/pages/UpdatePersonInfo";
import UpdateStorage from "./Center/pages/UpdateStorage";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPerson, setIsPerson] = useState(false);
  const [uid, setUid] = useState();

  const login = useCallback((id) => {
    setIsLoggedIn(true);
    setUid(id);
    console.log("abrar " + isLoggedIn, uid);
  }, []);

  const logout = useCallback(() => {
    setUid(null);
    setIsLoggedIn(false);
    setIsPerson(false);
  }, []);

  const changeRule = useCallback(() => {
    setIsPerson(!isPerson);
  });
  let routes;
  // if (isPerson) {
  //   if (isLoggedIn) {
  //     routes = (
  //       <Switch>
  //         <Route path="/">
  //           <Person />
  //         </Route>
  //         <Redirect to="/" />
  //       </Switch>
  //     );
  //   } else {
  //     routes = (
  //       <Switch>
  //         <Route path="/" exact>
  //           <PersonAuth />
  //         </Route>
  //       </Switch>
  //     );
  //   }
  // } else {
  //   if (isLoggedIn) {
  //     routes = (
  //       <Switch>
  //         <Route path="/manage/:uid">
  //           <Center />
  //         </Route>
  //       </Switch>
  //     );
  //   } else {
  //     routes = (
  //       <Switch>
  //         <Route path="/manage">
  //           <CenterAuth />
  //         </Route>
  //       </Switch>
  //     );
  //   }
  // }

  if (isLoggedIn) {
    if (isPerson) {
      routes = (
        <Switch>
          <Route path="/" exact>
            <Person />
          </Route>
          <Route path="/:person_id/update" exact>
            <UpdatePersonInfo />
          </Route>
          <Redirect to="/" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/manage" exact>
            <Center />
          </Route>
          <Route path="/manage/vaccinate">
            <Vaccinate />
          </Route>
          <Route path="/manage/set_appointment" exact>
            <SetAppointment />
          </Route>
          <Route path="/manage/update_storage" exact>
            <UpdateStorage/>
          </Route>
          <Redirect to="/manage" />
        </Switch>
      );
    }
  } else {
    routes = (
      <Switch>
        <Route path="/a/b">
          <DropDownList />
        </Route>
        <Route path="/" exact>
          <PersonAuth />
        </Route>
        <Route path="/manage" exact>
          <CenterAuth />
        </Route>
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isPerson: isPerson,
        uid: uid,
        login: login,
        logout: logout,
        changeRule: changeRule,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
