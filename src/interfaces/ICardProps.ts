import { CSSProperties } from "react";


export default interface ICardProps {
  className?: string
  title: string
  description?: string,
  imageURL: string,
  callback: Function,
  showBadge?: boolean,
  voteAverage?: number,
  id?: number
  style?: CSSProperties
}