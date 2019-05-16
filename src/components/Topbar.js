import React, { Component } from 'react'
// import { Button } from './dumb/Button'
// import { connect } from 'react-redux'

const CONNECTION = {}

class Topbar extends Component {

  componentDidMount () {
    this.codefundAdRef = null
    this.updateAd()

    setInterval(() => {
      this.updateAd()
      console.log('ad updated')
    }, 1000 * 60 * (1 + 9 * Math.random()));
  }

  updateAd() {
    const ad_script = document.querySelector("#codefund-ad-script")
    const ad = document.querySelector("#codefund")

    if (ad_script) {
      ad_script.remove()
    }

    ad.innerHTML = "";

    const script = document.createElement("script");

    script.id = "codefund-ad-script";
    script.src = "https://codefund.app/properties/285/funder.js";
    script.async = true;

    document.body.appendChild(script);
  }

  render () {
    const { props } = this

    return (
      <nav className="navbar navbar-expand navbar-light bg-white topbar static-top shadow">
        {/* <!-- Topbar  --> */}

        {/* <!-- Sidebar Toggle (Topbar)  --> */}
        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
          <i className="fa fa-bars"></i>
        </button>

        {/* <!-- Topbar Navbar  --> */}
        <ul className="navbar-nav ml-auto">

          <li className="nav-item">
            <span className="nav-link">
              <img src="https://insta.gramup.me/client/img/icon.png" height="30" alt="logo"/>&nbsp;<span>Instagram Direct by</span>&nbsp;<a href="https://gramup.me" target="_blank">Gram Up!</a>
            </span>
          </li>

          <div className="topbar-divider d-none d-sm-block"></div>

          <li className="nav-item">
            <span className="nav-link">
              <div id="codefund" ref={el => this.codefundAdRef = el}>CODEFUND AD</div>
            </span>
          </li>

          <div className="topbar-divider d-none d-sm-block"></div>

          {props.isLoading && (
            <li className="nav-item dropdown no-arrow">
              <span className="nav-link">
                <span className="loading-status mr-2 d-none d-lg-inline text-gray-600 small">
                  Loading...
                </span>
              </span>
            </li>
          )}

          <div className="topbar-divider d-none d-sm-block"></div>

          {props.connection.status === CONNECTION.NOT_INSTALLED && (
            <li className="nav-item dropdown no-arrow">
              <span className="nav-link">
                <span className="install-extension mr-2 d-none d-lg-inline text-grey-600">
                  <a
                    className="btn btn-success"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://chrome.google.com/webstore/detail/instagram-yourself/njonkbhnmmjgancfbncekpgkmidhbbpo"
                  >
                    Install extension
                  </a>
                </span>
              </span>
            </li>
          )}

        </ul>

        {/* <!-- End of Topbar  --> */}
      </nav>
    )
  }
}

export default Topbar

// export default connect(
//   ({ user, isLoading, error, connection, instagram }) => ({ user, isLoading, error, connection, instagram }),
//   {  }
// )(Topbar)
