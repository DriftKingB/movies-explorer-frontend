import { useState, useEffect } from "react";
import { cardsRenderConfig } from "../utils/constants";
import useWindowDimensions from "./useWindowDimensions"

export default function useCardsRender(cards) {
  const { windowWidth } = useWindowDimensions();
  const [ maxCardsNumber, setMaxCardsNumber ] = useState(0);
  const [ moreButtonIsActive, setMoreButtonState ] = useState(false);
  const { windowMin, windowMedium, windowMax } = cardsRenderConfig;

  useEffect(() => {
    if (windowWidth > windowMedium.width) {

      (maxCardsNumber <= windowMax.cardLimit) && setMaxCardsNumber(windowMax.cardLimit);

    } else if (windowWidth <= windowMedium.width && windowWidth >= windowMin.width) {

      (maxCardsNumber <= windowMedium.cardLimit) && setMaxCardsNumber(windowMedium.cardLimit);

    } else if (windowWidth < windowMin.width) {

      (maxCardsNumber <= windowMin.cardLimit) && setMaxCardsNumber(windowMin.cardLimit);
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
    const numberToRender =
      (windowWidth > windowMedium.width && windowMax.loadNumber)
      || (windowWidth <= windowMedium.width && windowMedium.loadNumber);

    setMaxCardsNumber(maxCardsNumber + numberToRender);
  }

  return { maxCardsNumber, moreButtonIsActive, handleMoreButtonClick }
}