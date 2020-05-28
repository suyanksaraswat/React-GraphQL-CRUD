import React from "react";
import { Box, Text, Heading, Flex } from "@chakra-ui/core";
import Avatar from 'react-avatar';

function CreditTable(props) {

	return (
		<>
			<Box
				w='100%'
				py={3}
				px={5}
				my={1}
			>
				<Flex alignItems='center'>
					<Avatar
						name='I N'
						round={true}
						size='50'
						color='gray'
					/>
					<Box ml='10px'>
						<Heading as='h6' size='sm'>
							{props.accountName}
						</Heading>
						<Text fontSize='sm'>
							Amount: {props.amount}
										|
							Date: {props.date}
						</Text>
					</Box>
				</Flex>
			</Box>
		</>
	);
};

export default CreditTable;
