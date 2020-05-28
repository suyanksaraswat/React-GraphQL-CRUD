import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import { Icon, Box, Heading, Flex, PseudoBox } from "@chakra-ui/core";
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag";
import DebitTable from './component/DebitTable.jsx';
import CreditTable from './component/CreditTable.jsx';
import Form from './component/Form.js';
import Entries from './component/Entries.js';

function App() {

	return (
		<Router>
			<div>
				<Switch>
					<Route exact path='/' component={Entries} />
					<Route path='/add-entry' component={Form} />
				</Switch>
			</div>
		</Router>
		);
}

export default App;
