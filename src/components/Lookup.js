import React, { Component } from 'react';
import axios from 'axios';
import Jambotron from './common/Jambotron';
import Loader from './common/Loader';

class Lookup extends Component {

  state = {
      currencies: [],
      statusMessage: "",
    }

  componentWillMount() {  
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

render() {
  const { currencies, statusMessage } = this.state;
  return (
    <div>
      { !statusMessage ? (
        <>
          <Jambotron
            title="Current Croatian Kuna exchange rates"
            message="as set by Croatian National Bank"
          />
              { currencies.length === 0 ? <Loader /> :
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Currency</th>
                <th scope="col">Unit Value</th>
                <th scope="col">Buying rate</th>
                <th scope="col">Median Rate</th>
                <th scope="col">Selling Rate</th>
              </tr>
            </thead>
            <tbody>
              { currencies.map(el => <tr>
                  <td>{el.currency_code}</td>
                  <td>{el.unit_value}</td>
                  <td>{el.buying_rate}</td>
                  <td>{el.median_rate}</td>
                  <td>{el.selling_rate}</td>
                </tr>)
              }
            </tbody>
          </table>
              }
        </>
      ) : 
      statusMessage}
    </div>
    );
  }
}

  export default Lookup;