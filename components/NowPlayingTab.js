import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Header from './Header';
import MovieDetail from './MovieDetail';

class NowPlayingTab extends Component {
	
	state = {
		totalResults: 0,
		movies: [],
		isLoading: true,
		error: null,
	}
	
	fetchData = async () => {
		const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=8367b1854dccedcfc9001204de735470&language=en-US`
		await fetch(url)
			.then(response => response.json())
			.then(myJson => this.setState({
				totalResults: myJson["total_results"],
				results: myJson["results"],
				isLoading: false
			}))
			.catch(error => this.setState({
				error: error
			}))
	}
	
	componentDidMount() {
		this._navListener = this.props.navigation.addListener('didFocus', () => {
			this.fetchData()
		})
	}

	render() {
        let randomNumber = Math.floor(Math.random() * 20)
		const { results, isLoading, error } = this.state

		return (
			<View>
				<Header titleHeader='Now Playing' />
				{ !isLoading &&
					<MovieDetail
						poster={results[randomNumber]["poster_path"]}
						title={results[randomNumber]["title"]}
						popularity={results[randomNumber]["popularity"]}
						releaseDate={results[randomNumber]["release_date"]}
						overview={results[randomNumber]["overview"]}
					/>
				}
			</View>
		)
	}
}

export default NowPlayingTab;