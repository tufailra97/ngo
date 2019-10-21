export default interface ICardProps {
  title: string
  description?: string,
  imageURL: string,
  callback: Function,
  showBadge?: boolean,
  voteAverage?: number
}