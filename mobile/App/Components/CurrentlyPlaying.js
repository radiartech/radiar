const React = require('react-native');
const STYLES = require('../Assets/PicoStyles.js');
const UI_HELPERS = require('../Utils/UiHelpers.js');
const SongQueue = require('./SongQueue.js');

const {
	View,
	AlertIOS,
	Dimensions,
	Image,
	Text,
	StyleSheet,
	TouchableHighlight
} = React;

const handlePress = function() {
	fetch(`${SERVER_ENDPOINT}/partyplaylist`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoading: false,
          error: ''
        });
        this.props.navigator.push({
          title: 'Results',
          passProps: {results: json},
          component: Tracks
        });
      })
      .catch(err => {
        this.setState({isLoading: false, error: err})
      });
};

module.exports = CurrentlyPlaying = props => {
	if (!props.trackObj) return <View />;
	let artwork = props.trackObj.artwork_url ? 
		{uri: props.trackObj.artwork_url} : require("../Assets/Pico-O-grey.png");
	return (
		<TouchableHighlight
			onPress={handlePress.bind(this)}>
			<View style={styles.container}>
				<Image 
					style={STYLES.singleImage}
					source={artwork} />
				<View style={styles.trackInfoContainer}>
					<Text 
						style={styles.trackInfo}
						numberOfLines={1}>
						{props.trackObj.title}
					</Text>
					<Text 
						style={styles.trackInfo}
						numberOfLines={1}>
						{props.trackObj.genre}
					</Text>
					<Text style={styles.trackInfo}>
						{UI_HELPERS.makeHumanReadable(props.msRemaining)}
					</Text>
				</View>
			</View>
		</TouchableHighlight>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		flex: 1,
		flexDirection: 'row',
		paddingTop: 5,
		paddingRight: 7,
		paddingBottom: 5,
		paddingLeft: 5,
		backgroundColor: STYLES.colors.PICO_GREEN
	},
	trackInfoContainer: {
		flexDirection: 'column'
	},
	trackInfo: {
		fontSize: 14,
	},
	nowPlayingText: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#000'
	},
});