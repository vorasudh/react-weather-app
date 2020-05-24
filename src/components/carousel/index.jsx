import React from 'react';
import Slider from 'react-slick';

import SliderItem from '../sliderItem';
import './styles.css';

const SlickSettings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 1,
	centerMode: true,
	centerPadding: '40px',
	arrows: true,
	responsive: [
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
			},
		},
	],
};

export default ({ data = [], temperatureUnit = '' }) => (
	<Slider {...SlickSettings}>
		{data.map(item => (
			<SliderItem key={item.dt} item={item} temperatureUnit={temperatureUnit} />
		))}
	</Slider>
);
