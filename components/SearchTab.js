import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import Header from './Header';
import Form from './Form';
import MovieCell from './MovieCell';

const keywords = ['movie', 'person', 'tv']
const values = ['movies', 'people', 'tv show']

class SearchTab extends Component {

    state = {
		index: 0,
		query: '',
        results: [],
        hasInfo: false,
		personName: null,
		error: null,
	}

	indexSelect = async (index) => {
		await this.setState({
			index: index,
			error: null
		})
		if (this.state.query !== '') {
			await this.fetchMovieData()
		} else {
			await this.setState({
				results: [],
				hasInfo: false
			})
		}
	}

	fetchData = async () => {
		if (this.state.query !== '') {
			await this.fetchMovieData()
		}
	}
	
	fetchMovieData = async () => {
		const url = `https://api.themoviedb.org/3/search/${keywords[this.state.index]}?api_key=8367b1854dccedcfc9001204de735470&query=${this.state.query}&language=en-US`
		console.log(url)
		await fetch(url)
			.then(response => response.json())
			.then(myJson => {
				if (myJson["results"].length > 0) {
                    if (this.state.index == 0 || this.state.index == 2 ) {
                        this.setState({
                            results: myJson["results"],
                            hasInfo: true,
                        })
                    } else if (this.state.index == 1) {
                        this.setState({
                            results: myJson["results"][0]["known_for"],
                            personName: myJson["results"][0]["name"],
                            hasInfo: true,
                        })
                    } else {
                        // 
                    }
				} else {
					this.setState({ 
						results: [], 
						hasInfo: false, 
						error: 'No result found' 
					})
				}
			})
			.catch(error => this.setState({
				error: error
			}))
	}
	
	render() {
		const {index, query, results, personName, hasInfo, error} = this.state

		return (
			<View style={styles.container}>
				<Header titleHeader={values[index] + ' search'} />
				<View style={styles.view}>
					<SegmentedControlTab
                        values={values}
                        selectedIndex={index}
						tabStyle={styles.tabStyle}
						tabTextStyle={{ color: '#6495ed', textTransform: 'capitalize' }}
						activeTabStyle={{ backgroundColor: '#6495ed' }}
						onTabPress={this.indexSelect}
					/>
					<Form
						onSubmit={this.fetchData}
						onChangeText={text => this.setState({ query: text, error: null })}
					/>

                    { hasInfo && index == 0 && <Text style={styles.text}>Movie results for "{query}"</Text> }
                    
                    { hasInfo && index == 1 && <Text style={styles.text}>"{personName}" is in the following movies</Text> }
                    
                    { hasInfo && index == 2 && <Text style={styles.text}>TV show results for "{query}"</Text> }
                    
					{ hasInfo &&
						<FlatList
							style={styles.list}
							data={results.length > 10 ? results.splice(0,10) : results}
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
		alignItems: 'center'
	},
	tabStyle: {
		marginTop: 10,
        borderColor: '#6495ed',
	},
	text: {
		marginTop: 20,
	},
})

export default SearchTab;