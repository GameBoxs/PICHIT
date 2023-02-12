import React from "react";
import MyCategory from "../../component/MyCategory";
import TotalCategory from "../../component/TotalCategory";

function BoardHeader({roomPosition, conditionHandler}) {
  return (
    <>
      {roomPosition ? (
        <MyCategory conditionHandler={conditionHandler} />
      ) : (
        <TotalCategory conditionHandler={conditionHandler} />
      )}
    </>
  );
}

export default BoardHeader;
