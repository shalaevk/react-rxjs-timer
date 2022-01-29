import React from "react";

export const Timer = ({ time }) => {

	let hours = Math.floor(time / 60 / 60);
	let minutes = Math.floor(time / 60) - (hours * 60);
	let seconds = time % 60;

	return (
		<div className="timer">
			{hours >= 10 ? hours : `0${hours}`}:{minutes >= 10 ? minutes : `0${minutes}`}:{seconds >= 10 ? seconds : `0${seconds}`}
		</div>
	)
}

