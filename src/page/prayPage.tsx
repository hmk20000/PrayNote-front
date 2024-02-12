import styled from "styled-components";
import useGetPray from "../hook/useGetPray";
import PrayList from "../component/prayList";
import PrayInsert from "../component/prayInsert";

const Container = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background-color: #cecece;
  border: 1px solid #8b8b8b;
  border-radius: 16px;
  padding: 16px;
  box-sizing: border-box;
`;

function PrayPage() {
  const { prayData, isPrayLoading } = useGetPray();

  if (isPrayLoading) return <div>Loading</div>;

  return (
    <Container>
      <PrayInsert />
      <PrayList prays={prayData!} />
    </Container>
  );
}

export default PrayPage;
