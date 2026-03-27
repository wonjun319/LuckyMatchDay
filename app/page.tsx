import HomeLanding from "./home-landing";

export default async function Home({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const errorCode = typeof params.e === "string" ? params.e : null;

  const errorMessage =
    errorCode === "invalid-token" || errorCode === "unauthorized"
      ? "등록되지 않았거나 권한이 없는 태그예요. 다시 확인해 주세요."
      : null;

  return <HomeLanding errorMessage={errorMessage} />;
}
