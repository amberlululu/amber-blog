import React from "react";
import ArticlesIndexContainer from "./ArticlesIndexContainer";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import ArticleShowContainer from "./ArticleShowContainer";

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ArticlesIndexContainer} />
        <Route exact path="/articles" component={ArticlesIndexContainer} />
        <Route exact path="/articles/:id" component={ArticleShowContainer} />
      </Switch>
    </BrowserRouter>

    // <div>Hello</div>
  );
};

export default App;
