import styled from 'styled-components';
import ContextBox from "../../component/NotFound/ContextBox";
import NotFoundSvg from "../../component/NotFound/NotFoundSvg";

const NotFoundPage = () => {
    return (
        <PageWrap>
            <NotFoundSvg />
            <ContextBox />
        </PageWrap>
    )
}

const PageWrap = styled.div`
    
`

export default NotFoundPage;