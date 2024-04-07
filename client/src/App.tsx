import React from "react";
import "./App.css";
import Form from "./components/MyForm";
import MyData from "./components/MyData";
import { Space } from "antd";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Space direction="vertical">
					<Form />
					{/* <MyData /> */}
				</Space>
			</header>
		</div>
	);
}

export default App;
