import React, { Component } from 'react';

class DropDown extends Component {
  state = {
    showItems: false,
    value: null,
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ showItems: false })
    }
  }

  onChange = (ev) => {
    const { onChange } = this.props;
    this.setState({ value: ev.target.value });
    this.setState((prevState) => (
        { showItems: !prevState.showItems }
      ))
    onChange(ev.target.value);
  }

  render(){
    const { showItems, value } = this.state;
    const { currencies = [] } = this.props;
    return (
      <div className={showItems ? "dropdown show" : "dropdown"} ref={this.setWrapperRef}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={() => this.setState((prevState) => (
            { showItems: !prevState.showItems }
          ))}
        >
          {value || "Currency"}
        </button>
        <div className={showItems ? "dropdown-menu show" : "dropdown-menu"} aria-labelledby="dropdownMenuButton">
          { currencies.length === 0 ? null :
            currencies
              .map(el => <input
                type="button"
                className="dropdown-item"
                key={el.currency_code}
                onClick={ev => this.onChange(ev)}
                value={el.currency_code} />)
          }
        </div>
      </div>
    )
  }
}

export default DropDown;