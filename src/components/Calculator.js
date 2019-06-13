import React, { Component } from 'react'
import axios from 'axios'
import DropDown from './common/DropDown';
import Jambotron from './common/Jambotron';

export default class Calculator extends Component {
    state = {
      currencies: [],
      currencyToConvert: null,
      currencyConverted: null,
      amountToConvert: 0.0,
    }

  componentWillMount(){
    this.getCurrencies();
  }

  getCurrencies = async () => {
    await axios
      .get("https://cors-anywhere.herokuapp.com/http://hnbex.eu/api/v1/rates/daily/")
      .then(res => (
        res.status === 200 ? this.setState({ currencies: res.data}): 
        this.setState({ statusMessage: "Sorry, there are some problems with server" })
      ))
      .catch(err => {
        console.log(err);
        return null;
      });
  };

  onChange = (name, value) => {
    this.setState({ [name]: value })
  }

  getRateByCurrency = (currency) => {
    const { currencies } = this.state;
    return +currencies.filter(el => el.currency_code === currency)
      .map(el => el.median_rate)[0];
  }

  render(){
    const {
      currencies,
      amountToConvert,
      currencyToConvert,
      currencyConverted,
      hideItems,
    } = this.state;

    const amountConverted = (
      amountToConvert * this.getRateByCurrency(currencyConverted)/
      this.getRateByCurrency(currencyToConvert))
      .toFixed(2);
    return (
      <div>
        <Jambotron
          title="Exchange Calculator"
          message="Here You Can Easy Calculate Your Money In Different Currencies"
        />
        <div className="d-flex justify-content-center with-padding">
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Input amount for exchange"
              value={amountToConvert || ''}
              onChange={ev => this.setState({ amountToConvert: ev.target.value })}
            />
          </div>
          <DropDown
            currencies={currencies}
            onChange={value => this.onChange('currencyToConvert', value)}
            hideItems={hideItems}
          />
          <div className="padding-top">
            =
          </div>
          <div className="input-group mb-3">
            <input
              disabled
              type="number"
              className="form-control"
              placeholder="0.00"
              value={amountConverted || ''}
            />
          </div>
          <DropDown
            currencies={currencies}
            onChange={value => this.onChange('currencyConverted', value)}
          /> 
        </div>
      </div>
    );
  }
}
  