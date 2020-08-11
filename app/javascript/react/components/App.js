import React from "react";
import ArticlesIndexContainer from "./ArticlesIndexContainer";
import ArticlesFormContainer from "./ArticlesFormContainer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ArticleShowContainer from "./ArticleShowContainer";
import MainPage from "./MainPage";
import Weather from "./Weather";
import FoodRecipe from "./FoodRecipe";
import ChatContainer from "./ChatContainer";
import UserProfile from "./UserProfile";

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/articles" component={ArticlesIndexContainer} />
        <Route exact path="/articles/new" component={ArticlesFormContainer} />
        <Route exact path="/articles/:id" component={ArticleShowContainer} />
        <Route exact path="/weather" component={Weather} />
        <Route exact path="/recipes" component={FoodRecipe} />
        <Route exact path="/users/:id" component={UserProfile} />
          <Route exact path="/chats/:id" component={ChatContainer} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
