import React, { useState, useEffect } from 'react'
import './assets/css/App.css'
import Header from './components/Header'
import Control from './components/Control'

export default function App() {
	/* eslint-disable no-undef */
	const [voices, setVoices] = useState([]);
	const [speaking, setSpeaking] = useState(false);

	const isSpeaking = async () => {
		const chromeSpeaking = await chrome.tts.isSpeaking();
		setSpeaking(chromeSpeaking);
	}

	const getVoices = async () => {
		const chromeVoices = await chrome.tts.getVoices();
		setVoices(chromeVoices);
	}

	useEffect(() => {
		getVoices();
	}, [])

	const handleSpeak = async (text, voice, rate) => {
		await chrome.tts.speak(text, {
			voiceName: voice,
			rate: parseFloat(rate),
			onEvent: function (event) {
				if (event.type === 'end') {
					isSpeaking();
				}
			}
		});
		isSpeaking();
	}

	const handlePause = async () => {
		await chrome.tts.pause();
		isSpeaking();
	}

	const handleResume = async () => {
		await chrome.tts.resume();
		isSpeaking();
	}

	const handleStop = async () => {
		await chrome.tts.stop();
		isSpeaking();
	}

	return (
		<div className="App">
			<Header />
			<Control voices={voices} speaking={speaking} onSpeak={handleSpeak} onPause={handlePause} onResume={handleResume} onStop={handleStop} />
		</div>
	)
}
