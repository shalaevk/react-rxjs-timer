import React from "react";


export const Buttons = React.forwardRef(({ start, reset }, ref) => {
	return (
		<div className="buttons">
			<button onClick={start}>Start/Stop</button>
			<button onClick={reset} > Reset </button>
			<button ref={ref} > Wait </button>
		</div>
	)
});