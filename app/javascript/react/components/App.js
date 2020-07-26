import React from "react";
import ArticlesIndexContainer from "./ArticlesIndexContainer";
import ArticlesFormContainer from "./ArticlesFormContainer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ArticleShowContainer from "./ArticleShowContainer";
import MainPage from "./MainPage";

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/articles" component={ArticlesIndexContainer} />
        <Route exact path="/articles/new" component={ArticlesFormContainer} />
        <Route exact path="/articles/:id" component={ArticleShowContainer} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
