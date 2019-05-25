import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

import LogoYouTube from "../../../assets/images/icons/brands/youtube.svg";
import backgroundLeft from "./youtube-left.png";
import backgroundRight from "./youtube-right.png";

import YouTubeComponent from "./YouTube-Styles";

const opts = {
	playerVars: {
		// https://developers.google.com/youtube/player_parameters
		autoplay: 0
	}
};

function YouTubeChannel({ data }) {
	const [channelVideos, setChannelVideos] = useState([]);

	const _onReady = event => {
		// access to player in all event handlers via event.target
		event.target.pauseVideo();
	};

	useEffect(() => {
		async function fetchData() {
			const GAPI = `AIzaSyArCR7gVx2-HT0wXvjLl3GHOPqolqVINoA`;
			const PlayListID = `UUIOm-HME4V_STS9yWM5aXIg`;
			const NumberResults = 12;
			const apiURL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${PlayListID}&key=${GAPI}&maxResults=${NumberResults}`;
			const channelData = await fetch(apiURL).then(res => {
				return res.json();
			});
			return channelData;
		}

		fetchData().then(data => setChannelVideos(data.items));
	}, []);

	return (
		<YouTubeComponent>
			<img
				className="youtube__background youtube__background--left"
				src={backgroundLeft}
			/>
			<img
				className="youtube__background youtube__background--right"
				src={backgroundRight}
			/>
			<div className="youtube__content">
				<div className="youtube__intro">
					<h2>My YouTube Channel</h2>
					<p>
						Early on in my career I knew it was important to document what I was
						learning, so I started a blog. The next step on from that was to
						start my own YouTube channel. I did this not only for myself, but to
						also share my understanding of topics with others looking to develop
						their skills.
					</p>
					<p>
						Starting my own YouTube channel encouraged me to understand a topic
						deeply as to teach a topic, you must have a strong grasp on the
						concepts involved. I don't claim to be an expert on every subject I
						cover, but if I find it of interest, I will cover it and share my
						experience with others.
					</p>
					<a
						className="button"
						href="https://youtube.com/whatjackhasmade"
						target="_blank"
					>
						View My YouTube Channel
					</a>
					{channelVideos &&
						channelVideos !== [] &&
						channelVideos[0] &&
						channelVideos[0].snippet && (
							<div
								className="youtube__video"
								title={channelVideos[0].snippet.title}
							>
								<YouTube
									videoId={channelVideos[0].snippet.resourceId.videoId}
									opts={opts}
									onReady={_onReady}
								/>
							</div>
						)}
				</div>
				<div className="youtube__videos">
					{channelVideos &&
						channelVideos !== [] &&
						channelVideos.map((video, index) => {
							if (index > 0 && index < 19) {
								return <Video index={index} key={video.id} video={video} />;
							} else {
								return null;
							}
						})}
				</div>
			</div>
		</YouTubeComponent>
	);
}

function Video({ index, key, video }) {
	return (
		<div index={index} className="youtube__video" title={video.snippet.title}>
			<a
				href={`https://www.youtube.com/watch?v=${
					video.snippet.resourceId.videoId
				}`}
				target="_blank"
			>
				<div className="youtube__video__thumbnail">
					<img
						src={video.snippet.thumbnails.medium.url}
						alt={video.snippet.title}
					/>
				</div>
			</a>
		</div>
	);
}

export default YouTubeChannel;
