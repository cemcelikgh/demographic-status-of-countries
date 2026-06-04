import Demographics from "@/components/demographics/Demographics";
import Select from "@/components/selectors/Selectors";

function Home() {
  return (
    <main>
      <h1>Demographic Status of Countries</h1>
      <Select />
      <Demographics />
    </main>
  );
}

export default Home;
