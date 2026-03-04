
interface Props{
  txt1: string,
  txt2: string,
}

const Title = ({txt1, txt2}: Props) => {
  return (
    <div className="flex gap-5 justify-center">
      <p className="text-2xl font-bold">{txt1}</p>
      <p className="text-2xl font-bold">{txt2}</p>
    </div>
  )
}

export default Title