"use client";
import { PhoneIcon } from "@/components/atoms/Icon";
import { PhonePayload } from "@/components/template/invitation/InvitationContainer";
import { useModalStore } from "@/store/modalStore";

const Contact = () => {
  // data는 모달에서 전달되는 payload입니다. 실제 타입에 맞춰 캐스트하여 사용하세요.
  const { payload } = useModalStore();

  // payload 는 지금 알수없는 데이터 구조
  // 그래서 받은 payload를 원하는 구조가 아니면 대체 UI를 보여줘야함

  const sections = [
    { kr: "신랑측", eng: "groom" },
    { kr: "신부측", eng: "bride" },
  ];

  const isValidationPayload = (prop: unknown): prop is PhonePayload[] => {
    if (!prop || !Array.isArray(prop)) return false;

    return prop.every((p) => {
      return (
        typeof p === "object" &&
        p !== null &&
        "id" in p &&
        "name" in p &&
        "phone" in p &&
        "role" in p
      );
    });
  };

  const isPhones = isValidationPayload(payload);

  const handlePhoneClick = async (phone: PhonePayload["phone"]) => {
    try {
      await navigator.clipboard.writeText(phone);
      alert("전화번호가 복사되었습니다.");
    } catch (e) {
      console.error("전화 연결에 실패했습니다.", e);
      alert("전화 연결에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {!isPhones ? (
        <div>연락처가 없습니다</div>
      ) : (
        <div>
          {sections.map((section, i) => (
            <section key={i}>
              <div className="my-4 border-b-1 border-dotted border-stone-200 p-2">
                <p className="text-sm text-white opacity-80">
                  {section.kr}{" "}
                  <span className="text-xs opacity-30">{section.eng}</span>
                </p>
              </div>
              <div>
                {payload
                  .filter((phone) => phone.id.includes(section.eng))
                  .map((phone) => (
                    <div key={phone.id}>
                      {phone.name && phone.phone ? (
                        <p className="flex items-center gap-2">
                          <span className="flex-1 text-xs text-white opacity-80">
                            {phone.role}
                          </span>
                          <span className="text-bold flex-1 text-white">
                            {phone.name}
                          </span>
                          <span>
                            <PhoneIcon
                              onClick={() => handlePhoneClick(phone.phone)}
                              className="text-white"
                              size={14}
                            />
                          </span>
                        </p>
                      ) : null}
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contact;
