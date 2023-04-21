import React, { useState } from 'react'
import '../assets/css/Control.css'

export default function Control({ voices, speaking, onSpeak, onPause, onResume, onStop }) {
	/* eslint-disable no-undef */
	const [text, setText] = useState('');
	const [voice, setVoice] = useState('');
	const [rate, setRate] = useState('1.00');
	const [paused, setPaused] = useState(false);

	const handleSpeak = (e) => {
		e.preventDefault();
		onSpeak(text, voice, rate);
	}

	const handlePause = (e) => {
		e.preventDefault();
		setPaused(true);
		onPause();
	}

	const handleResume = (e) => {
		e.preventDefault();
		setPaused(false);
		onResume();
	}

	const handleStop = (e) => {
		e.preventDefault();
		onStop();
	}

	const displaySpeakOrPause = () => {
		if (speaking) {
			if (paused) {
				return (
					<button type="submit" onClick={handleResume}>
						Resume
					</button>
				);
			} else {
				return (
					<button type="submit" onClick={handlePause}>
						Pause
					</button>
				);
			}
		} else {
			return (
				<button type="submit" onClick={handleSpeak}>
					Speak
				</button>
			);
		}
	};

	const disableOptions = () => {
		return (speaking) ? true : false;
	}

	const displaySpeaking = () => {
		if (speaking) {
			if (paused) {
				return (
					<p>Paused.</p>
				)
			} else {
				return (
					<p>Speaking...</p>
				)
			}
		} else {
			return (
				<p>Ready to speak.</p>
			)
		}
	}

	return (
		<div className="Control">
			{displaySpeaking()}
			<form className="Control__form">
				<div className="Control__form__group">
					<textarea
						id="text"
						placeholder="Enter text to be spoken"
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
				</div>
				<div className="Control__form__group">
					<label htmlFor="voice">Voice:</label>
					<select
						id="voice"
						name="voice"
						value={voice}
						onChange={(e) => setVoice(e.target.value)}
						disabled={disableOptions()}	
					>
						{
							voices.map((voice, index) => {
								return (
									<option key={index} value={voice.voiceName}>
										{voice.voiceName}
									</option>
								)
							})
						}
					</select>
				</div>
				<div className="Control__form__group">
					<label htmlFor="rate">Rate: {rate}</label>
					<input
						id="rate"
						name="rate"
						type="range"
						min="0.25"
						max="2.00"
						step="0.25"
						value={rate}
						onChange={(e) => setRate(e.target.value)}
						disabled={disableOptions()}
					/>
				</div>
				<div className="Control__form__group">
					<button type="submit" onClick={(e) => handleStop(e)}>Stop</button>
					{displaySpeakOrPause()}
				</div>
			</form>
		</div>
	)
}

