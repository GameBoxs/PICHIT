import React from "react";
import TotalCategory from "../../component/TotalCategory";

function BoardHeader({roomPosition, conditionHandler}) {

  //카테고리 판별
  return (
    <>
      {roomPosition ? (
        null
      ) : (
        <TotalCategory conditionHandler={conditionHandler} />
      )}
    </>
  );
}

export default BoardHeader;
