import React from 'react';
import { useHistory, BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../App.css';
import { Icon, Box, Heading, Flex, PseudoBox } from "@chakra-ui/core";
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag";
import DebitTable from './DebitTable.jsx';
import CreditTable from './CreditTable.jsx';
import Form from './Form.js';

const READ_ENTRIES = gql`
  query entries{
    entries {
      accountName
      amount
      date
    }
  }
`;

const CREATE_ENTRY = gql`
  mutation CreateEntry($accountName: String!, $amount: String!, $date: String!) {
    createEntry(accountName: $accountName, amount: $amount, date: $date)
  }
`;

function Entries() {
	const history = useHistory();
	const [currentTab, setCurrentTab] = React.useState("Debit");
	
	let accountName;
	let amount;
	let date;

	const { data, loading, error } = useQuery(READ_ENTRIES);
	const [createEntry] = useMutation(CREATE_ENTRY);

	if (loading) return <p>loading...</p>;
	if (error) return <p>ERROR</p>;
	if (!data) return <p>Not found</p>;
	
	const handleAdd = () => {
		history.push('/add-entry');
	}
	
	return (
		<div className="app">
			<Flex wrap='wrap' align='center' justify='center'>
				<PseudoBox
					as='b'
					py={2}
					px={4}
					fontSize='sm'
					cursor='pointer'
					border='2px solid gray'
					color={currentTab === "Debit" ? "#000000" : "#808080"}
					bg={
					currentTab === "Debit"
					? "#FFF"
					: "#DCDCDC"
					}
					_hover={{
					bg: currentTab === "Debit" ? "#FFF" : "#DCDCDC"
					}}
					boxShadow={
					currentTab === "Debit"
					? `0 0 0 0.2rem "#808080"`
					: "none"
					}
					onClick={() => {
					setCurrentTab("Debit");
					}}
				>
					Debit
				</PseudoBox>
				<PseudoBox
					as='b'
					py={2}
					px={4}
					transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
					border='2px solid gray'
					fontSize='sm'
					cursor='pointer'
					color={currentTab === "Credit" ? "#000000" : "#808080"}
					bg={
					currentTab === "Credit"
					? "#FFF"
					: "#DCDCDC"
					}
					_hover={{
					bg: currentTab === "Credit" ? "#FFF" : "#DCDCDC"
					}}
					boxShadow={
					currentTab === "Credit"
					? `0 0 0 0.2rem "#808080"`
					: "none"
					}
					onClick={() => {
					setCurrentTab("Credit");
					}}
				>
					Credit
				</PseudoBox>
			</Flex>
			<Flex wrap='wrap-reverse' justifyContent='center'>
				<Box>
						{currentTab === "Debit" ? (
						<Box 
							p={2} 
							mt={1}
							maxHeight='100vh' 
							overflow='auto'
						>
							{data.entries &&
							data.entries.map((entry, index) => {
									if (entry.amount[0] === '-'){
									return (
										<DebitTable
											accountName={entry.accountName}
											amount={entry.amount}
											date={entry.date}
										/>
										);
									}
								})}
						</Box>
						) : (
						<Box 
							p={2} 
							mt={1} 
							border='2px #808080'
							maxHeight='100vh' 
							overflow='auto'
						>
							{data.entries &&
								data.entries.map((entry, index) => {
									if (entry.amount[0] !== '-'){
									return (
										<CreditTable
											accountName={entry.accountName}
											amount={entry.amount}
											date={entry.date}
										/>
										);
									}
								})}
						</Box>
						)}
				</Box>
			</Flex>
			<div style={{textAlign: 'end'}}>
				<button className="btn" style={{background: 'black', color: 'white', borderRadius: '50%'}} onClick={handleAdd}>+</button>
			</div>
		</div>
		);
}

export default Entries;
