import ScrollViewBox from "@/components/template/Box/ScrollVIewBox";
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
    <div>
      <ScrollViewBox height={200}>
        <IntroContainer posts={createdPosts} />
      </ScrollViewBox>
      <ScrollViewBox height={150}>
        <CreateContainer user={user} />
      </ScrollViewBox>
      <ScrollViewBox zIndex={20} height={200}>
        <PreviewContainer />
      </ScrollViewBox>
      {/* <div className="relative top-0 z-10 h-screen w-full bg-blue-500"></div> */}
    </div>
  );
}
