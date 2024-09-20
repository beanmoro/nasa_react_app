interface MainProps {
  data?: any;
}

export default function Main(props: MainProps) {
  const { data } = props;

  return (
    <div className="imgContainer">
      <img src={data.hdurl} alt={data.title || "bg-img"} className="bgImg" />
    </div>
  );
}
