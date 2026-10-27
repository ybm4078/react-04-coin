import {useEffect, useState} from "react";

function App() {
    // 외부에서 데이터를 받아다가 화면에 출력하는 프로그램
    // 초기 렌더링 -> 데이터를 외부에서 받아오고 -> 받아온 데이터를 가공
    //             -> 데이터 저장 -> 화면을 갱신

    // 데이터를 저장하기 위한 공간, 변수이거나 state => state를 이용해야함
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        // 외부에서 데이터를 받아와서 coins에 저장하는 일을
        // 초기렌더링이 끝난 직후에 실행해줘야함  => useEffect를 쓰는 것

        // 해야되는 일을 useEffect 안의 함수에 적는데,
        // 그 일이 하필 외부에서 데이터를 받아오는 "비동기 함수"인 fetch임

        // 비동기 함수는 3가지 작성법이 있는데, 그 중 하나는
        // 데이터가 도착되었을 때 행해야 하는 일을 작성하는 then()과
        // 데이터가 도착되자 못했을 떄 등, 오류가 났을 때 해야하는 일을 작성하는 catch()로 구성

        // .then(함수) : fetch()가 완료되면 실행되는 함수를 적어줘야 함 => .then(0 메서드 체인을 통해 여러개를 적어줄 수 있음
        // .catch(함수) : fetch()가 실패하면 실생되는 함수를 적어줘야 함 => catch()는 한 번만 적어줄 수 있음

        // fetch() 함수는 순수 자바스크립트 (javascript 내장함수) -> import가 없음
        fetch("https://api.upbit.com/v1/market/all")
            // .than((방금 전 실행한 기능의 결과값) => {})
            .then((response) => {
                // 결과값인 response를 가지고, 무억을 할 것인지
                // string으로 온 결과값을 우리가 데이터로서 사용할 수 있는 "객체"형식으로 바꿔서 반환해야 함
                // json() : 스트링으로 들어온 걸 객체로
                return response.json();
            })
            .then((json) => {
                // 첫번째 then의 결과인 "가공된 객채 형식 목록"이 json이라는 매개변수에 들어옴
                // 그걸 가지고 우리가 만든 state인 coins에 저장
                setCoins(json);
            })
            // .catch((실패한 내용에 대한 분석값) => {})
            .catch((error) => {console.log(error); })
    },[]);

    return(
        <>
            <div style={{ padding:"20px"}}>
                <h1>업비트 코인 목록 ({coins.length}개)</h1>
                <he />
                <select style={{ padding:"8px", fontSize:16, minWidth: "200px"}}>

                </select>
            </div>

        </>
    )
}
export default App;