import {Component} from 'react';

type Props = {
	close?: () => void;
	url?: string;
}

export default class Share extends Component<Props> {
	render() {
		return (
			<div >
				<button
					className="twitter-share-button"
					onClick={this.openFacebook.bind( this )}
				>
					Facebook
				</button>
				<button
					className="twitter-share-button"
					onClick={this.openTwitter.bind( this )}
				>
					Twitter
				</button>
				<button onClick={this.props.close}>Close</button>
			</div>
		);
	}

	openTwitter() {
		const $url = encodeURI( this.props.url ?? '' );
		const $href = 'https://twitter.com/intent/tweet?url=' + $url;
		window.open( $href, 'Twitter', 'width=640,height=580' );
	}

	openFacebook() {
		const $url = encodeURI( this.props.url ?? '' );
		const $href = 'https://www.facebook.com/sharer/sharer.php?u=' + $url;
		window.open( $href, 'Twitter', 'width=640,height=580' );
	}
}
