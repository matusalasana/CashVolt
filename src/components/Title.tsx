
interface Props{
  txt1: string,
  txt2: string,
}

const Title = ({txt1, txt2}: Props) => {
  return (
    <div className="flex my-8 gap-5 justify-center">
      <p className="text-3xl font-bold">{txt1}</p>
      <p className="text-3xl text-blue-600 font-bold">{txt2}</p>
    </div>
  )
}

export default Title