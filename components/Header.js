import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const Header = (props) => (
	<View style={styles.view}>
		<Text style={styles.title}>React Native Movie App</Text>
		<Text style={styles.sub_title}>{props.titleHeader}</Text>
	</View>
)

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6495ed',
        paddingTop: 50,
        paddingBottom: 25,
        width: '100%'
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        color: 'white'
    },
    sub_title: {
        fontSize: 18,
        color: 'white'
    }
});

export default Header