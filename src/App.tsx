import {useEffect, useState} from "react";
import styles from "./App.module.css"

type Coin = {
    market : string;
    korean_name  : string;
    english_name  : string;
}

function App() {
    const [coins, setCoins] = useState<Coin[]>([]);

    // 비동기 함수를 처리한 리턴타입은 "앞으로 일어날 일인데 이러한 타입이 리턴된다는걸 약속할게"
    // Promise라는 타입을 사용할 수 있음
    const firestThen = (response: Response):Promise<Coin[]> => {
        // 통신을 fetch가 했고, 그에 대한 상세 내역 (정상 통신 됐는지, 어디에서 보내준 정보인지 등등의
        // 데이터가 들어있는 객체 타입이 Response
        // 그 안에 들어있는 나머지는 쓰지 않고, 실제 응답 내용 string을 자바스크립트에서 이용할 수 있는
        // 객체 상태로 변환한 값만 리턴할거야 (then 안에서 리턴이니까 다음 then에게 전달)
        return response.json();
    };

    const secondThen = (json: Coin[]) => {
        setCoins(json);
    }

    useEffect(() => {
        fetch("https://api.upbit.com/v1/market/all")
            // fetch는 비동기 함수고, then(함수)과 catch(함수)를 메소드 체인을 통해 쓸 수 있음
            // 즉, then과 catch에 들어가는 함수의 매개변수는 이미 "그 전 단계와 리턴값"이 들어온다는게 정해져 있음
            .then(firestThen)
            .then(secondThen)
            // 비동기 함수를 처리할 때에  catch메서드에 써주는 함수에 들어가는 매개변수는
            // 어떠한 모양일지 정해지지 않았음. fetch에서 에러날 때에 에러 모양과
            // 첫번쨰 then에서 에러날 때의 에러 모양과
            // 두번째 then에서 에러날 때의 에러 모양이 다 다름 => 그래서 타입스크립트 엔진은 any 타입으로 추록(기본)
            // 안전하게 error를 처리하기 위해서는 any타입은이 아니라 unknown으로 바꿔줌
            .catch((error:unknown) => {
                // 내로잉 : 타입을 좁혀서 사용해주는 것
                // 에러가 어디선가 발생하면 프로그램은 죽음 (kill, 프로그램이 꺼짐)
                // = >그래서 any를 통해 사용하지 않고 안전하게 다음 코드를 진행하기 위해 내로잉을 하는 것

                // 내로잉에서 사용할 수 있는 typeof 연산자는 기능이 부족함
                // instanceof 연산자 (JS, TS) : 객체가 특정 타입인지 아닌지 boolean으로 대답 => 참조자료형 구분
                // "Error" 타입 -> 자바스크립트엔진이 '오류'에 대해서 분석한 표준 타입
                if (error instanceof Error) {
                    console.log(error.message);
                } else {
                    console.log("알 수 없는 에러가 발생되었습니다"+error);
                }
            });
    },[]);

    return(
        <div className={styles.container}>
            <h1>업비트 코인 목록 ({coins.length}개)</h1>
            <hr />
            <select style={{ padding: "8px", fontSize: 16, minWidth: "200px" }}>
                {coins.map((item, index) => {
                    return (
                        <option key={index} value={item.market}>
                            {item.korean_name}({item.market})
                        </option>
                    );
                })}
            </select>
        </div>
    )
}
export default App;