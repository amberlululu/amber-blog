import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      searchString: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const newSearchString = event.target.value;
    this.setState({ searchString: newSearchString });
  }

  handleSubmit(event) {
    event.preventDefault();
    const body = JSON.stringify({
      search_string: this.state.searchString,
    });
    fetch("/api/v1/restaurants/search.json", {
      method: "POST",
      body: body,
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((body) => {
        // debugger;
        this.setState({ restaurants: body });
      });
  }

  render() {
    const restaurants = this.state.restaurants.map((restaurant) => {
      return <li>{restaurant.name}</li>;
    });

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <label>Search</label>
          <input
            type="text"
            name="searchString"
            value={this.state.searchString}
            onChange={this.handleChange}
          />

          <input type="submit" value="Submit" className="btn btn-info" />
        </form>
        <ul>{restaurants}</ul>
      </div>
    );
  }
}

export default SearchBar;
