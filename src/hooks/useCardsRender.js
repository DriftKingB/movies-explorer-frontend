import { useState, useEffect } from "react";
import useWindowDimensions from "./useWindowDimensions"

export default function useCardsRender(cards) {
  const { windowWidth } = useWindowDimensions();
  const [ maxCardsNumber, setMaxCardsNumber ] = useState(0);
  const [ moreButtonIsActive, setMoreButtonState ] = useState(false);

  useEffect(() => {
    if (windowWidth > 1058) {
      (maxCardsNumber <= 12) && setMaxCardsNumber(12)
    } else if (windowWidth <= 1058 && windowWidth >= 622) {
      (maxCardsNumber <= 8) && setMaxCardsNumber(8)
    } else if (windowWidth < 622) {
      (maxCardsNumber <= 5) && setMaxCardsNumber(5)
    }
  }, [windowWidth])

  useEffect(() => {
    handleMoreButtonState();
  }, [windowWidth, cards, maxCardsNumber])

  function handleMoreButtonState() {
    if (cards?.length <= maxCardsNumber) {
      setMoreButtonState(false);
    } else {
      setMoreButtonState(true);
    }
  }

  function handleMoreButtonClick() {
    const numberToRender = (windowWidth > 1058 && 3) || (windowWidth <= 1058 && 2);

    setMaxCardsNumber(maxCardsNumber + numberToRender);
  }

  return { maxCardsNumber, moreButtonIsActive, handleMoreButtonClick }
}