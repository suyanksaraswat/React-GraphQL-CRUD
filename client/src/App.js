import React from 'react';
import './App.css';
import { Box, Heading, Flex, PseudoBox } from "@chakra-ui/core";
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag";
import DebitTable from './component/DebitTable.jsx';
import CreditTable from './component/CreditTable.jsx';

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

function App() {

	const [currentTab, setCurrentTab] = React.useState("Debit");
	
	let accountName;
	let amount;
	let date;

	const { data, loading, error } = useQuery(READ_ENTRIES);
	const [createEntry] = useMutation(CREATE_ENTRY);

	if (loading) return <p>loading...</p>;
	if (error) return <p>ERROR</p>;
	if (!data) return <p>Not found</p>;

	
	return (
		<div className="app">
			<Flex wrap='wrap'>
				<PseudoBox
					as='b'
					py={2}
					px={4}
					transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
					borderWidth='1px'
					borderColor="#EEF2F9"
					fontSize='sm'
					cursor='pointer'
					color={currentTab === "Debit" ? "#FFF" : "#2D3748"}
					bg={
					currentTab === "Debit"
					? "#19CC95"
					: "rgba(255,255,255,0)"
					}
					_hover={{
					bg: currentTab === "Debit" ? "#19CC95" : "#EEF2F9"
					}}
					boxShadow={
					currentTab === "Debit"
					? `0 0 0 0.2rem "#19CC9533"`
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
					borderWidth='1px'
					borderColor="#EEF2F9"
					fontSize='sm'
					cursor='pointer'
					color={currentTab === "Credit" ? "#FFF" : "#2D3748"}
					bg={
					currentTab === "Credit"
					? "#19CC95"
					: "rgba(255,255,255,0)"
					}
					_hover={{
					bg: currentTab === "Credit" ? "#19CC95" : "#EEF2F9"
					}}
					boxShadow={
					currentTab === "Credit"
					? `0 0 0 0.2rem "#19CC9533"`
					: "none"
					}
					onClick={() => {
					setCurrentTab("Credit");
					}}
				>
					Credit
				</PseudoBox>
			</Flex>
			<Flex wrap='wrap-reverse'>
				<Box>
					<Box>
						{currentTab === "Debit" ? (
						<Box w='100%' p={2} mt={6} maxHeight='50vh' overflow='auto'>
							{data.entries &&
							data.entries.map((entry, index) => {
									if (entry.amount[0] == '-'){
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
						<Box w='100%' p={2} mt={6} maxHeight='50vh' overflow='auto'>
							{data.entries &&
								data.entries.map((entry, index) => {
									if (entry.amount[0] != '-'){
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
				</Box>
			</Flex>
			<h3>Create New Entry</h3>
			<form onSubmit={e => {
				e.preventDefault();
				createEntry({ variables: { accountName: accountName.value, amount: amount.value, date: date.value } });
				accountName.value = '';
				amount.value = '';
				date.value = '';
				window.location.reload();
				}}>
				<input className="form-control" type="text" placeholder="Enter account name" ref={node => { accountName = node; }}></input>
				<input className="form-control" type="text" placeholder="Enter amount" ref={node => { amount = node; }}></input>
				<input className="form-control" type="text" placeholder="Enter date" ref={node => { date = node; }}></input>
				<button className="btn btn-primary px-5 my-2" type="submit">Submit</button>
			</form>
			<ul>
				{data.entries.map((entry) =>
				<li key={entry.accountName} className="w-100">
					<span>{entry.accountName}</span>
					<span>{entry.amount}</span>
					<span>{entry.date}</span>
				</li>
				)}
			</ul>
		</div>
		);
}

export default App;
