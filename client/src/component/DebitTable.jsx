import React from "react";
import { Avatar, Box, Text, Heading, Flex } from "@chakra-ui/core";

function DebitTable(props) {

	return (
		<>
			<Box
				w='100%'
				py={3}
				px={5}
				my={1}
				border='1px'
				borderRadius='md'
				borderColor="#EEF2F9"
			>
				<Flex alignItems='center'>
					{/*
					<Avatar
						size='md'
						src={"default_path"}
						mr={4}
					/>
					*/}
					<Box>
						<Heading as='h6' size='sm'>
							{props.accountName}
						</Heading>
						<Text fontSize='sm'>
							Amount: {props.amount}
							<Text as='i' color="#677793" mx={1}>
								|
							</Text>
							Date: {props.date}
						</Text>
					</Box>
				</Flex>
			</Box>
		</>
	);
};

export default DebitTable;
