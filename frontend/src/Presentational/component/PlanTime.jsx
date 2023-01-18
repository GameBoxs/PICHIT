import styled from "styled-components";

function PlanTime(props) {
    const month = props.date.toLocaleString('en-US',{month:'2-digit'});
    const day = props.date.toLocaleString('en-US',{day:'2-digit'});
    const year = props.date.getFullYear();

    return(
        <>
          <Layout>
            <Text>{year}년</Text>
            <Text>{month}월</Text>
            <Text>{day}일</Text>
          </Layout>
        </>
    )   
}

export default PlanTime;

const Text = styled.span`
    font-size: 10px;
    padding: 3px;
`
const Layout = styled.span`
  margin-left: 15px;
  
`