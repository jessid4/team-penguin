import React from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import '../transaction.min.css';

class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };

    this.userid = React.createRef();
    this.paymentType = React.createRef();
    this.date = React.createRef();
    this.type = React.createRef();
    this.amount = React.createRef();
    this.description = React.createRef();
  };

  // AJ - for DatePicker => npm install react-datepicker --save
  handleChange = date => {
    this.setState({
      date: date
    });
  };

  componentDidMount() {
    this.getData();
  };

  getData = () => {
    // Express uses port 3001 (react uses 3000)
    let url = "http://localhost:3001/transactions";
    axios.get(url)
      .then(response => this.setState({ transactions: response.data }));
  };

  addTransaction = () => {
    //window.location.reload();
    let url = "http://localhost:3001/transactions";
    axios.post(url, {
      paymentType: this.paymentType.current.value,
      date: this.state.date,
      type: this.type.current.value,
      amount: this.amount.current.value,
      description: this.description.current.value
    })
      .then(response => {
        // refresh the data
        window.location.reload();
        // empty the input
        this.paymentType.current.value = "Select Payment Type"
        // eslint-disable-next-line
        this.state.date = ""
        this.type.current.value = "Select Type"
        this.amount.current.value = ""
        this.description.current.value = "";
      })
      .catch((error) => alert('Oops! . There Is A Problem'))
      window.location.reload();
  };

  deleteTransaction = (transactionid) => {
    let url = "http://localhost:3001/transactions/" + transactionid;
    axios.delete(url)
      .then(response => {
        this.getData();
        alert('Your Transaction has been deleted!');
        window.location.reload();
      })
  };

  render() {
    return (
      <div className="form">
        <p className="transactions">Add A New Transaction</p>
        <h3 className="quote">"Beware of little expenses. A small leak will sink a great ship." ~Benjamin Franklin</h3>
        <form className="form">
          <table className="table">
            <tbody>
              <tr>
                <td><select required ref={this.paymentType} className="selectFields">
                  <option value="N/A" className="oops">Payment Type: </option>
                  <option value="" disabled className="type">Select Payment Type: </option>
                  <option value="Direct Deposit">Direct Deposit</option>
                  <option value="Check">Check</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash</option>
                  <option value="Other">Other</option>
                </select></td>
                <td><DatePicker selected={this.state.date} onChange={this.handleChange} placeholderText="Date" /></td>
                <td><select ref={this.type} className="selectFields">
                  <option value="N/A (Was not Added to Your Balances)" className="Oops">Type:</option>
                  <option defaultValue="" disabled="disabled" className="type">Transaction Type: </option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                  <option value="Savings">Savings</option>
                </select></td>
                <td>
                  <input ref={this.amount} id="amount" placeholder="$ Dollar Amount" type="number" required /></td>
                <td><input ref={this.description} id="description" placeholder="Description" /></td>
              </tr>
            </tbody>
          </table>
          <button type="button" className="addTransaction" onClick={this.addTransaction}>add</button>
          <p className="note">*** Thank you for choosing Budgeteer! Please note that this application is based on whole numbers <br />and all demcimals will be rounded to the nearest dollar. - Team Penguin***</p>
        </form>
        <table className="table">
          <thead>
            <tr className="rowHead">
              <th>Payment Type</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Description</th>
              <th></th>
              <th></th>
            </tr></thead>
          <tbody>
            {this.state.transactions.map(p => (
              <tr key={p.transactionid}>
                <td>{p.paymentType}</td>
                <td>{p.date}</td>
                <td>{p.type}</td>
                <td>${p.amount}</td>
                <td>{p.description}</td>
                <td><Link to={`/edit/${p.transactionid}`}><button type="button" className="btn btn-success">Edit</button></Link></td>
                <td><button type="button" className="btn btn-danger" onClick={() => this.deleteTransaction(p.transactionid)}>Delete</button></td>
              </tr>
            ))}</tbody>
        </table>
        <Link to={`/history`}><p className="allTransactions">View All Transactions</p></Link>
        <p className="note2">If you received an N/A or if any column is blank in any of your transactions you can simply edit them</p>
        <p><Link to={'/help'}><span className="help">Help & More Information</span></Link></p>
      </div>
    );
  }
}

export default Transaction;
