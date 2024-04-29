import React, { useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Slider, TextareaAutosize, Typography } from '@mui/material'
import { PlayArrow, Pause, PlayCircleOutline, Stop } from '@mui/icons-material'
import '../assets/css/Control.css'

export default function Control({ voices, speaking, onSpeak, onPause, onResume, onStop }) {
	const [text, setText] = useState('');
	const [voice, setVoice] = useState('');
	const [rate, setRate] = useState('1.00');
	const [paused, setPaused] = useState(false);
	const [rateMoving, setRateMoving] = useState(false);

	const handleSpeak = (e) => {
		e.preventDefault();
		onSpeak(text, voice, rate);
	};

	const handlePause = (e) => {
		e.preventDefault();
		setPaused(true);
		onPause();
	};

	const handleResume = (e) => {
		e.preventDefault();
		setPaused(false);
		onResume();
	};

	const handleStop = (e) => {
		e.preventDefault();
		setPaused(false);
		onStop();
	};

	const displaySpeakOrPause = () => {
		if (speaking) {
			if (paused) {
				return (
					<Button
						variant='outlined'
						color='primary'
						startIcon={<PlayArrow />}
						onClick={handleResume}
					>
						Resume
					</Button>
				);
			} else {
				return (
					<Button
						variant='outlined'
						color='primary'
						startIcon={<Pause />}
						onClick={handlePause}
					>
						Pause
					</Button>
				);
			}
		} else {
			return (
				<Button
					variant='contained'
					color='primary'
					startIcon={<PlayCircleOutline />}
					onClick={handleSpeak}
					style={
						{
							color: 'white',
							boxShadow: 'none',
						}
					}
				>
					Speak
				</Button>

			);
		}
	};

	const disableOptions = () => {
		return speaking ? true : false;
	};

	const displaySpeaking = () => {
		if (speaking) {
			if (paused) {
				return 'Paused.';
			} else {
				return 'Speaking...';
			}
		} else {
			return 'Ready to speak.';
		}
	};

	return (
		<Box>
			<form>
				<Box sx={
					{
						display: 'flex',
						flexDirection: 'column',
						gap: 1,
					}}
				>
					<Box> {/* Textarea component */}
						<TextareaAutosize
							id='text'
							placeholder='Enter text to be spoken'
							value={text}
							onChange={(e) => setText(e.target.value)}
							style={{
								backgroundColor: 'rgba(183, 219, 255, 0.2)',
								color: 'rgb(66, 161, 255)',
								fontFamily: 'inherit',
								fontSize: '0.9rem',
								height: '184px',
								width: '100%',
								border: 'none',
								borderRadius: '5px',
								padding: '0.5rem',
								resize: 'none',
								overflow: 'auto',
							}}
						/>
					</Box>

					<Box sx={
						{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					> {/* Options component */}
						<Box sx={
							{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								backgroundColor: 'rgba(183, 219, 255, 0.2)',
								width: '27%',
								height: '83px',
								borderRadius: '5px',
								padding: '1rem'
							}}
						>
							<Typography
								id='rate-label'
								variant='p'
								sx={
									{
										color: rateMoving ? 'rgb(66, 161, 255)' : 'rgba(0, 0, 0, 0.6)'
									}}
							>
								Rate
							</Typography>
							<Slider
								id='rate'
								min={0.25}
								max={2.00}
								step={0.25}
								value={parseFloat(rate)}
								onChange={(e, value) => {
									setRateMoving(true);
									setRate(value.toFixed(2));
								}}
								onChangeCommitted={() => setRateMoving(false)}
								disabled={disableOptions()}
								valueLabelDisplay='auto'
								size='small'
							/>
						</Box>

						<Box sx={
							{
								backgroundColor: 'rgba(183, 219, 255, 0.2)',
								width: '70%',
								height: '83px',
								borderRadius: '5px',
								padding: '1rem'
							}}
						>
							<FormControl
								variant='standard'
								fullWidth
							>
								<InputLabel id='voice-label'>Voice</InputLabel>
								<Select
									labelId='voice-label'
									id='voice'
									value={voice}
									onChange={(e) => setVoice(e.target.value)}
									disabled={disableOptions()}
								>
									{
										voices.map((voice, index) => {
											return (
												<MenuItem
													key={index}
													value={voice.voiceName}
												>
													{voice.voiceName}
												</MenuItem>
											);
										})
									}
								</Select>
							</FormControl>
						</Box>
					</Box>

					<Box sx={
						{
							display: 'flex',
							justifyContent: 'flex-start',
						}}
					> {/* Status component */}
						<Typography variant='p' sx={
							{
								color: 'rgba(66, 161, 255, 0.7)',
							}}
						>
							{displaySpeaking()}
						</Typography>
					</Box>

					<Box sx={
						{
							display: 'flex',
							justifyContent: 'flex-end',
							gap: '1rem',
						}}
					> {/* Buttons component */}
						<Box>
							{(speaking || paused) && (
								<Button variant='outlined' color='primary' startIcon={<Stop />} onClick={handleStop}>
									Stop
								</Button>
							)}
						</Box>
						<Box>
							{displaySpeakOrPause()}
						</Box>
					</Box>
				</Box>
			</form>
		</Box>
	);
}
