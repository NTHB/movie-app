import React from 'react'
import { TextInput, View, StyleSheet } from 'react-native'

const Form = (props) => (
	<View style={styles.wrapper}>
		<TextInput
            placeholder='Search Keyword'
			style={styles.textInput}
			onEndEditing={props.onSubmit}
			onChangeText={props.onChangeText}
		/>
	</View>
)

const styles = StyleSheet.create({
	wrapper: {
		marginTop: 20,
	},
	textInput: {
		width: 300,
		height: 30,
		borderColor: 'grey',
        padding: 5,
        borderWidth: 1,
	}
})

export default Form