import styled from "styled-components";
import { GlobalStyle } from "../../action/GlobalStyle";
import AggroL from "../common/Font/AggroL";

import AggroM from "../common/Font/AggroM";

function PlanTime({startDate}) {
  const Date = startDate.slice(0,10).split("-")

  const date = [
    {
      type: "YEAR",
      value: Date[0].slice(0,2),
    },
    {
      type: "MONTH",
      value: Date[1],
    },
    {
      type: "DAY",
      value: Date[2],
    },
  ];

  const dday = date.map((elem, idx) => {
    return (
      <Layout key={idx}>
        <Text>{elem.value}</Text>
        <DayTitle>{elem.type}</DayTitle>
      </Layout>
    );
  });

  return (
    <TimeLayout>
      <AggroM />
      <AggroL />
      <GlobalStyle />
      {dday}
    </TimeLayout>
  );
}

export default PlanTime;

const DayTitle = styled.div`
  font-weight: 600;
  color: var(--greyLight-2);
  font-family: SBagrroL;
  position: relative;
  opacity: 0.8;
`;

const Text = styled.div`
  width: 1em;
  height: 1em;
  font-weight: bolder;
  font-size: 2rem;
  padding: 1.1em 1em 1em 1em;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  grid-column: 1 / 2;
  grid-row: 4 / 5;
  background-color: var(--primary);
  box-shadow: inset 0.2rem 0.2rem 1rem var(--primary-light),
    inset -0.2rem -0.2rem 1rem var(--primary-dark),
    0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white);
  font-family: SBagrroM;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const TimeLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
