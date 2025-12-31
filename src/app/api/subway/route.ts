export const GET = async () => {
  console.log(
    "🔑 API Key:",
    process.env.SEOUL_PUBLIC_API_KEY?.substring(0, 20) + "...",
  );

  const url = `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_PUBLIC_API_KEY}/json/SearchInfoBySubwayNameService/1/5/%EA%B0%95%EB%82%A8`;

  console.log("🌐 요청 URL:", url);

  const res = await fetch(url);
  const data = await res.text();

  console.log("📦 응답:", data);

  return new Response(data, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

  return new Response(data, { status: 200 });
};
