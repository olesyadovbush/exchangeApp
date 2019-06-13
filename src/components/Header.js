import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  state = {
    showItems: false,
  }

  onCloseDropdown = () => {
    this.setState({ showItems: false });
  }

  render() {
    const { showItems } = this.state;
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to='/'>Exchange App</Link>
          <button
            className={showItems ? "navbar-toggler collapsed" : "navbar-toggler"}
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={showItems ? false: true }
            aria-label="Toggle navigation"
            onClick={() => this.setState((prevState) => (
              { showItems: !prevState.showItems }
            ))}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={showItems ? "collapse navbar-collapse collapse show ": "collapse navbar-collapse collapse"}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active"
                onClick={this.onCloseDropdown}
              >
                <Link className="nav-link" to='/'>Lookup</Link><span className="sr-only">(current)</span>
              </li>
              <li className="nav-item"
                onClick={this.onCloseDropdown}
              >
                <Link className="nav-link" to='/calculator'>Calculator</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}