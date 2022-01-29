import React, { useEffect, useState } from "react";
import { Timer } from "./conponents/timer/Timer";
import { Buttons } from "./conponents/buttons/Buttons";
import { interval, Subject, fromEvent } from "rxjs";
import { takeUntil, buffer, debounceTime, map, filter } from "rxjs/operators";


export default function App() {

	const [time, setTime] = useState(0);
	const [condition, setCondition] = useState("stop");
	const waitBtn = React.createRef();



	useEffect(() => {
		const stopInterval$ = new Subject();
		interval(1000)
			.pipe(takeUntil(stopInterval$))
			.subscribe(() => {
				if (condition === "start") {
					setTime(currentTime => currentTime + 1);
				}
			});
		return () => {
			stopInterval$.next();
			stopInterval$.complete();
		};
	}, [condition]);

	useEffect(() => {
		const click$ = fromEvent(waitBtn.current, 'click');
		const doubleClick$ = click$.pipe(
			buffer(click$.pipe(debounceTime(300))),
			map((clicks) => {
				return clicks.length;
			}),
			filter((clicksLength) => clicksLength === 2)
		);
		doubleClick$.subscribe(() => {
			wait()
		});
	})

	const startStop = () => {
		if (condition === "stop" || condition === "wait") {
			setCondition("start");
		} else {
			setCondition("stop");
			setTime(0);
		}
	};

	const reset = () => {
		setTime(0);
		setCondition("start");
	};

	const wait = () => {
		setCondition("wait");
	};
	return (
		<article>

			<Timer
				time={time}
			/>

			<Buttons
				start={startStop}
				reset={reset}
				ref={waitBtn}
			/>

		</article>
	)
};
