import React from "react";
import TotalCategory from "../../component/TotalCategory";

function BoardHeader({roomPosition, conditionHandler}) {
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
