import styled from "styled-components";
import Title from "../../common/Title"
import Button from "../../common/Button"
import PlanTime from "../../component/PlanTime"


function RoomHeader(props) {


    return (
        <>
        <Layout>
          <Left>
            <Title title={props.title} />
            <PlanTime date={props.date} />
          </Left>
          <Button></Button>
        </Layout>
        </>
    )
}

export default RoomHeader;

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  border-bottom: 2px solid gray;
  
`
const Left = styled.div`
  display: inline-flex;
  align-items: center;
  
`
