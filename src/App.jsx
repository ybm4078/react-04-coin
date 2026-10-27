import {useState} from "react";

function App() {
    // 외부에서 데이터를 받아다가 화면에 출력하는 프로그램
    // 초기 렌더링 -> 데이터를 외부에서 받아오고 -> 받아온 데이터를 가공
    //             -> 데이터 저장 -> 화면을 갱신

    // 데이터를 저장하기 위한 공간, 변수이거나 state => state를 이용해야함
    const [coins, setCoins] = useState([]);

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