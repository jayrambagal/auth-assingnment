import React from "react";
import "./index.css";
const HomePage = () => {
  return (
    <div className="main_container">

      <div className="container">
      <div className="button_container">
          <form>
              
              <input type="text" id="username" name="username" placeholder="Username" required />
              <input type="password" id="password" name="password"  placeholder="Password" required />
              <button type="submit">Sign in</button>
        </form>

      </div>

      <div className="image_container">
      </div>
      </div>
    </div>
  );
};

export default HomePage;
