import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';

const MovieDetail = (props) => (
    <View style={styles.container}>
        <Image
            style={styles.image}
            source={props.poster ? { uri: "https://image.tmdb.org/t/p/original" + props.poster } : nil}
        />
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>Popularity: {props.popularity}</Text>
        <Text style={styles.text}>Released on: {props.releaseDate}</Text>
        <Text style={styles.overview}>{props.overview}</Text>
    </View>
)

const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
},
image: {
    width: 300,
    height: 300,
    resizeMode: 'contain'
},
title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
    height: 30,
    width: '100%'
},
text: {
    height: 18
},
overview: {
    marginTop: 15,
    height: 200,
    width: '80%'
},

})

export default MovieDetail