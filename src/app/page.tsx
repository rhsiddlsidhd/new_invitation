import SnapBox from "@/components/template/Box/SnapBox";
import SnapContainer from "@/components/template/container/SnapContainer";
import CreateContainer from "@/components/template/CreateContainer";
import IntroContainer from "@/components/template/IntroContainer";
import PreviewContainer from "@/components/template/PreviewContainer";
import { decrypt, getSession } from "@/lib/session";

export default async function Home() {
  const createdPosts = Array.from({ length: 16 }, () => {
    // {x,y,z,delay,moveX,moveY}[]
    let x, y;
    const zone = Math.floor(Math.random() * 4);
    switch (zone) {
      case 0: // 왼쪽영역
        x = Math.random() * 25 + 5; // 5% ~ 30%
        y = Math.random() * 80 + 10; // 10% ~ 90%
        break;
      case 1: // 오른쪽영역
        x = Math.random() * 25 + 70; // 70% ~ 95%
        y = Math.random() * 80 + 10; // 10%
        break;
      case 2: // 위쪽영역
        x = Math.random() * 60 + 20; // 20% ~ 80%
        y = Math.random() * 20 + 5; // 5%
        break;
      case 3: // 아래쪽영역
        x = Math.random() * 60 + 20; // 20% ~ 80%
        y = Math.random() * 20 + 75; // 75% ~ 95%
        break;
      default:
        x = 10;
        y = 10;
    }

    return {
      size: Math.floor(Math.random() * 14),
      x,
      y,
      z: Math.random() * 300 - 150,
      moveX: (Math.random() - 0.5) * 20,
      moveY: (Math.random() - 0.5) * 20,
    };
  });
  let user = null;
  try {
    const token = await getSession();
    const payload = await decrypt(token);
    user = payload.userId;
  } catch {
    user = null;
  }

  return (
    <SnapContainer>
      <SnapBox height={200}>
        {/* height={200} */}
        {/* <div className="h-full w-full bg-red-300">스냅 1</div> */}
        <IntroContainer posts={createdPosts} />
      </SnapBox>
      <SnapBox height={200}>
        {/* height={150} */}
        {/* <div className="h-full w-full bg-green-300">스냅 2</div> */}
        <CreateContainer user={user} />
      </SnapBox>
      <SnapBox zIndex={20} height={200}>
        {/*  height={250} */}
        {/* <div className="h-full w-full bg-blue-300">스냅 3</div> */}
        <PreviewContainer />
      </SnapBox>
      {/* <div className="relative top-0 z-10 h-screen w-full bg-blue-500"></div> */}
    </SnapContainer>
  );
}
