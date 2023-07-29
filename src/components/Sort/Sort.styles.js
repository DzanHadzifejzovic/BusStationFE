import styled from "styled-components";

export const Wrapper = styled.div`
.container {
	height: 60px;
	margin: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
		0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
	background-color: white;
	border-radius: 4px;
}

.sort_by {
	font-size: 16px;
	font-weight: 500;
}

.select {
	width: 150px;
	height: 30px;
	margin-left: 4px;
	border-radius: 4px;
	border: 1px solid black;
	outline: none;
	cursor: pointer;
	padding: 5px;
}

.arrow_btn {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 30px;
	width: 30px;
	outline: none;
	border: 1px solid black;
	margin-left: 5px;
	border-radius: 4px;
	background-color: transparent;
	cursor: pointer;
}

.up_arrow,
.down_arrow {
	font-size: 18px;
	font-weight: bold;
	color: var black;
}
`;

