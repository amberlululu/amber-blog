import React, { useState, useEffect } from "react";

const UserProfile = (props) => {
  let userId = props.match.params.id;
  const [userRecord, setUserRecord] = useState({});

  useEffect(() => {
    fetch(`/api/v1/users/${userId}`, {
      credentials: "same-origin",
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((body) => {
        setUserRecord(body);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);
  return (
    <div className="container">
      <h1>hello, welcome to Foodie Monster !</h1>
      <img
        src="https://i0.hdslb.com/bfs/album/12f049a0337b38ae4fdf7258d5f7b8eb2ce54bb2.jpg@4000w_1e.webp"
        alt="avatar"
        className="avatar-img"
      />
      <div className="card profile-card">
        <img
          src="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/k-v-i-p-flaticon01-131_2.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=a85bc8f5b60196c4193f99c5a2613867"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">
            {userRecord.first_name} {userRecord.last_name}
          </h5>
          <p className="card-text"></p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{userRecord.username}</li>
          <li className="list-group-item">{userRecord.email}</li>
        </ul>
        <div className="card-body text-center">
          <a href="#" className="card-link">
            Edit Profile
          </a>
        </div>
      </div>
      <div className="social-links">
        <a
          href="https://www.linkedin.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i className="fa fa-linkedin-square" aria-hidden="true" />
        </a>
        <a
          href="https://www.github.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i className="fa fa-github-square" aria-hidden="true" />
        </a>
        <a
          href="https://www.youtube.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i className="fa fa-youtube-square" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};

export default UserProfile;
