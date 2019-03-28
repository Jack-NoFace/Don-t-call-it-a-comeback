import React, { Component } from "react";
import { InView } from "react-intersection-observer";
import styled from "styled-components";
import { device } from "../../particles/MediaQueries";

import ImageLoader from "../../molecules/imageloader/ImageLoader";

const RowComponent = styled.section`
	align-items: center;
	display: flex;
	flex-direction: column;
	margin: 48px 0;

	@media ${device.sm} {
		margin: 64px 0;
	}

	@media ${device.md} {
		flex-direction: row;
		margin: 128px 0;
	}

	@media ${device.xl} {
		margin: 160px 0;
	}

	a {
		display: inline-flex;
		margin: 24px 0 16px;
		padding: 16px 24px;

		background-color: ${props => props.theme.primary};
		border: none;
		box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
		color: ${props => props.theme.white};
		cursor: pointer;
		font-weight: 700;
		line-height: 1;
		outline: none;
		text-decoration: none;
		transition: all 0.15s ease;
		white-space: nowrap;

		&:active,
		&:focus,
		&:hover {
			transform: translateY(-1px);
			box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
				0 3px 6px rgba(0, 0, 0, 0.08);
		}
	}

	h1 {
		margin-top: 0;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		@media ${device.md} {
			margin-top: 0;
		}

		p + & {
			margin-top: 24px;
		}
	}

	img {
		display: block;
		margin-bottom: 24px;
		margin-top: 32px;
		height: 200px;
		width: 100%;

		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
		object-fit: cover;

		@media ${device.sm} {
			height: 300px;
		}

		@media ${device.md} {
			height: 400px;
			margin-bottom: 0;
			margin-top: 0;
		}
	}

	p {
		max-width: 500px;

		@media ${device.md} {
			max-width: 100%;
		}
	}

	p:last-of-type {
		margin-bottom: 0;
	}

	.row__column {
		width: 100%;
	}

	@media ${device.md} {
		opacity: 0;
		transform: translateX(-50px);
		transition: 0.6s all ease;

		@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
			opacity: 1;
			transform: translateX(0px);
		}

		&.row--right {
			flex-direction: row-reverse;

			transform: translateX(50px);

			.row__column {
				+ .row__column {
					margin-left: 0;
					margin-right: auto;
				}
			}

			.row__image {
				img {
					transform: translateX(-100%);
				}
			}
		}

		&.row--show {
			opacity: 1;
			transform: translateX(0px);

			.row__image {
				img {
					opacity: 1;
					transform: translateX(0%);
				}
			}
		}

		.row__column {
			max-width: 50%;

			+ .row__column {
				margin-left: auto;
				max-width: 40%;
			}
		}

		.row__image {
			overflow: hidden;

			img {
				opacity: 0;
				transform: translateX(100%);
				transition: 1s all ease;
				transition-delay: 0.4s;
			}
		}
	}
`;

export default class Row extends Component {
	prepareContent = content => {
		return content.replace(
			`/wp-content/uploads/`,
			`https://wjhm.noface.app/wp-content/uploads/`
		);
	};

	render() {
		const { index, group } = this.props;

		const alignment = index % 2 === 0 ? `left` : `right`;

		return (
			<InView threshold={0.25} triggerOnce={true}>
				{({ inView, ref }) => (
					<RowComponent
						className={
							inView
								? `row row--${alignment} row--show`
								: `row row--${alignment}`
						}
						ref={ref}
					>
						<div className="row__column">
							<div className="row__image">
								<ImageLoader src={group.media} alt="" />
							</div>
						</div>
						<div
							className="row__column"
							dangerouslySetInnerHTML={{
								__html: this.prepareContent(group.content)
							}}
						/>
					</RowComponent>
				)}
			</InView>
		);
	}
}
