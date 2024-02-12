import styled from "styled-components";
import useGetPray from "../hook/useGetPray";
import PrayList from "../component/prayList";
import PrayInsert from "../component/prayInsert";

const Container = styled.div`
  width: 100%;
`;

function PrayPage() {
  const { prayData, isPrayLoading } = useGetPray();

  if (isPrayLoading) return <div>Loading</div>;

  return (
    <Container>
      <PrayList prays={prayData!} />
      <PrayInsert />
    </Container>
  );
}

export default PrayPage;
