import React from 'react'; 
import axios from 'axios'; 
import '../transaction.min.css'; 
import CurrencyFormat from 'react-currency-format';

class Expense extends React.Component {
    constructor(props) {
        super(props); 
        this.state ={
            transactions: [],            
        }
    }

    componentDidMount() {
        this.getExpense(); 
    };
    
    getExpense = () => {
        let url = "http://localhost:3001/transactions/expense"; 
        axios.get(url)
            .then(response => this.setState({ transactions: response.data})); 
    }; 


    render() {
        const amounts = this.state.transactions.map(transaction => transaction.amount);
        const total = amounts.reduce((acc, item) => (acc += item), 0);
        // const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)
        return(
            <div>
                <h1 className="total"><CurrencyFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h1>
            </div>
        )
    }
}

export default Expense; 