import React from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';
import { Icon, Box, Heading, Flex, PseudoBox } from "@chakra-ui/core";
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag";

const CREATE_ENTRY = gql`
  mutation CreateEntry($accountName: String!, $amount: String!, $date: String!) {
    createEntry(accountName: $accountName, amount: $amount, date: $date)
  }
`;

function Form() {
	const history = useHistory();

	let accountName;
	let amount;
	let date;

	const [createEntry] = useMutation(CREATE_ENTRY);

	const handleCancel = () => {
		history.push('/');
	}

	return (
		<div className="app">
			<Flex wrap='wrap' align='center' justify='center'>
				<form onSubmit={e => {
					e.preventDefault();
					console.log('acc - ', accountName.value);
					console.log('acc - ', amount.value);
					console.log('acc - ', date.value);
					createEntry({ variables: { accountName: accountName.value, amount: amount.value, date: date.value } });
					accountName.value = '';
					amount.value = '';
					date.value = '';
					history.push('/');
					window.location.reload();
					}}>
					<h2 
						style={{marginBottom: '10%'}}
					>
						Entry
					</h2>
					<h3 
						style={{marginBottom: '1%', fontSize: '80%'}}
					>
						Account Name
					</h3>
					<input 
						className="form-control" 
						style={{marginBottom: '5%', background: 'lightgray'}} 
						type="text" 
						placeholder="Enter account name" 
						ref={node => { accountName = node; }}>
					</input>
					<h3 
						style={{marginBottom: '1%', fontSize: '80%'}}
					>
						Amount
					</h3>
					<input 
						className="form-control" 
						style={{marginBottom: '5%', background: 'lightgray'}} 
						type="text" 
						placeholder="Enter amount" 
						ref={node => { amount = node; }}>
					</input>
					<h3 
						style={{marginBottom: '1%', fontSize: '80%'}}
					>
						Date
					</h3>
					<input 
						className="form-control" 
						style={{marginBottom: '5%', background: 'lightgray'}} 
						type="text" 
						placeholder="Enter date" 
						ref={node => { date = node; }}>
					</input>
					<button 
						className="btn" 
						style={{background: 'white', color: 'gray', marginTop: '5%'}} 
						onClick={handleCancel}
					>
						Cancel
					</button>
					<button 
						className="btn float-right" 
						style={{background: 'white', color: 'black', marginTop: '5%'}} 
						type="submit"
					>
						Create
					</button>
				</form>
			</Flex>
		</div>
		);
}

export default Form;
