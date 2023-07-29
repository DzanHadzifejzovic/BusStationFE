import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;

    justify-content: center;
    align-items: center;
    background-color: #f2f2f2;

.container {
    width: 50%;
	margin: 10px;
	align-items: flex-start;
	padding: 10px 20px;
	box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
		0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
	background-color: white;
	border-radius: 4px;
}

.heading {
	font-size: 16px;
	margin: 10px;
	text-align: center;
}

.filter_container {
	display: flex;
    justify-content: center;
	flex-direction: row;
    align-items: center;
	flex-wrap: wrap;
}

.filter {
	min-width: 115px;
	display: flex;
	align-items: center;
	margin: 5px 0;
}

.filter_label {
	margin: 0;
	margin-left: 5px;
    color: black;
}
`