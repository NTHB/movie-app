import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab'

import Header from './Header';
import MovieCell from './MovieCell';

const values = ['popular', 'top rated', 'upcoming']
const keywords = ['popular', 'top_rated', 'upcoming']

class ListTab extends Component {

    state = {
		index: 0,
		results: [],
		hasInfo: false,
		error: null,
	}

	componentDidMount = () => {
		this.fetchMovieData()
	}

	indexSelect = async (index) => {
		await this.setState({
			index: index,
		})
		this.fetchMovieData()
	}

	fetchMovieData = async () => {
		const url = `https://api.themoviedb.org/3/movie/${keywords[this.state.index]}?api_key=8367b1854dccedcfc9001204de735470&language=en-US`
		console.log(url)
		await fetch(url)
			.then(response => response.json())
			.then(myJson => this.setState({
				totalResults: myJson["total_results"],
				results: myJson["results"],
				hasInfo: true,
			}))
			.catch(error => this.setState({
				error: error
			}))
	}

    render() {

        const { index, results, hasInfo } = this.state

        return (
            <View style={styles.wrapper}>
				<Header titleHeader={values[index] + ' Movies List'} />
				<View style={styles.view}>
					<SegmentedControlTab
                        values={values}
                        selectedIndex={index}
                        onTabPress={this.indexSelect}
						tabStyle={styles.tab}
						tabTextStyle={{ color: '#6495ed', textTransform: 'capitalize' }}
						activeTabStyle={{ backgroundColor: '#6495ed' }}
						
					/>
                    <Text style={styles.text}>{values[index]+' Movies'}</Text>
					{hasInfo &&
						<FlatList
							style={styles.list}
							data={results.splice(0, 10)}
							renderItem={({ item }) =>
								<MovieCell
									poster={item["poster_path"]}
									title={item["title"] || item["name"]}
									overview={item["overview"]}
								/>
							}
						/>
					}
				</View>
			</View>
        )
    }
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	view: {
		marginLeft: 30,
		marginRight: 30,
	},
	tab: {
		marginTop: 10,
        borderColor: '#6495ed',
	},
	text: {
		textAlign: 'center',
		fontSize: 20,
		marginTop: 20,
		textTransform: 'capitalize'
	}
})

export default ListTab;