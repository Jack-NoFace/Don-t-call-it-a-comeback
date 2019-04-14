import React, { Component } from "react";

import IntroComponent from "./IntroStyles";

function Intro(props) {
	const { data, heading, index, marginReduced, subheading } = props;
	const Subheading = index === 0 ? `h1` : `h2`;
	const Heading = index === 0 ? `h2` : `h3`;

	if (data) {
		return (
			<IntroComponent
				className="intro"
				marginReduced={marginReduced ? false : true}
			>
				<div className="intro__wrapper">
					<Subheading className="h4 intro__subheading">
						{data.subheading}
					</Subheading>
					<Heading className="h1 intro__heading">{data.heading}</Heading>
					<div
						className="intro__contents"
						dangerouslySetInnerHTML={{ __html: data.content }}
					/>
				</div>
			</IntroComponent>
		);
	} else {
		return (
			<IntroComponent
				className="intro"
				marginReduced={marginReduced ? false : true}
			>
				<div className="intro__wrapper">
					<Subheading className="h4 intro__subheading">{subheading}</Subheading>
					<Heading className="h1 intro__heading">{heading}</Heading>
					<div className="intro__contents">{props.children}</div>
				</div>
			</IntroComponent>
		);
	}
}

export default Intro;
