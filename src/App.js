import React, { useState, useEffect, useCallback } from 'react'
import './assets/css/App.css'
import Header from './components/Header'
import Control from './components/Control'

export default function App() {
	/* eslint-disable no-undef */
	const [voices, setVoices] = useState([]);
	const [speaking, setSpeaking] = useState(false);

	const getVoices = useCallback(async () => {
		try {
			const chromeVoices = await chrome.tts.getVoices();
			setVoices(chromeVoices);
		} catch (error) {
			console.error(error);
		}
	}, []);

	const handleSpeak = useCallback(async (text, voice, rate) => {
		try {
			await chrome.tts.speak(text, {
				voiceName: voice,
				rate: parseFloat(rate),
				onEvent: function (event) {
					if (event.type === 'end') {
						setSpeaking(false);
					}
				}
			});
			setSpeaking(true);
		} catch (error) {
			console.error(error);
		}
	}, []);

	const handlePause = useCallback(async () => {
		try {
			await chrome.tts.pause();
			setSpeaking(false);
		} catch (error) {
			console.error(error);
		}
	}, []);

	const handleResume = useCallback(async () => {
		try {
			await chrome.tts.resume();
			setSpeaking(true);
		} catch (error) {
			console.error(error);
		}
	}, []);

	const handleStop = useCallback(async () => {
		try {
			await chrome.tts.stop();
			setSpeaking(false);
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		getVoices();
	}, [getVoices]);

	useEffect(() => {
		const isSpeaking = async () => {
			try {
				const chromeSpeaking = await chrome.tts.isSpeaking();
				setSpeaking(chromeSpeaking);
			} catch (error) {
				console.error(error);
			}
		}
		isSpeaking();
		const interval = setInterval(isSpeaking, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="App">
			<Header />
			<Control voices={voices} speaking={speaking} onSpeak={handleSpeak} onPause={handlePause} onResume={handleResume} onStop={handleStop} />
		</div>
	)
}
