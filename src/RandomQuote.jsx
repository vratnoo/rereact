import React,{ useState } from "react";

const quotes = ['Life is what you make it.',
                "Nothing is impossible for a willing heart"
            ,"there is always something in life you can change"
        ]

function RandomQuotes(){
    const [quote,setQuote] = useState(quotes[0])

    const handleClick = ()=>{
        const randomQuote = quotes[Math.floor(Math.random()*quotes.length)]
        setQuote(randomQuote)
        
    }

return (<>
<h1>Random quotes here</h1>
<p>{quote}</p>
<button onClick={handleClick}>Change me</button>
</>)
}


export default RandomQuotes