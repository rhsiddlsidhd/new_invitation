import ChangePasswordForm from "@/components/organisms/(forms)/MyProfile/ChangePasswordForm";
import ChangePasswordTestForm from "./_component/ChangePasswordTestForm";

const LocalStateTestPage = () => {
  return (
    <div className="container mx-auto h-screen p-4 md:p-8">
      <div className="mx-auto flex h-full max-w-4xl flex-col items-center justify-center">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Form State 렌더링 비교
          </h1>
          <p className="text-muted-foreground mt-2">
            Local 과 Global State를 비교합니다.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 items-start gap-8 border-2">
          <ChangePasswordForm />
          <ChangePasswordTestForm />
        </div>
      </div>
    </div>
  );
};

export default LocalStateTestPage;
