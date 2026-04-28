
interface Props {
  amount: number;
  height: number;
}

const RectangularLoadingSkeleton = ({ amount=1, height=20 }: Props) => {
  return (
      <div className="flex flex-wrap gap-5 w-full">
        {[...Array(amount)].map((_, i) => (
          <div key={i} className={`skeleton h-${height} w-full`}></div>
        ))}
      </div>
  )
}

export default RectangularLoadingSkeleton;