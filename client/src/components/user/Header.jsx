import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
    repassword: ""
	});

  const { firstName, lastName, email, password, repassword} = data;

	const [error, setError] = useState("");
	const navigate = useNavigate();

	const onChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
      if (password !== repassword) {
        console.log("password do not match!");
      } else {
        const url = "http://localhost:5000/api/users/signup";
        const { data: res } = await axios.post(url, data);
        // navigate("/login");
        console.log(res.message);
      }
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};


  return (
    <>
      {/* <!-- ======= Header ======= --> */}
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center">
            <img src="../src/assets/img/logo.png" alt="logo" />
            <span className="d-none d-lg-block">
              RE<span>O</span>N
            </span>
          </Link>
        </div>
        {/* <!-- End Logo --> */}

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item">
              <Link
                to="#"
                class="nav-link"
                data-bs-toggle="modal"
                data-bs-target="#signup"
              >
                <span class="theme-text-blue">Signup</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="#"
                class="nav-link"
                data-bs-toggle="modal"
                data-bs-target="#signin"
              >
                <span class="theme-text-orange">Signin</span>
              </Link>
            </li>

            <li className="nav-item mx-3">
              <button type="button" class="btn btn-warning">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>
      {/* <!-- End Header --> */}

      <div
        class="modal fade"
        id="signup"
        tabindex="-1"
        data-bs-backdrop="false"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header theme-bg-orange text-white">
              <h5 class="modal-title fw-bold">Signup</h5>
              <button
                type="button"
                class="btn bg-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i class="bi bi-x-lg theme-text-blue"></i>
              </button>
            </div>
            <div class="modal-body">
              <form class="row g-3 needs-validation" novalidate onSubmit={onSubmit}>
                <div class="col-md-6">
                  <label for="add-user-firstName" class="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="add-user-firstName"
                    name="firstName"
                    value={firstName}
                    onChange={onChange}
                    required
                  />
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">Please provide First Name.</div>
                </div>
                <div class="col-md-6">
                  <label for="add-user-lastName" class="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="add-user-lastName"
                    name="lastName"
                    value={lastName}
                    onChange={onChange}
                    required
                  />
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">Please provide Last Name.</div>
                </div>
                <div class="col-md-12">
                  <label for="add-user-email" class="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="add-user-email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                  />
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">
                    Please provide a Email (Gmail / Yahoomail).
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="add-user-pwd" class="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="add-user-pwd"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                  />
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">Please provide a password.</div>
                </div>
                <div class="col-md-6">
                  <label for="add-user-repwd" class="form-label">
                    Retype Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="add-user-repwd"
                    name="repassword"
                    value={repassword}
                    onChange={onChange}
                    required
                  />
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">Please provide a password.</div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    class="btn btn-warning theme-bg-orange theme-bg-blue"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
