import {useEffect, useState} from "react";

function App() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        fetch("https://api.upbit.com/v1/market/all")
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setCoins(json);
            })
            .catch((error) => {console.log(error); })
    },[]);

    return(
        <>
            <div style={{ padding:"20px"}}>
                <h1>업비트 코인 목록 ({coins.length}개)</h1>
                <he />
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

        </>
    )
}
export default App;